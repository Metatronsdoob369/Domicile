import express from 'express';
import { performanceOptimizer } from './performance-optimizer';
import { EventEmitter } from 'events';

// Metrics and monitoring system
interface SystemMetrics {
  timestamp: string;
  orchestrator: {
    activeRuns: number;
    completedRuns: number;
    failedRuns: number;
    averageExecutionTime: number;
  };
  performance: {
    cacheSize: number;
    activeLLMCalls: number;
    queuedLLMCalls: number;
    totalEmbeddingsGenerated: number;
    averageEmbeddingTime: number;
  };
  pinecone: {
    totalQueries: number;
    averageQueryTime: number;
    cacheHitRate: number;
    connectionStatus: 'healthy' | 'degraded' | 'down';
  };
  errors: {
    totalErrors: number;
    errorsByType: Record<string, number>;
    recentErrors: Array<{
      timestamp: string;
      type: string;
      message: string;
      stack?: string;
    }>;
  };
}

interface AlertRule {
  id: string;
  name: string;
  condition: (metrics: SystemMetrics) => boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  cooldown: number; // minutes
  lastTriggered?: number;
}

class MonitoringDashboard extends EventEmitter {
  private app: express.Application;
  private metrics: SystemMetrics;
  private alerts: AlertRule[];
  private alertHistory: Array<{
    timestamp: string;
    ruleId: string;
    severity: string;
    message: string;
  }> = [];
  private port: number;

  constructor(port: number = 3001) {
    super();
    this.port = port;
    this.app = express();
    this.metrics = this.initializeMetrics();
    this.alerts = this.initializeAlerts();

    this.setupMiddleware();
    this.setupRoutes();
    this.startMetricsCollection();
  }

  private initializeMetrics(): SystemMetrics {
    return {
      timestamp: new Date().toISOString(),
      orchestrator: {
        activeRuns: 0,
        completedRuns: 0,
        failedRuns: 0,
        averageExecutionTime: 0
      },
      performance: {
        cacheSize: 0,
        activeLLMCalls: 0,
        queuedLLMCalls: 0,
        totalEmbeddingsGenerated: 0,
        averageEmbeddingTime: 0
      },
      pinecone: {
        totalQueries: 0,
        averageQueryTime: 0,
        cacheHitRate: 0,
        connectionStatus: 'healthy'
      },
      errors: {
        totalErrors: 0,
        errorsByType: {},
        recentErrors: []
      }
    };
  }

  private initializeAlerts(): AlertRule[] {
    return [
      {
        id: 'high-error-rate',
        name: 'High Error Rate',
        condition: (metrics) => metrics.errors.totalErrors > 10,
        severity: 'high',
        message: 'Error rate exceeds threshold',
        cooldown: 5
      },
      {
        id: 'pinecone-down',
        name: 'Pinecone Connection Down',
        condition: (metrics) => metrics.pinecone.connectionStatus === 'down',
        severity: 'critical',
        message: 'Pinecone vector database is unreachable',
        cooldown: 1
      },
      {
        id: 'high-queue-depth',
        name: 'High LLM Queue Depth',
        condition: (metrics) => metrics.performance.queuedLLMCalls > 5,
        severity: 'medium',
        message: 'LLM call queue is backing up',
        cooldown: 2
      },
      {
        id: 'cache-overflow',
        name: 'Cache Size Warning',
        condition: (metrics) => metrics.performance.cacheSize > 1000,
        severity: 'low',
        message: 'Cache size approaching limits',
        cooldown: 10
      }
    ];
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.static('public'));

    // CORS support
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      next();
    });
  }

  private setupRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      const isHealthy = this.metrics.pinecone.connectionStatus !== 'down' &&
                       this.metrics.errors.totalErrors < 50;

      res.status(isHealthy ? 200 : 503).json({
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      });
    });

    // Metrics endpoint
    this.app.get('/metrics', (req, res) => {
      res.json(this.metrics);
    });

    // Dashboard HTML
    this.app.get('/', (req, res) => {
      res.send(this.generateDashboardHTML());
    });

    // Alerts endpoint
    this.app.get('/alerts', (req, res) => {
      res.json({
        active: this.alertHistory.slice(-10), // Last 10 alerts
        rules: this.alerts
      });
    });

    // WebSocket endpoint for real-time updates
    this.app.get('/ws', (req, res) => {
      // WebSocket implementation would go here
      res.json({ message: 'WebSocket endpoint - implement client-side connection' });
    });
  }

  private startMetricsCollection(): void {
    // Collect metrics every 5 seconds
    setInterval(() => {
      this.collectMetrics();
      this.checkAlerts();
    }, 5000);

    // Clean up old error logs every hour
    setInterval(() => {
      this.metrics.errors.recentErrors = this.metrics.errors.recentErrors
        .filter(error => {
          const errorTime = new Date(error.timestamp).getTime();
          const oneHourAgo = Date.now() - (60 * 60 * 1000);
          return errorTime > oneHourAgo;
        });
    }, 60 * 60 * 1000); // 1 hour
  }

  private collectMetrics(): void {
    const perfMetrics = performanceOptimizer.getMetrics();

    this.metrics.timestamp = new Date().toISOString();
    this.metrics.performance = {
      ...this.metrics.performance,
      cacheSize: perfMetrics.cacheSize,
      activeLLMCalls: perfMetrics.activeLLMCalls,
      queuedLLMCalls: perfMetrics.queuedLLMCalls
    };

    // Emit metrics update event
    this.emit('metrics-update', this.metrics);
  }

  private checkAlerts(): void {
    const now = Date.now();

    for (const alert of this.alerts) {
      if (alert.condition(this.metrics)) {
        const lastTriggered = alert.lastTriggered || 0;
        const cooldownMs = alert.cooldown * 60 * 1000; // Convert minutes to ms

        if (now - lastTriggered > cooldownMs) {
          const alertEvent = {
            timestamp: new Date().toISOString(),
            ruleId: alert.id,
            severity: alert.severity,
            message: alert.message
          };

          this.alertHistory.push(alertEvent);
          alert.lastTriggered = now;

          // Emit alert event
          this.emit('alert', alertEvent);

          console.warn(`🚨 ALERT [${alert.severity.toUpperCase()}]: ${alert.message}`);
        }
      }
    }
  }

  // Public API methods
  public recordError(type: string, message: string, stack?: string): void {
    this.metrics.errors.totalErrors++;
    this.metrics.errors.errorsByType[type] = (this.metrics.errors.errorsByType[type] || 0) + 1;

    this.metrics.errors.recentErrors.push({
      timestamp: new Date().toISOString(),
      type,
      message,
      stack
    });

    // Keep only last 100 errors
    if (this.metrics.errors.recentErrors.length > 100) {
      this.metrics.errors.recentErrors = this.metrics.errors.recentErrors.slice(-100);
    }
  }

  public recordOrchestratorRun(success: boolean, executionTime: number): void {
    if (success) {
      this.metrics.orchestrator.completedRuns++;
    } else {
      this.metrics.orchestrator.failedRuns++;
    }

    // Update rolling average
    const totalRuns = this.metrics.orchestrator.completedRuns + this.metrics.orchestrator.failedRuns;
    this.metrics.orchestrator.averageExecutionTime =
      (this.metrics.orchestrator.averageExecutionTime * (totalRuns - 1) + executionTime) / totalRuns;
  }

  public recordPineconeQuery(queryTime: number, cacheHit: boolean): void {
    this.metrics.pinecone.totalQueries++;

    // Update rolling average
    this.metrics.pinecone.averageQueryTime =
      (this.metrics.pinecone.averageQueryTime * (this.metrics.pinecone.totalQueries - 1) + queryTime) /
      this.metrics.pinecone.totalQueries;

    // Update cache hit rate (simplified)
    if (cacheHit) {
      this.metrics.pinecone.cacheHitRate = (this.metrics.pinecone.cacheHitRate + 1) / 2;
    }
  }

  public setPineconeStatus(status: 'healthy' | 'degraded' | 'down'): void {
    this.metrics.pinecone.connectionStatus = status;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`📊 Monitoring Dashboard running on http://localhost:${this.port}`);
      console.log(`🔗 Health check: http://localhost:${this.port}/health`);
      console.log(`📈 Metrics: http://localhost:${this.port}/metrics`);
      console.log(`🚨 Alerts: http://localhost:${this.port}/alerts`);
    });
  }

  private generateDashboardHTML(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OpenAI Agents - Monitoring Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">🤖 OpenAI Agents - Monitoring Dashboard</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Orchestrator Metrics -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-700 mb-4">Orchestrator</h3>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Active Runs:</span>
                        <span class="font-mono" id="active-runs">${this.metrics.orchestrator.activeRuns}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Completed:</span>
                        <span class="font-mono text-green-600" id="completed-runs">${this.metrics.orchestrator.completedRuns}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Failed:</span>
                        <span class="font-mono text-red-600" id="failed-runs">${this.metrics.orchestrator.failedRuns}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Avg Time:</span>
                        <span class="font-mono" id="avg-time">${this.metrics.orchestrator.averageExecutionTime.toFixed(2)}ms</span>
                    </div>
                </div>
            </div>

            <!-- Performance Metrics -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-700 mb-4">Performance</h3>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Cache Size:</span>
                        <span class="font-mono" id="cache-size">${this.metrics.performance.cacheSize}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Active LLM:</span>
                        <span class="font-mono" id="active-llm">${this.metrics.performance.activeLLMCalls}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Queued LLM:</span>
                        <span class="font-mono text-yellow-600" id="queued-llm">${this.metrics.performance.queuedLLMCalls}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Embeddings:</span>
                        <span class="font-mono" id="embeddings">${this.metrics.performance.totalEmbeddingsGenerated}</span>
                    </div>
                </div>
            </div>

            <!-- Pinecone Metrics -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-700 mb-4">Pinecone</h3>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Status:</span>
                        <span class="font-mono ${this.getStatusColor(this.metrics.pinecone.connectionStatus)}" id="pinecone-status">
                            ${this.metrics.pinecone.connectionStatus}
                        </span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Queries:</span>
                        <span class="font-mono" id="pinecone-queries">${this.metrics.pinecone.totalQueries}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Avg Query:</span>
                        <span class="font-mono" id="avg-query">${this.metrics.pinecone.averageQueryTime.toFixed(2)}ms</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Cache Hit:</span>
                        <span class="font-mono" id="cache-hit">${(this.metrics.pinecone.cacheHitRate * 100).toFixed(1)}%</span>
                    </div>
                </div>
            </div>

            <!-- Error Metrics -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold text-gray-700 mb-4">Errors</h3>
                <div class="space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Total:</span>
                        <span class="font-mono text-red-600" id="total-errors">${this.metrics.errors.totalErrors}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Recent:</span>
                        <span class="font-mono" id="recent-errors">${this.metrics.errors.recentErrors.length}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Alerts -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">🚨 Recent Alerts</h3>
            <div id="alerts-container" class="space-y-2">
                ${this.alertHistory.slice(-5).map(alert => `
                    <div class="p-3 rounded border-l-4 ${this.getAlertColor(alert.severity)}">
                        <div class="flex justify-between">
                            <span class="font-medium">${alert.message}</span>
                            <span class="text-sm text-gray-500">${new Date(alert.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- System Status -->
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">System Status</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="text-center">
                    <div class="text-2xl mb-2">🔄</div>
                    <div class="text-sm text-gray-600">Last Update</div>
                    <div class="font-mono text-xs" id="last-update">${new Date(this.metrics.timestamp).toLocaleTimeString()}</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl mb-2">⚡</div>
                    <div class="text-sm text-gray-600">Uptime</div>
                    <div class="font-mono text-xs" id="uptime">Calculating...</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl mb-2">🔧</div>
                    <div class="text-sm text-gray-600">Version</div>
                    <div class="font-mono text-xs">1.0.0</div>
                </div>
                <div class="text-center">
                    <div class="text-2xl mb-2">🌐</div>
                    <div class="text-sm text-gray-600">Environment</div>
                    <div class="font-mono text-xs">${process.env.NODE_ENV || 'development'}</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Auto-refresh metrics every 5 seconds
        setInterval(async () => {
            try {
                const response = await fetch('/metrics');
                const metrics = await response.json();

                // Update orchestrator metrics
                document.getElementById('active-runs').textContent = metrics.orchestrator.activeRuns;
                document.getElementById('completed-runs').textContent = metrics.orchestrator.completedRuns;
                document.getElementById('failed-runs').textContent = metrics.orchestrator.failedRuns;
                document.getElementById('avg-time').textContent = metrics.orchestrator.averageExecutionTime.toFixed(2) + 'ms';

                // Update performance metrics
                document.getElementById('cache-size').textContent = metrics.performance.cacheSize;
                document.getElementById('active-llm').textContent = metrics.performance.activeLLMCalls;
                document.getElementById('queued-llm').textContent = metrics.performance.queuedLLMCalls;
                document.getElementById('embeddings').textContent = metrics.performance.totalEmbeddingsGenerated;

                // Update Pinecone metrics
                document.getElementById('pinecone-status').textContent = metrics.pinecone.connectionStatus;
                document.getElementById('pinecone-status').className = 'font-mono ' + getStatusColor(metrics.pinecone.connectionStatus);
                document.getElementById('pinecone-queries').textContent = metrics.pinecone.totalQueries;
                document.getElementById('avg-query').textContent = metrics.pinecone.averageQueryTime.toFixed(2) + 'ms';
                document.getElementById('cache-hit').textContent = (metrics.pinecone.cacheHitRate * 100).toFixed(1) + '%';

                // Update error metrics
                document.getElementById('total-errors').textContent = metrics.errors.totalErrors;
                document.getElementById('recent-errors').textContent = metrics.errors.recentErrors.length;

                // Update timestamp
                document.getElementById('last-update').textContent = new Date(metrics.timestamp).toLocaleTimeString();

            } catch (error) {
                console.error('Failed to refresh metrics:', error);
            }
        }, 5000);

        function getStatusColor(status) {
            switch (status) {
                case 'healthy': return 'text-green-600';
                case 'degraded': return 'text-yellow-600';
                case 'down': return 'text-red-600';
                default: return 'text-gray-600';
            }
        }

        // Set initial uptime
        const startTime = Date.now();
        setInterval(() => {
            const uptime = Math.floor((Date.now() - startTime) / 1000);
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = uptime % 60;
            document.getElementById('uptime').textContent =
                \`\${hours.toString().padStart(2, '0')}:\${minutes.toString().padStart(2, '0')}:\${seconds.toString().padStart(2, '0')}\`;
        }, 1000);
    </script>
</body>
</html>`;
  }

  private getStatusColor(status: string): string {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'degraded': return 'text-yellow-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }

  private getAlertColor(severity: string): string {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  }
}

// Export singleton instance
export const monitoringDashboard = new MonitoringDashboard();

// Export for testing
export { MonitoringDashboard, SystemMetrics, AlertRule };
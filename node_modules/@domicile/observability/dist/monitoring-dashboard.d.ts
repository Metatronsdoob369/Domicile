import { EventEmitter } from 'events';
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
    cooldown: number;
    lastTriggered?: number;
}
declare class MonitoringDashboard extends EventEmitter {
    private app;
    private metrics;
    private alerts;
    private alertHistory;
    private port;
    constructor(port?: number);
    private initializeMetrics;
    private initializeAlerts;
    private setupMiddleware;
    private setupRoutes;
    private startMetricsCollection;
    private collectMetrics;
    private checkAlerts;
    recordError(type: string, message: string, stack?: string): void;
    recordOrchestratorRun(success: boolean, executionTime: number): void;
    recordPineconeQuery(queryTime: number, cacheHit: boolean): void;
    setPineconeStatus(status: 'healthy' | 'degraded' | 'down'): void;
    start(): void;
    private generateDashboardHTML;
    private getStatusColor;
    private getAlertColor;
}
export declare const monitoringDashboard: MonitoringDashboard;
export { MonitoringDashboard, SystemMetrics, AlertRule };
//# sourceMappingURL=monitoring-dashboard.d.ts.map
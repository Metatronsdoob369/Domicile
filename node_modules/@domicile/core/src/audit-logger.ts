// src/orchestration/audit-logger.ts
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

export interface AuditEntry {
  timestamp: Date;
  event: string;
  data: any;
  sessionId?: string;
  userId?: string;
}

export class AuditLogger {
  private db: any;

  constructor(firebaseConfig: any) {
    if (firebaseConfig) {
      const app = initializeApp(firebaseConfig);
      this.db = getFirestore(app);
    } else {
      this.db = null; // Demo mode
    }
  }

  async log(event: string, data: any, sessionId?: string, userId?: string) {
    const entry: AuditEntry = {
      timestamp: new Date(),
      event,
      data,
      sessionId,
      userId,
    };

    if (!this.db) {
      console.log('Audit (demo):', entry);
      return;
    }

    try {
      await addDoc(collection(this.db, 'audit_logs'), {
        ...entry,
        timestamp: Timestamp.fromDate(entry.timestamp),
      });
    } catch (error) {
      console.error('Audit log failed:', error);
      // In production, might want to buffer or alert
    }
  }

  // Optional: query logs (for debugging/admin)
  async getLogs(limit = 100) {
    // Implementation for querying recent logs
    // This would use Firebase queries
    return [];
  }
}
import sqlite3 from 'sqlite3';
import { VisitorLog } from './types';

export class Database {
  private db: any;

  constructor() {
    this.db = new (sqlite3 as any).Database('./visitor_logs.db', (err: unknown) => {
      if (err) {
        console.error('Error opening database:', err);
      } else {
        console.log('Database connected');
        this.initialize();
      }
    });
  }

  private initialize(): void {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  public logVisitor(ip: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('INSERT INTO logs (ip) VALUES (?)', [ip], (err: unknown) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  public getLogs(): Promise<VisitorLog[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM logs', [], (err: unknown, rows: unknown) => {
        if (err) reject(err);
        else resolve(rows as VisitorLog[]);
      });
    });
  }
}

export default new Database();
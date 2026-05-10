import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import { env } from '../config/env.js';
import { schema } from './schema.js';

let db;

export function getDb() {
  if (!db) {
    const dir = path.dirname(env.dbPath);
    if (dir && dir !== '.' && !fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    db = new Database(env.dbPath);
    db.exec(schema);
  }
  return db;
}

export function getDashboardData() {
  const conn = getDb();
  const orders = conn.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 500').all();
  const ads = conn.prepare('SELECT * FROM ads ORDER BY date DESC LIMIT 500').all();
  const products = conn.prepare('SELECT * FROM products ORDER BY updated_at DESC LIMIT 500').all();
  const latestReport = conn.prepare('SELECT * FROM ai_reports ORDER BY id DESC LIMIT 1').get();
  return { orders, ads, products, latestReport };
}

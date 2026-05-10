import { getDb } from '../db/index.js';

export function saveRawEvent(source, payload) {
  const db = getDb();
  db.prepare('INSERT INTO raw_events (source, payload) VALUES (?, ?)').run(source, JSON.stringify(payload));
}

export function upsertOrder(order) {
  const db = getDb();
  db.prepare(`INSERT INTO orders (order_sn,total_amount,currency,order_status,created_at,updated_at)
    VALUES (@order_sn,@total_amount,@currency,@order_status,@created_at,@updated_at)
    ON CONFLICT(order_sn) DO UPDATE SET
    total_amount=excluded.total_amount,
    currency=excluded.currency,
    order_status=excluded.order_status,
    updated_at=excluded.updated_at`).run(order);
}

export function upsertProduct(product) {
  const db = getDb();
  db.prepare(`INSERT INTO products (item_id,name,sku,price,stock,status,updated_at)
    VALUES (@item_id,@name,@sku,@price,@stock,@status,@updated_at)
    ON CONFLICT(item_id) DO UPDATE SET
    name=excluded.name,
    sku=excluded.sku,
    price=excluded.price,
    stock=excluded.stock,
    status=excluded.status,
    updated_at=excluded.updated_at`).run(product);
}

export function insertAd(ad) {
  const db = getDb();
  db.prepare(`INSERT INTO ads (campaign_id,item_id,spend,sales,impressions,clicks,orders,date)
    VALUES (@campaign_id,@item_id,@spend,@sales,@impressions,@clicks,@orders,@date)`).run(ad);
}

export function saveAiReport(report) {
  const db = getDb();
  db.prepare('INSERT INTO ai_reports (report) VALUES (?)').run(JSON.stringify(report));
}

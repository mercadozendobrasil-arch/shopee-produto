import cron from 'node-cron';
import { env } from '../config/env.js';
import { runSync } from './runSyncOnce.js';

export function startScheduler() {
  if (process.env.VERCEL) {
    console.log('Cron scheduler disabled on Vercel runtime. Use Vercel Cron or external scheduler.');
    return;
  }

  cron.schedule(env.syncCron, async () => {
    try {
      console.log('Scheduled Shopee sync started');
      const result = await runSync(7);
      console.log('Scheduled Shopee sync completed', result);
    } catch (err) {
      console.error('Scheduled Shopee sync failed', err);
    }
  });
}

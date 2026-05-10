import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT || 8787),
  dbPath: process.env.DB_PATH || './data/shopee_ai_ops.db',
  shopeeBaseUrl: process.env.SHOPEE_BASE_URL || 'https://partner.shopeemobile.com',
  partnerId: process.env.PARTNER_ID || '',
  partnerKey: process.env.PARTNER_KEY || '',
  shopId: process.env.SHOP_ID || '',
  accessToken: process.env.ACCESS_TOKEN || '',
  adsPath: process.env.ADS_PATH || '/api/v2/ads/get_campaign_performance',
  openaiKey: process.env.OPENAI_API_KEY || '',
  openaiModel: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
  syncCron: process.env.SYNC_CRON || '0 */3 * * *'
};

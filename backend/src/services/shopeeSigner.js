import crypto from 'crypto';
import { env } from '../config/env.js';

export function signShopeePath(path, timestamp, accessToken = env.accessToken, shopId = env.shopId) {
  const base = `${env.partnerId}${path}${timestamp}${accessToken}${shopId}`;
  return crypto.createHmac('sha256', env.partnerKey).update(base).digest('hex');
}

export function buildShopeeUrl(path, params = {}) {
  const timestamp = Math.floor(Date.now() / 1000);
  const sign = signShopeePath(path, timestamp);
  const url = new URL(path, env.shopeeBaseUrl);
  const query = {
    partner_id: env.partnerId,
    timestamp,
    access_token: env.accessToken,
    shop_id: env.shopId,
    sign,
    ...params
  };
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, String(value));
  });
  return url.toString();
}

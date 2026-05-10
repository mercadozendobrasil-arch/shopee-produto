import { buildShopeeUrl } from './shopeeSigner.js';

async function request(path, params = {}) {
  const url = buildShopeeUrl(path, params);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Shopee API error: ${response.status}`);
  }
  return response.json();
}

export async function fetchOrders(timeFrom, timeTo) {
  return request('/api/v2/order/get_order_list', {
    time_range_field: 'create_time',
    time_from: timeFrom,
    time_to: timeTo,
    page_size: 100
  });
}

export async function fetchProducts(offset = 0, pageSize = 100) {
  return request('/api/v2/product/get_item_list', {
    offset,
    page_size: pageSize,
    item_status: 'NORMAL'
  });
}

export async function fetchAds(date = '') {
  return request(process.env.ADS_PATH || '/api/v2/ads/get_campaign_performance', {
    date
  });
}

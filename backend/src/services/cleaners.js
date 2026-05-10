export function normalizeOrder(order = {}) {
  return {
    order_sn: order.order_sn || '',
    total_amount: Number(order.total_amount || 0),
    currency: order.currency || '',
    order_status: order.order_status || '',
    created_at: order.create_time || '',
    updated_at: new Date().toISOString()
  };
}

export function normalizeProduct(product = {}) {
  return {
    item_id: String(product.item_id || ''),
    name: product.item_name || '',
    sku: product.item_sku || '',
    price: Number(product.price_info?.[0]?.current_price || 0),
    stock: Number(product.stock_info_v2?.summary_info?.total_available_stock || 0),
    status: product.item_status || '',
    updated_at: new Date().toISOString()
  };
}

export function normalizeAd(ad = {}) {
  return {
    campaign_id: String(ad.campaign_id || ''),
    item_id: String(ad.item_id || ''),
    spend: Number(ad.cost || 0),
    sales: Number(ad.gmv || 0),
    impressions: Number(ad.impressions || 0),
    clicks: Number(ad.clicks || 0),
    orders: Number(ad.orders || 0),
    date: ad.date || new Date().toISOString().slice(0, 10)
  };
}

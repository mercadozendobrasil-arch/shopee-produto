import { fetchOrders, fetchProducts, fetchAds } from '../services/shopeeClient.js';
import { normalizeOrder, normalizeProduct, normalizeAd } from '../services/cleaners.js';
import { saveRawEvent, upsertOrder, upsertProduct, insertAd } from '../services/repository.js';

export async function runSync(rangeDays = 7) {
  const now = Math.floor(Date.now() / 1000);
  const from = now - rangeDays * 24 * 60 * 60;

  const orderResp = await fetchOrders(from, now);
  saveRawEvent('orders', orderResp);

  const orders = orderResp?.response?.order_list || [];
  for (const order of orders) {
    upsertOrder(normalizeOrder(order));
  }

  const productResp = await fetchProducts();
  saveRawEvent('products', productResp);

  const products = productResp?.response?.item || [];
  for (const product of products) {
    upsertProduct(normalizeProduct(product));
  }

  try {
    const adsResp = await fetchAds();
    saveRawEvent('ads', adsResp);

    const ads = adsResp?.response?.data || [];
    for (const ad of ads) {
      insertAd(normalizeAd(ad));
    }
  } catch (err) {
    console.warn('Ads sync skipped:', err.message);
  }

  return {
    syncedOrders: orders.length,
    syncedProducts: products.length
  };
}

if (process.argv[1]?.includes('runSyncOnce.js')) {
  runSync().then((result) => {
    console.log('Sync completed', result);
    process.exit(0);
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

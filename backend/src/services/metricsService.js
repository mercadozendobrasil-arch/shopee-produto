export function buildMetricsSummary(data = {}) {
  const orders = data.orders || [];
  const ads = data.ads || [];

  const gmv = orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
  const adSpend = ads.reduce((sum, a) => sum + Number(a.spend || 0), 0);
  const adSales = ads.reduce((sum, a) => sum + Number(a.sales || 0), 0);

  return {
    orders: orders.length,
    gmv,
    adSpend,
    adSales,
    roas: adSpend > 0 ? Number((adSales / adSpend).toFixed(2)) : 0,
    avgOrderValue: orders.length > 0 ? Number((gmv / orders.length).toFixed(2)) : 0
  };
}

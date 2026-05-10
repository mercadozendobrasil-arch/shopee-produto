export async function generateAiSuggestions(summary) {
  const suggestions = [];

  if (summary.roas < 2 && summary.adSpend > 0) {
    suggestions.push('广告 ROAS 偏低，建议检查低转化关键词并降低浪费预算。');
  }

  if (summary.avgOrderValue < 20) {
    suggestions.push('客单价偏低，建议增加组合销售或满减活动。');
  }

  if (summary.orders === 0) {
    suggestions.push('当前暂无订单，请检查广告投放和产品曝光。');
  }

  if (suggestions.length === 0) {
    suggestions.push('店铺整体数据正常，可以继续观察趋势。');
  }

  return {
    createdAt: new Date().toISOString(),
    suggestions
  };
}

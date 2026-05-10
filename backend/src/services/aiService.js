import OpenAI from 'openai';
import { env } from '../config/env.js';

function buildFallbackSuggestions(summary) {
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

  return suggestions;
}

export async function generateAiSuggestions(summary) {
  const fallback = buildFallbackSuggestions(summary);

  if (!env.openaiKey) {
    return {
      mode: 'rules',
      createdAt: new Date().toISOString(),
      suggestions: fallback
    };
  }

  try {
    const client = new OpenAI({ apiKey: env.openaiKey });

    const prompt = `你是一名资深 Shopee 电商运营顾问。\n\n请根据以下数据给出中文运营建议：\n${JSON.stringify(summary, null, 2)}\n\n要求：\n1. 输出重点问题\n2. 输出广告优化建议\n3. 输出产品建议\n4. 输出库存或经营风险\n5. 简洁、专业、中文`;

    const response = await client.chat.completions.create({
      model: env.openaiModel,
      messages: [
        {
          role: 'system',
          content: 'You are an ecommerce AI analyst for Shopee sellers.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.4
    });

    const text = response.choices?.[0]?.message?.content || '';

    return {
      mode: 'openai',
      createdAt: new Date().toISOString(),
      report: text,
      fallback
    };
  } catch (err) {
    return {
      mode: 'fallback-after-error',
      createdAt: new Date().toISOString(),
      error: err.message,
      suggestions: fallback
    };
  }
}

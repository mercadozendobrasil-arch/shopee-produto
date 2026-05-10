import express from 'express';
import { getDashboardData } from '../db/index.js';
import { buildMetricsSummary } from '../services/metricsService.js';
import { generateAiSuggestions } from '../services/aiService.js';

const router = express.Router();

router.get('/health', (_, res) => {
  res.json({ ok: true });
});

router.get('/metrics', async (_, res) => {
  const data = getDashboardData();
  const summary = buildMetricsSummary(data);
  res.json(summary);
});

router.post('/ai/analyze', async (_, res) => {
  const data = getDashboardData();
  const summary = buildMetricsSummary(data);
  const report = await generateAiSuggestions(summary);
  res.json(report);
});

export default router;

import express from 'express';
import { getDashboardData } from '../db/index.js';
import { buildMetricsSummary } from '../services/metricsService.js';
import { generateAiSuggestions } from '../services/aiService.js';
import { saveAiReport } from '../services/repository.js';
import { runSync } from '../jobs/runSyncOnce.js';

const router = express.Router();

router.get('/health', (_, res) => {
  res.json({ ok: true });
});

router.post('/sync/run', async (req, res) => {
  try {
    const result = await runSync(Number(req.body?.rangeDays || 7));
    res.json({ ok: true, result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
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
  saveAiReport(report);
  res.json(report);
});

export default router;

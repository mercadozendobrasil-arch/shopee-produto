import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import { startScheduler } from './jobs/scheduler.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/dashboard', async (_, res) => {
  res.send(`<!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Shopee AI Ops</title>
    <style>
      body { font-family: Arial; padding: 24px; max-width: 960px; margin: auto; }
      button { padding: 10px 14px; margin-right: 10px; cursor: pointer; }
      .card { border: 1px solid #ddd; padding: 16px; margin-top: 16px; border-radius: 8px; }
      pre { white-space: pre-wrap; }
    </style>
  </head>
  <body>
    <h1>Shopee AI Ops Dashboard</h1>

    <button onclick="runSync()">Run Sync</button>
    <button onclick="loadMetrics()">Load Metrics</button>
    <button onclick="runAI()">Generate AI Report</button>

    <div class="card">
      <h3>Metrics</h3>
      <pre id="metrics">No data</pre>
    </div>

    <div class="card">
      <h3>AI Report</h3>
      <pre id="ai">No report</pre>
    </div>

    <script>
      async function runSync() {
        const res = await fetch('/api/sync/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rangeDays: 7 })
        });
        const data = await res.json();
        alert(JSON.stringify(data));
      }

      async function loadMetrics() {
        const res = await fetch('/api/metrics');
        const data = await res.json();
        document.getElementById('metrics').textContent = JSON.stringify(data, null, 2);
      }

      async function runAI() {
        const res = await fetch('/api/ai/analyze', { method: 'POST' });
        const data = await res.json();
        document.getElementById('ai').textContent = JSON.stringify(data, null, 2);
      }
    </script>
  </body>
  </html>`);
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
  startScheduler();
  console.log(`Shopee AI Ops backend running on ${port}`);
});

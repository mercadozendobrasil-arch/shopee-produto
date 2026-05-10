import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/dashboard', async (_, res) => {
  res.send(`<!doctype html><html><head><meta charset="utf-8"><title>Shopee AI Ops</title></head><body><h1>Shopee AI Ops Dashboard</h1><p>API online.</p><ul><li>/api/health</li><li>/api/metrics</li><li>/api/ai/analyze</li></ul></body></html>`);
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
  console.log(`Shopee AI Ops backend running on ${port}`);
});

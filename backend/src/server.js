import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_, res) => {
  res.json({ ok: true, service: 'shopee-ai-ops' });
});

app.get('/dashboard', (_, res) => {
  res.send(`<!doctype html><html><head><meta charset="utf-8"><title>Shopee AI Ops</title></head><body><h1>Shopee AI Ops Dashboard</h1><p>Backend online.</p></body></html>`);
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
  console.log(`Shopee AI Ops backend running on ${port}`);
});

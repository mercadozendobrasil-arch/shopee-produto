const API_BASE = 'http://localhost:8787';

const output = document.getElementById('output');

function render(data) {
  output.textContent = typeof data === 'string'
    ? data
    : JSON.stringify(data, null, 2);
}

async function callApi(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  return response.json();
}

document.getElementById('syncBtn').addEventListener('click', async () => {
  render('Running sync...');
  try {
    const data = await callApi('/api/sync/run', {
      method: 'POST',
      body: JSON.stringify({ rangeDays: 7 })
    });
    render(data);
  } catch (err) {
    render(err.message);
  }
});

document.getElementById('metricsBtn').addEventListener('click', async () => {
  render('Loading metrics...');
  try {
    const data = await callApi('/api/metrics');
    render(data);
  } catch (err) {
    render(err.message);
  }
});

document.getElementById('aiBtn').addEventListener('click', async () => {
  render('Generating AI report...');
  try {
    const data = await callApi('/api/ai/analyze', {
      method: 'POST'
    });
    render(data);
  } catch (err) {
    render(err.message);
  }
});

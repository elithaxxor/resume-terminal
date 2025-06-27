async function loadLogs(): Promise<void> {
  const response = await fetch('http://localhost:9991/logs');
  const logs = await response.json();
  const tbody = document.querySelector<HTMLTableSectionElement>('#logs tbody')!;
  logs.forEach((log: { id: number; ip: string; timestamp: string }) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${log.id}</td><td>${log.ip}</td><td>${log.timestamp}</td>`;
    tbody.appendChild(row);
  });

  const counts: Record<string, number> = {};
  logs.forEach((log: { timestamp: string }) => {
    const day = log.timestamp.split('T')[0];
    counts[day] = (counts[day] || 0) + 1;
  });
  const canvas = document.getElementById('chart') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const labels = Object.keys(counts);
  const values = labels.map(l => counts[l]);
  const width = canvas.width = 400;
  const height = canvas.height = 200;
  const max = Math.max(...values, 1);
  ctx.clearRect(0,0,width,height);
  labels.forEach((label, i) => {
    const barHeight = (values[i] / max) * (height - 20);
    const barWidth = width / labels.length - 10;
    ctx.fillStyle = '#66f';
    ctx.fillRect(i*(barWidth+10)+5, height-barHeight, barWidth, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(label, i*(barWidth+10)+5, height-5);
  });
}

document.addEventListener('DOMContentLoaded', loadLogs);

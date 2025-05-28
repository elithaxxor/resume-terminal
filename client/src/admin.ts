async function loadLogs(): Promise<void> {
  const response = await fetch('http://localhost:9991/logs');
  const logs = await response.json();
  const tbody = document.querySelector<HTMLTableSectionElement>('#logs tbody')!;
  logs.forEach((log: { id: number; ip: string; timestamp: string }) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${log.id}</td><td>${log.ip}</td><td>${log.timestamp}</td>`;
    tbody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', loadLogs);

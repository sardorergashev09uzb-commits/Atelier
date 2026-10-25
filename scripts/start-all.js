import { spawn } from 'child_process';

console.log('\x1b[36m%s\x1b[0m', '--- Launching ATELIER Studio Architecture Suite ---');

// 1. Launch Backend API Server
const server = spawn('node', ['server/index.js'], {
  stdio: 'inherit',
  shell: true,
});

// 2. Launch Vite Frontend Server
const client = spawn('npx', ['vite', '--host'], {
  stdio: 'inherit',
  shell: true,
});

process.on('SIGINT', () => {
  server.kill('SIGINT');
  client.kill('SIGINT');
  process.exit();
});

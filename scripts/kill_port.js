import { execSync } from 'child_process';

const PORT = 3000;

console.log(`Checking for processes on port ${PORT}...`);

try {
  // Find PID
  // Windows command to find listening port
  const stdout = execSync(`netstat -ano | findstr :${PORT}`).toString();
  const lines = stdout.split('\n');
  
  lines.forEach(line => {
    if (line.includes('LISTENING')) {
      const parts = line.trim().split(/\s+/);
      // In "TCP 0.0.0.0:3000 0.0.0.0:0 LISTENING 12345", PID is the last element
      const pid = parts[parts.length - 1];
      
      if (pid && /^\d+$/.test(pid)) {
        try {
          execSync(`taskkill /PID ${pid} /F`);
          console.log(`Successfully killed process ${pid} on port ${PORT}`);
        } catch (e) {
          console.log(`Failed to kill process ${pid} (might already be terminated)`);
        }
      }
    }
  });
} catch (e) {
  // execSync throws if findstr finds nothing (exit code 1), which is good (no process)
  console.log(`No active process found on port ${PORT}`);
}

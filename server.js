const { spawn } = require("child_process");

const server = spawn("php", ["artisan", "serve", "--host=127.0.0.1", "--port=8080"]);

server.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

server.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

server.on("close", (code) => {
  console.log(`Laravel server exited with code ${code}`);
});

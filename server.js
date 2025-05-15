const { spawn } = require("child_process");

const server = spawn("php", ["-S", "0.0.0.0:8080", "-t", "public"]);

server.stdout.on("data", data => console.log(`stdout: ${data}`));
server.stderr.on("data", data => console.error(`stderr: ${data}`));
server.on("close", code => console.log(`Laravel server exited with code ${code}`));

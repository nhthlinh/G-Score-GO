const { spawn } = require("child_process");

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: "inherit" });
    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });
  });
}

async function startServer() {
  try {
    console.log("Running migrations...");
    await runCommand("php", ["artisan", "migrate", "--force"]);

    console.log("Seeding database...");
    await runCommand("php", ["artisan", "db:seed", "--force"]);

    console.log("Starting Laravel server...");
    const server = spawn("php", ["-S", "0.0.0.0:8080", "-t", "public"]);

    server.stdout.on("data", data => console.log(`stdout: ${data}`));
    server.stderr.on("data", data => console.error(`stderr: ${data}`));
    server.on("close", code => console.log(`Laravel server exited with code ${code}`));
  } catch (err) {
    console.error("Error during migration or seed:", err);
    process.exit(1); // thoát nếu migration/seed lỗi
  }
}

startServer();

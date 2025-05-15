const { spawn } = require("child_process");
const { exec } = require('child_process');


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

// Lắng nghe PORT platform cung cấp
const port = process.env.PORT || 9000;

async function startServer() {
  try {
    console.log("Running migrations...");
    await runCommand("php", ["artisan", "migrate:fresh", "--force"]);

    console.log("Seeding database...");
    await runCommand("php", ["artisan", "db:seed", "--force"]);

    console.log("Starting Laravel server...");
    const server = spawn("php", ["-S", `0.0.0.0:${port}`, "-t", "public"], {
        stdio: "inherit"
    });
  } catch (err) {
    console.error("Error during migration or seed:", err);
    process.exit(1); // thoát nếu migration/seed lỗi
  }
}

startServer();

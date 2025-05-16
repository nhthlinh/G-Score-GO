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

const port = process.env.PORT || 9000;

async function startServer() {
  try {
    console.log("Running migrations...");
    //await runCommand("php", ["artisan", "session:table"]);
    await runCommand("php", ["artisan", "migrate:fresh", "--force"]);

    console.log("Seeding database...");
    await runCommand("php", ["artisan", "db:seed", "--force"]);

    console.log("Starting Laravel server...");
    await runCommand("php", ["artisan", "serve", "--host=0.0.0.0", `--port=${port}`]);
  } catch (err) {
    console.error("Error during migration or seed:", err);
    process.exit(1);
  }
}

startServer();

import { runAutomation } from "@/lib/automation";
import * as dotenv from "dotenv";
import * as path from "path";

// .env.local 파일 로드
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function main() {
  console.log("🛠  Starting Notion CMS Automation...");
  await runAutomation();
  console.log("✅ Automation finished.");
}

main().catch((err) => {
  console.error("💥 Fatal error during automation:", err);
  process.exit(1);
});

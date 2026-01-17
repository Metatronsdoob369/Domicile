import { startMcpServer, type StartOptions } from "./mcp-server";

export async function startServer(options?: StartOptions) {
  return startMcpServer(options);
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Failed to start Domicile interface server", error);
    process.exit(1);
  });
}

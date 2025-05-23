#!/usr/bin/env node

// src/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { setupHandlers } from "./handlers.js";
import { CURRENT_BASIN_PROTOCOL_VERSION } from "./const.js";

const server = new Server(
  {
    name: "basin",
    version: CURRENT_BASIN_PROTOCOL_VERSION
  },
  {
    capabilities: {
      tools: {},
      prompts: {},
    },
  },
);

setupHandlers(server);

// Start server using stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
console.info('{"jsonrpc": "2.0", "method": "log", "params": { "message": "Server running..." }}');

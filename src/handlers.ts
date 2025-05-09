// src/handlers.ts
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { toolHandlers, tools } from "./tools.js";
import { type Server } from "@modelcontextprotocol/sdk/server/index.js";

export const setupHandlers = (server: Server): void => {
  // tools 
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: Object.values(tools),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    type ToolHandlerKey = keyof typeof toolHandlers;
    const { name, arguments: params } = request.params ?? {};
    const handler = toolHandlers[name as ToolHandlerKey];

    if (!handler) throw new Error("Tool not found");

    return handler(params);
  });
};

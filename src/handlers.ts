// src/handlers.ts
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { toolHandlers, tools } from "./tools.js";
import { type Server } from "@modelcontextprotocol/sdk/server/index.js";
import { promptHandlers, prompts } from "./prompts.js";

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
  server.setRequestHandler(ListPromptsRequestSchema, () => ({
    prompts: Object.values(prompts),
  }));
  server.setRequestHandler(GetPromptRequestSchema, (request) => {
    const { name, arguments: args } = request.params;
    const promptHandler = promptHandlers[name as keyof typeof promptHandlers];
    if (promptHandler) return promptHandler(args as { host: string, instruction: string });
    throw new Error("Prompt not found");
  });
};

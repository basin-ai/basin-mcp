// src/prompts.ts
export const prompts = {
  "code-test": {
    name: "code-test",
    description: "Test the generated code",
    arguments: [
        {
            name: "host",
            description: "The host of the running server",
            required: true,
        },
        {
            name: "instruction",
            description: "The test instruction, instructions on what and how to test",
            required: true,
        }
    ],
  },
};

export const promptHandlers = {
  "code-test": ({ host, instruction }: { host: string, instruction: string }) => {
    return {
        messages: [
            {
                role: "system",
                content: {
                    type: "text",
                    text: `Test with following instruction: ${instruction}. Server is running at ${host}. Use Basin MCP tool to test`
                }
            }
        ]
    }
  }
};

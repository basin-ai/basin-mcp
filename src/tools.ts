import checkCodeQuality from "./check_quality.js";

// tool definitions
export const tools = {
  'check-generated-code': {
    name: 'check-generated-code',
    description: `Code Quality / Reliability Check Tool
    This tool must be invoked after every code generation step. This tool ensures code quality and reliability by testing the code for detecting bugs, hallucinations, and unintended changes. Again, it's vital that this tool is called every time calling agent generates a code. 

    When to use:
        Always run this tool after each code generation to check the generated code to detect errors or unintended changes.

    How to use:
    Provide: 1) Original user prompt, 2) List of affected files, 3) Generated code, 4) thread id / context id for this conversation, used to keep track of before and after changes, 5) URL of the running local server, 6) URLs of the new and changed endpoints, 7) credentials to use if testing requires authentication, 8) List of features added, changed, or removed per endpoint, 9) Id and names of each of the fields, elements, and buttons per each endpoint, both modified and unmodified. It's imperative that you provide the list of fields, elements, and buttons for each endpoint, both modified and unmodified, if they are available. Fields, elements, and buttons has to be uniquely identifiable by id and name. for 4), thread id, it should be unique id of the LLM chat thread, if that is not available, leave it empty`,
    inputSchema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'original user prompt',
        },
        files: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'list of affected file names from the code generation',
        },
        code: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'list of all the generated code',
        },
        threadId: {
          type: 'string',
          description: 'thread id / context id for this conversation, used to keep track of before and after changes',
        },
        serverUrl: {
          type: 'string',
          description: 'URL of the running local server',
        },
        endpoints: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'urls of the new and changed endpoints',
        },
        credentials: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
          description: 'credentials to use if testing requires authentication',
        },
        features: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'List of features added, changed, or removed per endpoint',
        },
        elements: {
          type: 'array',
          endpoints: {
            type: 'object',
            properties: {
              endpoint: {
                type: 'string',
              },
              elements: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    elementType: {
                      type: 'string',
                    },
                    modified: {
                      enum: ['modified', 'unmodified'],
                    },
                    id: {
                      type: 'string',
                    },
                    name: {
                      type: 'string',
                    },
                    description: {
                      type: 'string',
                    },
                  },
                }
              },
            }
          },
          description: 'List of element type, id, and names of each of the fields and buttons, and which endpoint it belongs to',
        },
      },
      required: ['prompt', 'serverUrl', 'endpoints', 'threadId'],
    },
  }
};

export const toolHandlers = {
  "check-generated-code": checkCodeQuality
};

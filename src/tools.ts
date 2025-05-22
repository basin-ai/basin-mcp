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
    Provide: 1) Original user prompt, 2) test type, enter 'general' for user-specified thorough tests, or 'sanity' for quick automated sanity checks that runs at the end of each code generation event (choose 'sanity' for all other cases), 3) List of affected files, 4) Generated code, 5) thread id / context id for this conversation, used to keep track of before and after changes, 6) URL of the running local server, 7) URLs of the new and changed endpoints, 8) credentials to use if testing requires authentication, 9) List of features added, changed, or removed per endpoint, 10) List of features that have submissions, AND name and/or id of the submit button element / field for those features (must include the element id or name), 11) Id and names of each of the fields, elements, and buttons per each endpoint, both modified and unmodified, 12) list of external API calls and 3rd party services the feature uses, 13) Structure of files in the project, 14) Lengthy and very well detailed description of related features and endpoints. It's imperative that you provide the list of fields, elements, and buttons for each endpoint, both modified and unmodified, if they are available. Fields, elements, and buttons has to be uniquely identifiable by id and name. for 5), thread id, it should be unique id of the LLM chat thread, if that is not available, leave it empty`,
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
        testType: {
          type: 'string',
          enum: ['sanity', 'general'],
          description: 'test type',
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
        happyPathEndpoints: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'urls of the endpoints the feature navigates to after happy path, and what triggers the happy path',
        },
        sadPathEndpoints: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'urls of the endpoints the feature navigates to after sad path, and what triggers the sad path',
        },
        externalApiCalls: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'list of external API calls and 3rd party services the feature uses, and what triggers each call',
        },
        fileStructure: {
          type: 'array',
          description: "Structure of files in the project"
        },
        featureDescription: {
          type: "string",
          description: "Description of the affected features, add, changed, unchanged, removed, what they do, what they navigate to, what they use, what they use for authentication"
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
        formSubmissions: {
          type: 'array',
          forms: {
            type: 'object',
            properties: {
              featureDescription: {
                type: 'string',
              },
              formName: {
                type: 'string',
              },
              formTag: {
                type: 'string',
              },
              submitButtonName: {
                type: 'string',
              },
              submitButtonId: {
                type: 'string',
              },
              submitButtonCode: {
                type: 'string',
              }
            }
          },
          description: 'List of features that have submissions, AND name and/or id of the submit button element / field for those features',
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
        code: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'list of all the generated code',
        },
      },
      required: ['prompt', 'testType', 'serverUrl', 'endpoints', 'code', 'files', 'features', 'formSubmissions', 'elements', 'externalApiCalls', 'featureDescription'],
    },
  }
};

export const toolHandlers = {
  "check-generated-code": checkCodeQuality
};

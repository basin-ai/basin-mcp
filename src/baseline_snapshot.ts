import { postSemanticBaseline } from "basin-executor-lib";
import { BASIN_HOST, CURRENT_BASIN_PROTOCOL_VERSION } from "./const.js";

const BASIN_API_KEY = process.env.BASIN_API_KEY || "";

const takeBaselineSnapshot = async (args: any) => {
  // console.log(args);
  const prompt = args.prompt;
  const serverUrl = args.serverUrl;
  const endpoints = args.endpoints;
  const threadId = args.threadId;
  let result = true;
  if (Array.isArray(endpoints)) {
    endpoints.forEach(async endpoint => {
      const url = new URL(endpoint, serverUrl).toString();
      result = result && await postSemanticBaseline(BASIN_API_KEY, prompt, threadId, url, CURRENT_BASIN_PROTOCOL_VERSION, BASIN_HOST);
    });
  } else {
    const url = new URL(endpoints, serverUrl).toString();
    result = result && await postSemanticBaseline(BASIN_API_KEY, prompt, threadId, url, CURRENT_BASIN_PROTOCOL_VERSION, BASIN_HOST);
  }

  return {
    content: [
      {
        type: "text",
        text: result ? "pass: took baseline snapshot" : "fail: failed to take baseline snapshot",
      },
    ],
  };
};

export default takeBaselineSnapshot;

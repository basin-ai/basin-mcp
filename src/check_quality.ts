import { executeBasinTest, getTestPlan } from "basin-executor-lib";
import { BASIN_HOST, CURRENT_BASIN_PROTOCOL_VERSION } from "./const.js";
import { TestPlan } from "basin-executor-lib/dist/test_plan.js";

const BASIN_API_KEY = process.env.BASIN_API_KEY || "";
const DEBUG_MODE = process.env.DEBUG_MODE ? process.env.DEBUG_MODE === "true" : false;

const testPlanToLogs = (testPlan: TestPlan): any[] => {
  const items = Array.isArray(testPlan.testing_instructions) ? testPlan.testing_instructions :testPlan.testing_instructions.items ? testPlan.testing_instructions.items : testPlan.testing_instructions.instruction ? testPlan.testing_instructions.instruction : [];
  const logs = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    logs.push({
      type: "text",
      text: JSON.stringify(item),
    });
  }
  return logs;
}

const checkCodeQuality = async (args: any) => {
  const threadId = args.threadId;
  const args_dump = JSON.stringify(args);
  const testPlan = await getTestPlan(BASIN_API_KEY, args_dump, threadId, CURRENT_BASIN_PROTOCOL_VERSION, BASIN_HOST);
  
  if (!testPlan || !testPlan.testing_instructions) {
    return {
      content: [
        {
          type: "text",
          text: "failed. unable to produce test plan. Testing did not happen",
                },
            ],
        };
  }
  const logs = testPlanToLogs(testPlan);
  const result = await executeBasinTest(BASIN_API_KEY, testPlan, testPlan.thead_id, CURRENT_BASIN_PROTOCOL_VERSION, BASIN_HOST, DEBUG_MODE);
  if (result.logs && Array.isArray(result.logs)) logs.push(...result.logs);
  logs.push({
    type: "text",
    text: result.success ? "All tests passed" : "Some tests failed: " + result.message,
  });
  return { content: logs };
};

export default checkCodeQuality;
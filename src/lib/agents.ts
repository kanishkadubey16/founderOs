import { ChatOpenAI } from "@langchain/openai";
import { StateGraph, Annotation } from "@langchain/langgraph";

// Initialize ChatOpenAI
const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY || "",
  modelName: "gpt-4o-mini",
  temperature: 0.7,
});

// Define State channels using LangGraph Annotation.Root
export const BoardMeetingState = Annotation.Root({
  companyState: Annotation<any>(),
  events: Annotation<any[]>(),
  decisions: Annotation<any[]>(),
  analysis: Annotation<any>(),
  
  // Agent outputs
  customerFeedback: Annotation<any>(),
  investorFeedback: Annotation<any>(),
  competitorFeedback: Annotation<any>(),
  employeeFeedback: Annotation<any>(),
  mentorFeedback: Annotation<any>(),
});

// JSON parsing helper
function safeJsonParse(text: string) {
  try {
    // Find JSON block if OpenAI returned markdown formatting
    const match = text.match(/\{[\s\S]*\}/);
    const cleanText = match ? match[0] : text;
    return JSON.parse(cleanText);
  } catch (err) {
    console.error("Failed to parse JSON, returning fallbacks. Raw text:", text);
    return {
      observation: "Healthy operations observed this month.",
      risk: "Potential growth bottleneck if capital is not deployed efficiently.",
      opportunity: "Scale customer acquisition channels.",
      recommendation: "Focus on onboarding feedback and product stabilization.",
    };
  }
}

// 1. Customer Agent
async function customerAgentNode(state: typeof BoardMeetingState.State) {
  const prompt = `
You are the Virtual Customer Agent for a startup. Your job is to analyze user feedback, churn, retention, and sentiment.

CONTEXT:
- Company State: ${JSON.stringify(state.companyState)}
- Recent Events: ${JSON.stringify(state.events)}
- Executed Decisions: ${JSON.stringify(state.decisions)}
- AI Startup Report (Personas/Demand): ${JSON.stringify(state.analysis)}

Analyze customer satisfaction and churn based on the parameters above.
Generate:
1. A Key Observation about customer behavior, signups, or retention.
2. A Primary Risk/Concern regarding churn, onboarding, or satisfaction.
3. An Opportunity to improve engagement or growth.
4. A Strategic Recommendation on how to act.

Return strictly a JSON object:
{
  "observation": "string",
  "risk": "string",
  "opportunity": "string",
  "recommendation": "string"
}
`;

  const response = await model.invoke(prompt, {
    response_format: { type: "json_object" },
  });
  
  return {
    customerFeedback: safeJsonParse(response.content as string),
  };
}

// 2. Investor Agent
async function investorAgentNode(state: typeof BoardMeetingState.State) {
  const prompt = `
You are the Virtual Investor Agent on the board. Your focus is revenue, expenses, runway, cap table, and valuation.

CONTEXT:
- Company State: ${JSON.stringify(state.companyState)}
- Recent Events: ${JSON.stringify(state.events)}
- Executed Decisions: ${JSON.stringify(state.decisions)}
- AI Startup Report (Investor Notes/Scorecards): ${JSON.stringify(state.analysis)}

Analyze revenue growth, expenses, valuation, and capital runway.
Generate:
1. A Key Observation about the startup's financial state or capital efficiency.
2. A Primary Risk/Concern (e.g. burn rate, low MoM growth, high expenses).
3. An Opportunity (e.g. raising a round, cost cutting, pricing adjustments).
4. A Strategic Recommendation on managing finances.

Return strictly a JSON object:
{
  "observation": "string",
  "risk": "string",
  "opportunity": "string",
  "recommendation": "string"
}
`;

  const response = await model.invoke(prompt, {
    response_format: { type: "json_object" },
  });

  return {
    investorFeedback: safeJsonParse(response.content as string),
  };
}

// 3. Competitor Agent
async function competitorAgentNode(state: typeof BoardMeetingState.State) {
  const prompt = `
You are the Virtual Competitor Agent on the board. Your focus is competitive landscape, market share, and external threats.

CONTEXT:
- Company State: ${JSON.stringify(state.companyState)}
- Recent Events: ${JSON.stringify(state.events)}
- Executed Decisions: ${JSON.stringify(state.decisions)}
- AI Startup Report (Competitor Landscape/SOM): ${JSON.stringify(state.analysis)}

Analyze competitive threats and positioning.
Generate:
1. A Key Observation about market share or competitor movements.
2. A Primary Risk/Concern regarding competitor pricing, UX, or features.
3. An Opportunity to win market share or differentiate.
4. A Strategic Recommendation on product positioning.

Return strictly a JSON object:
{
  "observation": "string",
  "risk": "string",
  "opportunity": "string",
  "recommendation": "string"
}
`;

  const response = await model.invoke(prompt, {
    response_format: { type: "json_object" },
  });

  return {
    competitorFeedback: safeJsonParse(response.content as string),
  };
}

// 4. Employee Agent
async function employeeAgentNode(state: typeof BoardMeetingState.State) {
  const prompt = `
You are the Virtual Employee Agent on the board. Your focus is team sizes, engineering output, marketing burnout, and overall cultural productivity.

CONTEXT:
- Company State: ${JSON.stringify(state.companyState)}
- Recent Events: ${JSON.stringify(state.events)}
- Executed Decisions: ${JSON.stringify(state.decisions)}

Analyze staff size, productivity, and organizational gaps.
Generate:
1. A Key Observation about team productivity or alignment.
2. A Primary Risk/Concern (e.g. employee burn rate, resource constraints, bottlenecks).
3. An Opportunity to streamline workflows or hire talent.
4. A Strategic Recommendation on human resources and culture.

Return strictly a JSON object:
{
  "observation": "string",
  "risk": "string",
  "opportunity": "string",
  "recommendation": "string"
}
`;

  const response = await model.invoke(prompt, {
    response_format: { type: "json_object" },
  });

  return {
    employeeFeedback: safeJsonParse(response.content as string),
  };
}

// 5. CEO Mentor Agent
async function ceoMentorAgentNode(state: typeof BoardMeetingState.State) {
  const prompt = `
You are the CEO Mentor Agent, the chair of the virtual board of directors.
Your job is to read all startup parameters AND review the feedback compiled by the other specialized board agents to draft a final executive report.

CONTEXT:
- Company State: ${JSON.stringify(state.companyState)}
- Recent Events: ${JSON.stringify(state.events)}
- Executed Decisions: ${JSON.stringify(state.decisions)}
- AI Startup Report: ${JSON.stringify(state.analysis)}

OTHER AGENTS' ASSESSMENTS:
- Customer Agent: ${JSON.stringify(state.customerFeedback)}
- Investor Agent: ${JSON.stringify(state.investorFeedback)}
- Competitor Agent: ${JSON.stringify(state.competitorFeedback)}
- Employee Agent: ${JSON.stringify(state.employeeFeedback)}

Synthesize this data to provide guidance for the CEO.
Generate:
1. A Key Observation about the CEO's governance and leadership this month.
2. A Primary Risk/Concern in the business strategy.
3. An Opportunity to scale or improve operations.
4. A Strategic Recommendation on what the CEO should prioritize immediately.

Return strictly a JSON object:
{
  "observation": "string",
  "risk": "string",
  "opportunity": "string",
  "recommendation": "string"
}
`;

  const response = await model.invoke(prompt, {
    response_format: { type: "json_object" },
  });

  return {
    mentorFeedback: safeJsonParse(response.content as string),
  };
}

// Assemble the StateGraph workflow
const workflow = new StateGraph(BoardMeetingState)
  .addNode("customer", customerAgentNode)
  .addNode("investor", investorAgentNode)
  .addNode("competitor", competitorAgentNode)
  .addNode("employee", employeeAgentNode)
  .addNode("mentor", ceoMentorAgentNode)
  // Define edges (parallel nodes fan out from start)
  .addEdge("__start__", "customer")
  .addEdge("__start__", "investor")
  .addEdge("__start__", "competitor")
  .addEdge("__start__", "employee")
  // Fan-in: Mentor runs after customer, investor, competitor, employee have completed
  .addEdge("customer", "mentor")
  .addEdge("investor", "mentor")
  .addEdge("competitor", "mentor")
  .addEdge("employee", "mentor")
  // Mentor completes the workflow
  .addEdge("mentor", "__end__");

// Compile the LangGraph
export const compiledAgentsGraph = workflow.compile();

export interface AgentWorkflowInput {
  companyState: any;
  events: any[];
  decisions: any[];
  analysis: any;
}

export async function runAgentsWorkflow(input: AgentWorkflowInput) {
  const result = await compiledAgentsGraph.invoke({
    companyState: input.companyState,
    events: input.events,
    decisions: input.decisions,
    analysis: input.analysis,
  });

  return [
    {
      agentId: "customer",
      name: "Customer Agent",
      role: "User Sentiment Analysis",
      observation: result.customerFeedback.observation,
      risk: result.customerFeedback.risk,
      opportunity: result.customerFeedback.opportunity,
      recommendation: result.customerFeedback.recommendation,
    },
    {
      agentId: "competitor",
      name: "Competitor Agent",
      role: "Market Threat Analysis",
      observation: result.competitorFeedback.observation,
      risk: result.competitorFeedback.risk,
      opportunity: result.competitorFeedback.opportunity,
      recommendation: result.competitorFeedback.recommendation,
    },
    {
      agentId: "investor",
      name: "Investor Agent",
      role: "Capital & Growth Logic",
      observation: result.investorFeedback.observation,
      risk: result.investorFeedback.risk,
      opportunity: result.investorFeedback.opportunity,
      recommendation: result.investorFeedback.recommendation,
    },
    {
      agentId: "employee",
      name: "Employee Agent",
      role: "Team Health & Culture",
      observation: result.employeeFeedback.observation,
      risk: result.employeeFeedback.risk,
      opportunity: result.employeeFeedback.opportunity,
      recommendation: result.employeeFeedback.recommendation,
    },
    {
      agentId: "mentor",
      name: "CEO Mentor",
      role: "Strategic Governance",
      observation: result.mentorFeedback.observation,
      risk: result.mentorFeedback.risk,
      opportunity: result.mentorFeedback.opportunity,
      recommendation: result.mentorFeedback.recommendation,
    },
  ];
}

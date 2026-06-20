import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey || "",
});

export interface StartupDetails {
  startupName: string;
  industry: string;
  targetAudience: string;
  problemStatement: string;
  businessModel: string;
}

export interface GeneratedAnalysis {
  overallScore: number;
  scorecards: { name: string; score: number }[];
  marketAnalysis: {
    tam: string;
    sam: string;
    som: string;
  };
  personas: {
    name: string;
    role: string;
    painPoint: string;
    budget: string;
    acquisition: string;
  }[];
  competitors: {
    name: string;
    threat: string;
    pricing: string;
    UX: string;
    featureParity: string;
  }[];
  investorNotes: {
    title: string;
    status: string;
    desc: string;
  }[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  fundabilityVerdict: string;
  fundabilityDescription: string;
}

export async function generateStartupAnalysis(
  details: StartupDetails
): Promise<GeneratedAnalysis> {
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not defined. Please define it in your .env.local file."
    );
  }

  const prompt = `
You are an expert venture capitalist, startup strategist, and market analyst.
Analyze the following startup details and generate a thorough, professional venture analysis report.

STARTUP DETAILS:
- Name: ${details.startupName}
- Industry: ${details.industry}
- Target Audience: ${details.targetAudience}
- Problem Statement: ${details.problemStatement}
- Business Model: ${details.businessModel}

Deliver your analysis strictly in the requested JSON structure. Keep all insights realistic, high-quality, and specific to the startup's details.

JSON Schema format:
{
  "overallScore": number (0-100),
  "scorecards": [
    { "name": "Market Demand", "score": number },
    { "name": "Competition", "score": number },
    { "name": "Profitability", "score": number },
    { "name": "Feasibility", "score": number },
    { "name": "Growth Potential", "score": number }
  ],
  "marketAnalysis": {
    "tam": "string",
    "sam": "string",
    "som": "string"
  },
  "personas": [
    {
      "name": "string",
      "role": "string",
      "painPoint": "string",
      "budget": "string",
      "acquisition": "string"
    }
  ],
  "competitors": [
    {
      "name": "string",
      "threat": "High" | "Medium" | "Low",
      "pricing": "string",
      "UX": "string",
      "featureParity": "string (e.g. 70%)"
    }
  ],
  "investorNotes": [
    {
      "title": "string",
      "status": "Strong" | "Medium" | "Low",
      "desc": "string"
    }
  ],
  "swot": {
    "strengths": ["string"],
    "weaknesses": ["string"],
    "opportunities": ["string"],
    "threats": ["string"]
  },
  "fundabilityVerdict": "string",
  "fundabilityDescription": "string"
}

Provide exactly 2 customer personas, 3 competitors, and 3 investor notes. Provide exactly 3-4 strengths, weaknesses, opportunities, and threats each.
Ensure no markdown formatting (like \`\`\`json) wraps the response if using JSON mode, or request response_format JSON.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful VC assistant that outputs raw JSON content.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from OpenAI");
  }

  return JSON.parse(content) as GeneratedAnalysis;
}

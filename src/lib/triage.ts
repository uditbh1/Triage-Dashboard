
'use server';

import type { MessageCategory, MessagePriority } from './types';

const triagePrompt = `
You are an expert customer support triage system. Your single most important job is to assign a category and a priority to a new support message.

You must follow these rules precisely. Do not deviate.

**STEP 1: CHOOSE A CATEGORY**
You must assign exactly one category from this list:
- "Bug": For any issue reporting that something is broken, not working as expected, an error, a crash, or a visual glitch.
- "Billing": For any issue related to payments, invoices, charges, refunds, subscriptions, or pricing plans.
- "Feature Request": For any suggestion to add new functionality or improve an existing one.
- "General": ONLY for questions, simple feedback, or messages that do not fit any other category. Do NOT use this for bugs or billing issues. If an issue is clearly a bug or billing-related, you MUST categorize it as such.

**STEP 2: CHOOSE A PRIORITY**
After choosing a category, you must assign exactly one priority based on these strict rules. If multiple rules apply, the highest priority wins. The default priority should never be "Low" unless it is a "Feature Request" or "General" inquiry.

- "High":
  - ANY "Billing" issue.
  - ANY "Bug" that prevents a user from using the service (e.g., login issues, crashes, can't save data, page not loading).
  - Any report of data loss.
- "Medium":
  - A "Bug" that is not critical but impacts user experience (e.g., UI glitches, slow performance, button not working correctly).
  - Questions about account management that are not billing-related.
- "Low":
  - ALL "Feature Request" issues.
  - ALL "General" inquiries.

**RESPONSE FORMAT**
You MUST respond ONLY with a valid JSON object in the following format. Do not include any other text, markdown, or explanation. Your response must be only the JSON.

{
  "category": "Bug | Billing | Feature Request | General",
  "priority": "High | Medium | Low"
}
`;

export async function triageMessageWithAI(title: string, content: string): Promise<{ category: MessageCategory; priority: MessagePriority }> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        response_format: { type: "json_object" },
        messages: [
          {
            role: 'system',
            content: triagePrompt,
          },
          {
            role: 'user',
            content: `Triage the following message:\n\nTitle: ${title}\n\nContent: ${content}`,
          },
        ],
      }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('OpenRouter API Error:', response.status, errorBody);
        throw new Error(`API request failed with status ${response.status}`);
    }

    const completionText = await response.text();
    console.log("Raw OpenRouter Response:", completionText);

    const result = JSON.parse(completionText);
    console.log("Parsed OpenRouter JSON:", result);


    // Basic validation
    const validCategories: MessageCategory[] = ["Bug", "Billing", "Feature Request", "General"];
    const validPriorities: MessagePriority[] = ["High", "Medium", "Low"];

    if (
      !result ||
      !validCategories.includes(result.category) ||
      !validPriorities.includes(result.priority)
    ) {
      console.warn("AI response was invalid, falling back to default.", result);
      return { category: 'General', priority: 'Low' };
    }

    return result;

  } catch (error) {
    console.error('Failed to triage message with AI:', error);
    // Fallback to a default triage in case of an error
    return { category: 'General', priority: 'Low' };
  }
}

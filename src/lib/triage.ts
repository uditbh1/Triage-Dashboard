
'use server';

import type { MessageCategory, MessagePriority } from './types';

const triagePrompt = `
You are an expert support message triager. Analyze the following message and determine its category and priority.

The possible categories are: "Bug", "Billing", "Feature Request", "General".
The possible priorities are: "High", "Medium", "Low".

Respond with a JSON object containing the "category" and "priority" keys. Do not include any other text or formatting in your response.

For example:
{
  "category": "Bug",
  "priority": "High"
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
            content: `Title: ${title}\n\nContent: ${content}`,
          },
        ],
      }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('OpenRouter API Error:', response.status, errorBody);
        throw new Error(`API request failed with status ${response.status}`);
    }

    const completion = await response.json();
    const result = JSON.parse(completion.choices[0].message.content);

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

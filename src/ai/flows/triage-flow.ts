'use server';
/**
 * @fileoverview A support message triage AI agent.
 *
 * - triageMessage - A function that handles the message triage process.
 * - TriageInput - The input type for the triageMessage function.
 * - TriageOutput - The return type for the triageMessage function.
 */

import {z} from 'zod';

const TriageInputSchema = z.object({
  title: z.string().describe('The title of the support message.'),
  content: z.string().describe('The content of the support message.'),
});
export type TriageInput = z.infer<typeof TriageInputSchema>;

const TriageOutputSchema = z.object({
  category: z.enum(['Bug', 'Billing', 'Feature Request', 'General']).describe('The determined category of the message.'),
  priority: z.enum(['High', 'Medium', 'Low']).describe('The determined priority of the message.'),
});
export type TriageOutput = z.infer<typeof TriageOutputSchema>;

export async function triageMessage(input: TriageInput): Promise<TriageOutput> {

  const prompt = `You are an expert support message triager. Analyze the following message and determine its category and priority.

  **Categorization Rules:**
  - **Billing**: Anything related to invoices, charges, payments, refunds, or subscriptions.
  - **Bug**: Anything related to crashes, errors, something not loading, or unexpected behavior.
  - **Feature Request**: Any suggestion for a new feature, integration, or improvement.
  - **General**: Anything else.

  **Prioritization Rules:**
  - **High**: Billing issues, login problems, crashes, or anything preventing the user from using the core product.
  - **Medium**: Most bugs that are not critical blockers.
  - **Low**: Feature requests, general questions, and non-urgent inquiries.

  **Message Title**: ${input.title}
  **Message Content**: ${input.content}
  `;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          { role: 'system', content: 'You are an expert JSON provider. Your response must be a valid JSON object that conforms to the provided schema. Do not include any other text or markdown.' },
          { role: 'user', content: prompt }
        ],
        response_format: {
          type: 'json_object',
          // Note: The 'schema' field for detailed JSON enforcement is not universally supported on all models/providers via the OpenAI-compatible API.
          // We rely on the system prompt for structure.
        }
      }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API call failed with status ${response.status}: ${errorText}`);
    }

    const jsonResponse = await response.json();
    const result = JSON.parse(jsonResponse.choices[0].message.content);
    
    // Validate the result against our Zod schema
    const parsedResult = TriageOutputSchema.parse(result);

    return parsedResult;

  } catch (error) {
    console.error('Error during triage API call:', error);
    throw new Error('Failed to triage message with AI.');
  }
}

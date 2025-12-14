'use server';
/**
 * @fileoverview A support message triage AI agent.
 *
 * - triageMessage - A function that handles the message triage process.
 * - TriageInput - The input type for the triageMessage function.
 * - TriageOutput - The return type for the triageMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

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
  return triageMessageFlow(input);
}

const triagePrompt = ai.definePrompt({
    name: 'triagePrompt',
    input: { schema: TriageInputSchema },
    output: { schema: TriageOutputSchema },
    model: googleAI('gemini-1.5-flash-latest'),
    prompt: `You are an expert support message triager. Analyze the following message and determine its category and priority.

    **Categorization Rules:**
    - **Billing**: Anything related to invoices, charges, payments, refunds, or subscriptions.
    - **Bug**: Anything related to crashes, errors, something not loading, or unexpected behavior.
    - **Feature Request**: Any suggestion for a new feature, integration, or improvement.
    - **General**: Anything else.

    **Prioritization Rules:**
    - **High**: Billing issues, login problems, crashes, or anything preventing the user from using the core product.
    - **Medium**: Most bugs that are not critical blockers.
    - **Low**: Feature requests, general questions, and non-urgent inquiries.

    **Message Title**: {{{title}}}
    **Message Content**: {{{content}}}
    `,
});


const triageMessageFlow = ai.defineFlow(
  {
    name: 'triageMessageFlow',
    inputSchema: TriageInputSchema,
    outputSchema: TriageOutputSchema,
  },
  async (input) => {
    const { output } = await triagePrompt(input);
    if (!output) {
      throw new Error('Failed to triage message');
    }
    return output;
  }
);

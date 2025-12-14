'use server';
/**
 * @fileoverview A support message triage AI agent.
 *
 * - triageMessage - A function that handles the message triage process.
 * - TriageInput - The input type for the triageMessage function.
 * - TriageOutput - The return type for the triageMessage function.
 */

import {ai} from '@/ai/genkit';
import type { MessageCategory, MessagePriority } from '@/lib/types';
import { categorizeMessage, prioritizeMessage } from '@/lib/triage';
import {z} from 'genkit';

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

const triageMessageFlow = ai.defineFlow(
  {
    name: 'triageMessageFlow',
    inputSchema: TriageInputSchema,
    outputSchema: TriageOutputSchema,
  },
  async (input: TriageInput): Promise<TriageOutput> => {
    const category = categorizeMessage(input.title, input.content);
    const priority = prioritizeMessage(input.title, input.content, category);
    
    return {
      category,
      priority,
    };
  }
);

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.OPENROUTER_API_KEY || '',
      // baseUrl: 'https://openrouter.ai/api/v1',
    }),
  ],
  // model: 'openai/gpt-3.5-turbo',
});

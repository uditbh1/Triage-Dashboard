import type { MessageCategory, MessagePriority } from './types';

const CATEGORY_KEYWORDS: Record<MessageCategory, string[]> = {
  Billing: ['invoice', 'charge', 'payment', 'refund', 'subscription', 'bill', 'receipt'],
  Bug: ['bug', 'crash', 'broken', 'not loading', 'error', 'issue', 'problem', 'fail', 'login'],
  'Feature Request': ['feature', 'add', 'idea', 'request', 'suggestion', 'integrate', 'support'],
  General: [],
};

const PRIORITY_KEYWORDS: Record<"High" | "Medium", string[]> = {
    High: ['crash', 'urgent', 'critical', 'blocker', 'not loading', 'login', 'payment'],
    Medium: ['bug', 'issue', 'problem', 'broken'],
};

function hasKeywords(text: string, keywords: string[]): boolean {
  const lowerText = text.toLowerCase();
  return keywords.some(keyword => lowerText.includes(keyword));
}

export function categorizeMessage(title: string, content: string): MessageCategory {
  const text = `${title} ${content}`;
  
  if (hasKeywords(text, CATEGORY_KEYWORDS.Billing)) {
    return 'Billing';
  }
  if (hasKeywords(text, CATEGORY_KEYWORDS.Bug)) {
    return 'Bug';
  }
  if (hasKeywords(text, CATEGORY_KEYWORDS['Feature Request'])) {
    return 'Feature Request';
  }
  
  return 'General';
}

export function prioritizeMessage(title: string, content: string, category: MessageCategory): MessagePriority {
  const text = `${title} ${content}`;

  if (category === 'Billing' || hasKeywords(text, PRIORITY_KEYWORDS.High)) {
    return 'High';
  }
  if (category === 'Bug' && hasKeywords(text, PRIORITY_KEYWORDS.Medium)) {
    return 'Medium';
  }
  if (category === 'Bug') { // Fallback for other bugs
    return 'Medium'
  }

  return 'Low';
}

export type MessageCategory = "Bug" | "Billing" | "Feature Request" | "General";
export type MessagePriority = "High" | "Medium" | "Low";
export type MessageStatus = "Open" | "Resolved";

export interface Message {
  id: string;
  content: string;
  customerName: string;
  category: MessageCategory;
  priority: MessagePriority;
  status: MessageStatus;
  timestamp: string;
}

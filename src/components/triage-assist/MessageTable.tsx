
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Message, MessageCategory, MessagePriority } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Bug, CreditCard, Lightbulb, MessageSquare, Check, RotateCcw } from "lucide-react";
import { ClientTime } from "./ClientTime";

interface MessageTableProps {
  messages: Message[];
  onResolveMessage: (id: string) => void;
  onRowClick: (message: Message) => void;
}

const categoryDetails: Record<MessageCategory, { icon: React.ElementType; color: string }> = {
  Bug: { icon: Bug, color: "bg-red-500" },
  Billing: { icon: CreditCard, color: "bg-blue-500" },
  "Feature Request": { icon: Lightbulb, color: "bg-yellow-500" },
  General: { icon: MessageSquare, color: "bg-gray-500" },
};

const priorityBadgeVariant: Record<MessagePriority, "destructive" | "secondary" | "outline"> = {
  High: "destructive",
  Medium: "secondary",
  Low: "outline",
};

export function MessageTable({ messages, onResolveMessage, onRowClick }: MessageTableProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-12 text-center">
        <div className="rounded-full bg-primary/10 p-3">
            <Check className="h-8 w-8 text-primary"/>
        </div>
        <h3 className="text-xl font-semibold tracking-tight">All Clear!</h3>
        <p className="text-sm text-muted-foreground">
          No messages match the current filters. Inbox zero!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Message ID</TableHead>
            <TableHead className="w-[120px]">Priority</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Message</TableHead>
            <TableHead className="w-[180px]">Category</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[150px]">Received</TableHead>
            <TableHead className="w-[120px] text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((msg) => {
            const CategoryIcon = categoryDetails[msg.category].icon;
            return (
              <TableRow
                key={msg.id}
                onClick={() => onRowClick(msg)}
                className={cn(
                  "transition-all cursor-pointer",
                  msg.status === "Resolved" && "bg-muted/50 text-muted-foreground",
                  msg.priority === "High" && msg.status === "Open" && "bg-destructive/10"
                )}
              >
                <TableCell className="font-mono text-xs">{msg.id}</TableCell>
                <TableCell>
                  <Badge 
                    variant={priorityBadgeVariant[msg.priority]}
                    className={cn({
                      'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-800': msg.priority === 'Medium'
                    })}
                  >
                    {msg.priority}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{msg.customerName}</TableCell>
                <TableCell className="max-w-[300px] truncate font-medium" title={msg.content}>
                  {msg.title}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="flex items-center gap-2">
                    <CategoryIcon className="h-3.5 w-3.5" />
                    <span>{msg.category}</span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={msg.status === "Resolved" ? "default" : "secondary"} className={cn(msg.status === "Resolved" && "bg-green-600/20 text-green-700 border-green-600/30 hover:bg-green-600/30")}>
                    {msg.status}
                  </Badge>
                </TableCell>
                 <TableCell>
                  <ClientTime timestamp={msg.timestamp} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant={msg.status === "Open" ? "outline" : "ghost"}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onResolveMessage(msg.id);
                    }}
                  >
                    {msg.status === 'Open' ? <Check className="mr-2 h-4 w-4" /> : <RotateCcw className="mr-2 h-4 w-4" />}
                    {msg.status === 'Open' ? 'Resolve' : 'Re-open'}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

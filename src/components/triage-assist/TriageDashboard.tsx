"use client";

import { useState, useMemo } from "react";
import type { Message, MessageCategory, MessagePriority } from "@/lib/types";
import { initialMessages } from "@/lib/data";
import { SummaryCards } from "./SummaryCards";
import { MessageTable } from "./MessageTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageDetailsDialog } from "./MessageDetailsDialog";

export default function TriageDashboard() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [categoryFilter, setCategoryFilter] = useState<MessageCategory | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<MessagePriority | "all">("all");
  const [showResolved, setShowResolved] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { toast } = useToast();

  const handleResolveMessage = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === id) {
          const newStatus = msg.status === "Open" ? "Resolved" : "Open";
          if (newStatus === "Resolved") {
            toast({
              title: "Message Resolved",
              description: `Message ${id} has been marked as resolved.`,
            });
          }
          return { ...msg, status: newStatus };
        }
        return msg;
      })
    );
  };

  const handleRowClick = (message: Message) => {
    setSelectedMessage(message);
  };

  const stats = useMemo(() => {
    const s = {
      total: messages.length,
      open: 0,
      resolved: 0,
      byCategory: { Bug: 0, Billing: 0, "Feature Request": 0, General: 0 },
      byPriority: { High: 0, Medium: 0, Low: 0 },
    };
    for (const msg of messages) {
      if (msg.status === "Open") s.open++;
      else s.resolved++;
      s.byCategory[msg.category]++;
      if (msg.status === 'Open') {
        s.byPriority[msg.priority]++;
      }
    }
    return s;
  }, [messages]);

  const filteredMessages = useMemo(() => {
    return messages
      .filter((msg) => (showResolved ? true : msg.status === "Open"))
      .filter((msg) => categoryFilter === "all" || msg.category === categoryFilter)
      .filter((msg) => priorityFilter === "all" || msg.priority === priorityFilter);
  }, [messages, showResolved, categoryFilter, priorityFilter]);

  return (
    <>
      <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">TriageAssist Dashboard</h1>
          <p className="text-muted-foreground">
            Your support message inbox, automatically categorized and prioritized.
          </p>
        </header>

        <SummaryCards stats={stats} />

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>Inbox</CardTitle>
              <div className="flex flex-wrap items-center gap-4">
                <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as MessageCategory | "all")}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Bug">Bug</SelectItem>
                    <SelectItem value="Billing">Billing</SelectItem>
                    <SelectItem value="Feature Request">Feature Request</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as MessagePriority | "all")}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Switch id="show-resolved" checked={showResolved} onCheckedChange={setShowResolved} />
                  <Label htmlFor="show-resolved">Show Resolved</Label>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MessageTable
              messages={filteredMessages}
              onResolveMessage={handleResolveMessage}
              onRowClick={handleRowClick}
            />
          </CardContent>
        </Card>
      </div>
      <MessageDetailsDialog
        message={selectedMessage}
        onOpenChange={(isOpen) => !isOpen && setSelectedMessage(null)}
      />
    </>
  );
}

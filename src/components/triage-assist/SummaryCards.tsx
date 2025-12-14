"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MessageCategory, MessagePriority } from "@/lib/types";
import { Bug, CreditCard, Lightbulb, MessageSquare, AlertTriangle, Inbox, CheckCircle } from "lucide-react";

interface SummaryCardsProps {
  stats: {
    total: number;
    open: number;
    resolved: number;
    byCategory: Record<MessageCategory, number>;
    byPriority: Record<"High", number>; // Only showing high priority for prominence
  };
}

const categoryIcons: Record<MessageCategory, React.ElementType> = {
  "Bug": Bug,
  "Billing": CreditCard,
  "Feature Request": Lightbulb,
  "General": MessageSquare
};

export function SummaryCards({ stats }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
          <Inbox className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.open}</div>
          <p className="text-xs text-muted-foreground">out of {stats.total} total messages</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.byPriority.High}</div>
          <p className="text-xs text-muted-foreground">require immediate attention</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bugs Reported</CardTitle>
          <Bug className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.byCategory.Bug}</div>
          <p className="text-xs text-muted-foreground">open bug reports</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resolved Tickets</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.resolved}</div>
          <p className="text-xs text-muted-foreground">messages closed</p>
        </CardContent>
      </Card>
    </div>
  );
}

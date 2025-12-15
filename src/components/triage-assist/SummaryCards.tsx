
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MessageCategory } from "@/lib/types";
import { Bug, CreditCard, Lightbulb, AlertTriangle, Inbox, CheckCircle, MessageSquare, List, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardsProps {
  stats: {
    total: number;
    open: number;
    resolved: number;
    byCategory: Record<MessageCategory | 'All', number>;
    byPriority: Record<"High" | "Medium" | "Low", number>;
  };
}

const categoryIcons = {
    All: List,
    Bug: Bug,
    Billing: CreditCard,
    "Feature Request": Lightbulb,
    General: MessageSquare,
}

const priorityIcons = {
    High: AlertTriangle,
    Medium: CircleDot,
    Low: CircleDot,
    Resolved: CheckCircle,
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {(Object.keys(stats.byCategory) as (MessageCategory | 'All')[]).map(category => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            return (
                <Card key={category}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {category === 'All' ? 'All Open' : `${category}s`}
                        </CardTitle>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.byCategory[category]}</div>
                    </CardContent>
                </Card>
            )
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.byPriority.High}</div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Medium</CardTitle>
                <CircleDot className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.byPriority.Medium}</div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low</CardTitle>
                <CircleDot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.byPriority.Low}</div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.resolved}</div>
            </CardContent>
        </Card>
      </div>
    </>
  );
}


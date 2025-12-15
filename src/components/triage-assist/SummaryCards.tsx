
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MessageCategory } from "@/lib/types";
import { Bug, CreditCard, Lightbulb, AlertTriangle, List, CircleDot, CheckCircle, MessageSquare } from "lucide-react";
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
        <Card className="bg-red-100 dark:bg-red-900/40 border-red-200 dark:border-red-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-900 dark:text-red-200">High</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-red-900 dark:text-red-200">{stats.byPriority.High}</div>
            </CardContent>
        </Card>
         <Card className="bg-amber-100 dark:bg-amber-900/40 border-amber-200 dark:border-amber-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-200">Medium</CardTitle>
                <CircleDot className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-amber-900 dark:text-amber-200">{stats.byPriority.Medium}</div>
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
         <Card className="bg-green-100 dark:bg-green-900/40 border-green-200 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-900 dark:text-green-200">Resolved</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-900 dark:text-green-200">{stats.resolved}</div>
            </CardContent>
        </Card>
      </div>
    </>
  );
}

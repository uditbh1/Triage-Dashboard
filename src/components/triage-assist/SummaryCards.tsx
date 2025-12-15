
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MessageCategory } from "@/lib/types";
import { Bug, CreditCard, Lightbulb, AlertTriangle, List, CircleDot, CheckCircle, MessageSquare } from "lucide-react";

interface SummaryCardsProps {
  stats: {
    total: number;
    open: number;
    resolved: number;
    byCategory: Record<MessageCategory | 'All', number>;
    byPriority: Record<"High" | "Medium" | "Low", number>;
  };
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                  All Open
              </CardTitle>
              <List className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">{stats.byCategory.All}</div>
          </CardContent>
      </Card>
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bugs</CardTitle>
              <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">{stats.byCategory.Bug}</div>
          </CardContent>
      </Card>
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Billing</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">{stats.byCategory.Billing}</div>
          </CardContent>
      </Card>
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feature Requests</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">{stats.byCategory['Feature Request']}</div>
          </CardContent>
      </Card>
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">General</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">{stats.byCategory.General}</div>
          </CardContent>
      </Card>
      <Card className="bg-red-100 dark:bg-red-900/40 border-red-200 dark:border-red-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-900 dark:text-red-200">High Priority</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold text-red-900 dark:text-red-200">{stats.byPriority.High}</div>
          </CardContent>
      </Card>
       <Card className="bg-amber-100 dark:bg-amber-900/40 border-amber-200 dark:border-amber-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-200">Medium Priority</CardTitle>
              <CircleDot className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold text-amber-900 dark:text-amber-200">{stats.byPriority.Medium}</div>
          </CardContent>
      </Card>
       <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Priority</CardTitle>
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
  );
}

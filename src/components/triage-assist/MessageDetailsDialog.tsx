
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Message } from "@/lib/types";
import { ClientTime } from "./ClientTime";
import { format } from "date-fns";

interface MessageDetailsDialogProps {
  message: Message | null;
  onOpenChange: (open: boolean) => void;
}

export function MessageDetailsDialog({ message, onOpenChange }: MessageDetailsDialogProps) {
  if (!message) {
    return null;
  }

  return (
    <Dialog open={!!message} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{message.title}</DialogTitle>
          <DialogDescription>
            Details for message ID: {message.id}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm text-muted-foreground col-span-1">Customer</p>
            <p className="col-span-3 font-medium">{message.customerName}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm text-muted-foreground col-span-1">Received</p>
            <p className="col-span-3">{format(new Date(message.timestamp), "PPP p")}</p>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm text-muted-foreground col-span-1">Priority</p>
            <div className="col-span-3">
                <Badge variant={message.priority === "High" ? "destructive" : message.priority === "Medium" ? "secondary" : "outline"}>
                    {message.priority}
                </Badge>
            </div>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm text-muted-foreground col-span-1">Category</p>
            <div className="col-span-3">
                <Badge variant="outline">{message.category}</Badge>
            </div>
          </div>
           <div className="grid grid-cols-4 items-start gap-4">
            <p className="text-sm text-muted-foreground col-span-1 mt-1">Message</p>
            <p className="col-span-3 bg-muted/50 p-3 rounded-md border text-sm">{message.content}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

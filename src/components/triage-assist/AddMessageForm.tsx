"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const formSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters."),
  title: z.string().min(5, "Title must be at least 5 characters."),
  content: z.string().min(10, "Message must be at least 10 characters."),
});

type AddMessageFormValues = z.infer<typeof formSchema>;

interface AddMessageFormProps {
  onSubmit: (data: AddMessageFormValues) => Promise<void>;
}

export function AddMessageForm({ onSubmit }: AddMessageFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddMessageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      title: "",
      content: "",
    },
  });

  const handleSubmit = async (data: AddMessageFormValues) => {
    setIsSubmitting(true);
    await onSubmit(data);
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Login Issue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the issue in detail..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Triaging..." : "Add & Triage Message"}
        </Button>
      </form>
    </Form>
  );
}

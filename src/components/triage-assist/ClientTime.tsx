"use client";

import { useState, useEffect } from "react";
import { format, formatDistanceToNow } from "date-fns";

interface ClientTimeProps {
  timestamp: string;
}

export function ClientTime({ timestamp }: ClientTimeProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading skeleton
  }

  const date = new Date(timestamp);

  return (
    <div className="flex flex-col">
      <span title={format(date, "PPP p")}>
        {formatDistanceToNow(date, { addSuffix: true })}
      </span>
    </div>
  );
}

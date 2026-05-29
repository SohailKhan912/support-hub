import type { TicketStatus } from "@/lib/tickets/types";
import { cn } from "@/lib/utils";

const styles: Record<TicketStatus, string> = {
  Open: "bg-status-open-bg text-status-open",
  "In Progress": "bg-status-progress-bg text-status-progress",
  Closed: "bg-status-closed-bg text-status-closed",
};

interface StatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

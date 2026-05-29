import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  title = "No tickets found",
  description = "Try adjusting your search or filters.",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Inbox className="h-6 w-6" />
      </span>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

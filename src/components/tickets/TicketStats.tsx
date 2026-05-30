import { Ticket as TicketIcon, Inbox, Clock, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Ticket, TicketStatus } from "@/lib/tickets/types";
import { cn } from "@/lib/utils";

interface TicketStatsProps {
  tickets: Ticket[];
  className?: string;
}

interface StatCard {
  label: string;
  value: number;
  icon: LucideIcon;
  accent: string;
}

export function TicketStats({ tickets, className }: TicketStatsProps) {
  const countByStatus = (status: TicketStatus) =>
    tickets.filter((ticket) => ticket.status === status).length;

  const cards: StatCard[] = [
    {
      label: "Total Tickets",
      value: tickets.length,
      icon: TicketIcon,
      accent: "text-foreground",
    },
    {
      label: "Open",
      value: countByStatus("Open"),
      icon: Inbox,
      accent: "text-status-open",
    },
    {
      label: "In Progress",
      value: countByStatus("In Progress"),
      icon: Clock,
      accent: "text-status-progress",
    },
    {
      label: "Closed",
      value: countByStatus("Closed"),
      icon: CheckCircle2,
      accent: "text-status-closed",
    },
  ];

  return (
    <div className={cn("grid grid-cols-2 gap-3 lg:grid-cols-4", className)}>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {card.label}
              </span>
              <Icon className={cn("h-4 w-4", card.accent)} />
            </div>
            <p className={cn("mt-2 text-2xl font-semibold tracking-tight", card.accent)}>
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

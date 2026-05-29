import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import type { Ticket } from "@/lib/tickets/types";
import { formatDate } from "@/lib/tickets/format";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";

interface TicketTableProps {
  tickets: Ticket[];
}

export function TicketTable({ tickets }: TicketTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Desktop / tablet table */}
      <table className="hidden w-full text-sm md:table">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-medium">Ticket ID</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Subject</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Created</th>
            <th className="px-4 py-3 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="border-b border-border last:border-0 transition-colors hover:bg-muted/30"
            >
              <td className="px-4 py-3 font-medium text-foreground">{ticket.id}</td>
              <td className="px-4 py-3 text-muted-foreground">{ticket.customerName}</td>
              <td className="max-w-xs truncate px-4 py-3 text-foreground">{ticket.subject}</td>
              <td className="px-4 py-3">
                <StatusBadge status={ticket.status} />
              </td>
              <td className="px-4 py-3 text-muted-foreground">{formatDate(ticket.createdAt)}</td>
              <td className="px-4 py-3 text-right">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/tickets/$ticketId" params={{ ticketId: ticket.id }}>
                    <Eye className="h-4 w-4" />
                    View
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile card list */}
      <ul className="divide-y divide-border md:hidden">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="space-y-2 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">{ticket.id}</span>
              <StatusBadge status={ticket.status} />
            </div>
            <p className="text-sm font-medium text-foreground">{ticket.subject}</p>
            <p className="text-xs text-muted-foreground">
              {ticket.customerName} · {formatDate(ticket.createdAt)}
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/tickets/$ticketId" params={{ ticketId: ticket.id }}>
                <Eye className="h-4 w-4" />
                View ticket
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

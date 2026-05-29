import { useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { fetchTickets } from "@/lib/tickets/api";
import type { Ticket } from "@/lib/tickets/types";
import { Navbar } from "@/components/tickets/Navbar";
import { SearchBar } from "@/components/tickets/SearchBar";
import { StatusFilter, type StatusFilterValue } from "@/components/tickets/StatusFilter";
import { TicketTable } from "@/components/tickets/TicketTable";
import { LoadingState } from "@/components/tickets/LoadingState";
import { EmptyState } from "@/components/tickets/EmptyState";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tickets — HelpDesk Support CRM" },
      {
        name: "description",
        content: "Manage and track customer support tickets in one clean dashboard.",
      },
      { property: "og:title", content: "Tickets — HelpDesk Support CRM" },
      {
        property: "og:description",
        content: "Manage and track customer support tickets in one clean dashboard.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilterValue>("All");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchTickets().then((data) => {
      if (active) {
        setTickets(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tickets.filter((t) => {
      const matchesStatus = status === "All" || t.status === status;
      const matchesSearch =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.customerName.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [tickets, search, status]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Support Tickets</h1>
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading tickets..." : `${filtered.length} of ${tickets.length} tickets`}
          </p>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <StatusFilter value={status} onChange={setStatus} />
          <Button asChild className="sm:w-auto">
            <Link to="/tickets/new">
              <Plus className="h-4 w-4" />
              Create Ticket
            </Link>
          </Button>
        </div>

        {loading ? (
          <LoadingState label="Loading tickets..." />
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card">
            <EmptyState
              action={
                <Button asChild size="sm" variant="outline">
                  <Link to="/tickets/new">Create your first ticket</Link>
                </Button>
              }
            />
          </div>
        ) : (
          <TicketTable tickets={filtered} />
        )}
      </main>
    </div>
  );
}

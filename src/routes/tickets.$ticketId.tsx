import { useEffect, useState } from "react";
import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Mail, Save, StickyNote, User } from "lucide-react";
import { toast } from "sonner";
import { fetchTicket, updateTicket } from "@/lib/tickets/api";
import type { Ticket, TicketStatus } from "@/lib/tickets/types";
import { TICKET_STATUSES } from "@/lib/tickets/types";
import { formatDateTime } from "@/lib/tickets/format";
import { Navbar } from "@/components/tickets/Navbar";
import { StatusBadge } from "@/components/tickets/StatusBadge";
import { LoadingState } from "@/components/tickets/LoadingState";
import { EmptyState } from "@/components/tickets/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/tickets/$ticketId")({
  head: () => ({
    meta: [
      { title: "Ticket Details — HelpDesk Support CRM" },
      { name: "description", content: "View and update a customer support ticket." },
    ],
  }),
  component: TicketDetailsPage,
  errorComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState title="Could not load ticket" description="Please go back and try again." />
      </main>
    </div>
  ),
});

function TicketDetailsPage() {
  const { ticketId } = Route.useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState<Ticket | undefined>();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<TicketStatus>("Open");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchTicket(ticketId).then((data) => {
      if (!active) return;
      setTicket(data);
      if (data) setStatus(data.status);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [ticketId]);

  const dirty = ticket ? status !== ticket.status || note.trim().length > 0 : false;

  async function handleSave() {
    if (!ticket || !dirty) return;
    setSaving(true);
    try {
      const updated = await updateTicket(ticket.id, { status, newNote: note });
      if (updated) {
        setTicket(updated);
        setStatus(updated.status);
        setNote("");
        toast.success("Changes saved");
        router.invalidate();
      }
    } catch {
      toast.error("Could not save changes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to tickets
          </Link>
        </Button>

        {loading ? (
          <LoadingState label="Loading ticket..." />
        ) : !ticket ? (
          <div className="rounded-xl border border-border bg-card">
            <EmptyState
              title="Ticket not found"
              description="This ticket may have been removed."
              action={
                <Button asChild size="sm" variant="outline">
                  <Link to="/">Back to dashboard</Link>
                </Button>
              }
            />
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {ticket.id}
                    </p>
                    <CardTitle className="mt-1 text-xl">{ticket.subject}</CardTitle>
                  </div>
                  <StatusBadge status={ticket.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoRow icon={<User className="h-4 w-4" />} label="Customer">
                    {ticket.customerName}
                  </InfoRow>
                  <InfoRow icon={<Mail className="h-4 w-4" />} label="Email">
                    {ticket.customerEmail}
                  </InfoRow>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Description
                  </p>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                    {ticket.description}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Created {formatDateTime(ticket.createdAt)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Manage Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2 sm:max-w-xs">
                  <Label htmlFor="status">Change Status</Label>
                  <Select value={status} onValueChange={(v) => setStatus(v as TicketStatus)}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TICKET_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Add Note</Label>
                  <Textarea
                    id="note"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add an internal note about this ticket..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={!dirty || saving}>
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <StickyNote className="h-4 w-4" />
                  Notes ({ticket.notes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ticket.notes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No notes yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {ticket.notes.map((n, i) => (
                      <li key={n.id}>
                        {i > 0 && <Separator className="mb-3" />}
                        <p className="text-sm text-foreground">{n.body}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatDateTime(n.createdAt)}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="truncate text-sm text-foreground">{children}</p>
      </div>
    </div>
  );
}

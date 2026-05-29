import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { createTicket } from "@/lib/tickets/api";
import type { NewTicketInput } from "@/lib/tickets/types";
import { Navbar } from "@/components/tickets/Navbar";
import { TicketForm } from "@/components/tickets/TicketForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/tickets/new")({
  head: () => ({
    meta: [
      { title: "Create Ticket — HelpDesk Support CRM" },
      { name: "description", content: "Log a new customer support ticket." },
      { property: "og:title", content: "Create Ticket — HelpDesk Support CRM" },
      { property: "og:description", content: "Log a new customer support ticket." },
    ],
  }),
  component: CreateTicketPage,
});

function CreateTicketPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(values: NewTicketInput) {
    setSubmitting(true);
    try {
      const ticket = await createTicket(values);
      toast.success(`Ticket ${ticket.id} created`);
      navigate({ to: "/tickets/$ticketId", params: { ticketId: ticket.id } });
    } catch {
      toast.error("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to tickets
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Create a New Ticket</CardTitle>
            <CardDescription>
              Capture the customer's details and describe their issue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TicketForm onSubmit={handleSubmit} submitting={submitting} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

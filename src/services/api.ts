import type { NewTicketInput, Ticket, TicketStatus } from "@/lib/tickets/types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://support-hub-backend-3hit.onrender.com";
// Helper to convert backend Ticket to frontend Ticket
function transformBackendTicket(backendTicket: any): Ticket {
  return {
    id: backendTicket.ticket_id,
    customerName: backendTicket.customer_name,
    customerEmail: backendTicket.customer_email,
    subject: backendTicket.subject,
    description: backendTicket.description,
    status: backendTicket.status as TicketStatus,
    createdAt: backendTicket.created_at,
    notes: (backendTicket.notes || []).map((note: any) => ({
      id: String(note.id),
      body: note.note_text,
      createdAt: note.created_at,
    })),
  };
}

// Get all tickets
export async function getTickets(
  search?: string,
  status?: string
): Promise<Ticket[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (status) params.append("status", status);

  const res = await fetch(`${API_BASE_URL}/tickets?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch tickets");
  const backendTickets = await res.json();
  return backendTickets.map(transformBackendTicket);
}

// Get single ticket
export async function getTicket(ticketId: string): Promise<Ticket> {
  const res = await fetch(`${API_BASE_URL}/tickets/${ticketId}`);
  if (!res.ok) throw new Error("Ticket not found");
  const backendTicket = await res.json();
  return transformBackendTicket(backendTicket);
}

// Create ticket
export async function createTicket(data: NewTicketInput): Promise<Ticket> {
  const res = await fetch(`${API_BASE_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      subject: data.subject,
      description: data.description,
    }),
  });
  if (!res.ok) throw new Error("Failed to create ticket");
  const backendTicket = await res.json();
  return transformBackendTicket(backendTicket);
}

// Update ticket
export async function updateTicket(
  ticketId: string,
  data: { status?: TicketStatus; newNote?: string }
): Promise<Ticket> {
  const res = await fetch(`${API_BASE_URL}/tickets/${ticketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: data.status,
      new_note: data.newNote,
    }),
  });

  if (!res.ok) throw new Error("Failed to update ticket");

  const backendTicket = await res.json();
  return transformBackendTicket(backendTicket);
}
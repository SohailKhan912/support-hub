import { mockTickets } from "./mock-data";
import type { NewTicketInput, Ticket, TicketStatus } from "./types";

// In-memory store acting as a fake database for placeholder API calls.
let tickets: Ticket[] = [...mockTickets];

const delay = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

function genTicketId(): string {
  const max = tickets.reduce((acc, t) => {
    const n = Number(t.id.replace("TCK-", ""));
    return Number.isFinite(n) && n > acc ? n : acc;
  }, 1000);
  return `TCK-${max + 1}`;
}

/** Placeholder API: fetch all tickets. */
export async function fetchTickets(): Promise<Ticket[]> {
  await delay();
  return [...tickets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

/** Placeholder API: fetch a single ticket by id. */
export async function fetchTicket(id: string): Promise<Ticket | undefined> {
  await delay();
  return tickets.find((t) => t.id === id);
}

/** Placeholder API: create a new ticket. */
export async function createTicket(input: NewTicketInput): Promise<Ticket> {
  await delay();
  const ticket: Ticket = {
    id: genTicketId(),
    ...input,
    status: "Open",
    createdAt: new Date().toISOString(),
    notes: [],
  };
  tickets = [ticket, ...tickets];
  return ticket;
}

/** Placeholder API: update an existing ticket's status / notes. */
export async function updateTicket(
  id: string,
  changes: { status?: TicketStatus; newNote?: string },
): Promise<Ticket | undefined> {
  await delay();
  tickets = tickets.map((t) => {
    if (t.id !== id) return t;
    const updated: Ticket = { ...t };
    if (changes.status) updated.status = changes.status;
    if (changes.newNote && changes.newNote.trim()) {
      updated.notes = [
        ...t.notes,
        {
          id: `n-${Date.now()}`,
          body: changes.newNote.trim(),
          createdAt: new Date().toISOString(),
        },
      ];
    }
    return updated;
  });
  return tickets.find((t) => t.id === id);
}

export type TicketStatus = "Open" | "In Progress" | "Closed";

export interface TicketNote {
  id: string;
  body: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  notes: TicketNote[];
}

export const TICKET_STATUSES: TicketStatus[] = ["Open", "In Progress", "Closed"];

export interface NewTicketInput {
  customerName: string;
  customerEmail: string;
  subject: string;
  description: string;
}

import type { Ticket } from "./types";

export const mockTickets: Ticket[] = [
  {
    id: "TCK-1001",
    customerName: "Amelia Chen",
    customerEmail: "amelia.chen@example.com",
    subject: "Unable to reset my password",
    description:
      "I've tried the reset password link multiple times but never receive the email. I've checked my spam folder too. Please help me regain access to my account.",
    status: "Open",
    createdAt: "2026-05-22T09:14:00.000Z",
    notes: [],
  },
  {
    id: "TCK-1002",
    customerName: "Marcus Reyes",
    customerEmail: "marcus.reyes@example.com",
    subject: "Billing charged twice this month",
    description:
      "My credit card was charged two times for the Pro plan on the same day. I need one of these charges refunded as soon as possible.",
    status: "In Progress",
    createdAt: "2026-05-23T14:42:00.000Z",
    notes: [
      {
        id: "n-1",
        body: "Reached out to billing team to confirm duplicate charge.",
        createdAt: "2026-05-23T16:00:00.000Z",
      },
    ],
  },
  {
    id: "TCK-1003",
    customerName: "Priya Nair",
    customerEmail: "priya.nair@example.com",
    subject: "Feature request: dark mode export",
    description:
      "It would be great to export reports in dark mode so they match our internal dashboards. Is this on the roadmap?",
    status: "Closed",
    createdAt: "2026-05-19T11:05:00.000Z",
    notes: [
      {
        id: "n-2",
        body: "Logged as a feature request. Closing the ticket.",
        createdAt: "2026-05-20T10:30:00.000Z",
      },
    ],
  },
  {
    id: "TCK-1004",
    customerName: "David Okafor",
    customerEmail: "david.okafor@example.com",
    subject: "App crashes on file upload",
    description:
      "Whenever I try to upload a PDF larger than 10MB the application freezes and crashes. Smaller files work fine.",
    status: "Open",
    createdAt: "2026-05-24T08:20:00.000Z",
    notes: [],
  },
  {
    id: "TCK-1005",
    customerName: "Sofia Rossi",
    customerEmail: "sofia.rossi@example.com",
    subject: "How do I invite team members?",
    description:
      "I upgraded to the Team plan but can't find where to invite my colleagues. Could you point me to the right settings page?",
    status: "In Progress",
    createdAt: "2026-05-25T13:11:00.000Z",
    notes: [],
  },
  {
    id: "TCK-1006",
    customerName: "Liam Walker",
    customerEmail: "liam.walker@example.com",
    subject: "Integration with Slack not syncing",
    description:
      "Notifications stopped appearing in Slack two days ago even though the integration shows as connected. Reconnecting did not help.",
    status: "Open",
    createdAt: "2026-05-26T10:48:00.000Z",
    notes: [],
  },
];

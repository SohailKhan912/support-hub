# Support CRM Frontend

A modern, full-featured customer support ticketing system frontend built with React, TanStack Start, TypeScript, and Tailwind CSS.

## Project Overview

This application provides a user-friendly interface for managing support tickets, allowing support agents to create, view, update, and comment on tickets efficiently.

## Tech Stack

- **React 19** - UI framework
- **TanStack Start** - Full-stack React framework with SSR
- **TypeScript** - Static typing for type safety
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Router** - File-system based routing
- **shadcn/ui** - Reusable UI components
- **React Hook Form** - Form management
- **Zod** - Schema validation

## Features

- ✅ **Create Support Tickets** - Submit new tickets with customer details and descriptions
- ✅ **View Ticket List** - Browse all tickets with sort and display options
- ✅ **Search Tickets** - Search by ticket ID, customer name, or subject
- ✅ **Filter by Status** - Filter tickets by Open, In Progress, or Closed
- ✅ **Update Ticket Status** - Change ticket status as it progresses
- ✅ **Add Notes/Comments** - Attach internal notes to tickets

## Installation Steps

### Prerequisites

- Node.js 20+
- npm, yarn, or bun

### Setup Instructions

1. **Clone the repository** (if applicable):
   ```bash
   cd support-hub
   ```

2. **Install dependencies**:
   ```bash
   # Using npm
   npm install

   # Using bun
   bun install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# API Base URL for backend
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

See `.env.example` for reference.

## Running Locally

### Start the Frontend

```bash
# Using npm
npm run dev

# Using bun
bun run dev
```

The application will start at `http://localhost:5173` (or another available port).

### Start the Backend (Required for full functionality)

Navigate to the backend directory and follow its setup instructions:
```bash
cd ../backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Deployment URL

- **Vercel Deployment**: (Replace with your actual Vercel URL after deployment)
- **Railway Deployment**: (Replace with your actual Railway URL after deployment)

## Folder Structure

```
support-hub/
├── src/
│   ├── components/
│   │   ├── tickets/        # Ticket-specific UI components
│   │   └── ui/             # Reusable shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and mock data
│   ├── routes/             # File-system based routes
│   ├── services/           # API service layer
│   ├── routeTree.gen.ts    # Auto-generated route tree
│   ├── router.tsx          # Router configuration
│   ├── server.ts           # Custom server entry
│   ├── start.ts            # TanStack Start config
│   └── styles.css          # Global Tailwind styles
├── .env.example            # Example environment variables
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config
└── vite.config.ts          # Vite/TanStack Start config
```

## Screenshots

![Ticket List Dashboard](https://via.placeholder.com/1200x800?text=Ticket+List+Dashboard)
*Ticket list with search, filter, and navigation*

![Create Ticket Form](https://via.placeholder.com/1200x800?text=Create+Ticket+Form)
*Ticket creation interface*

![Ticket Details Page](https://via.placeholder.com/1200x800?text=Ticket+Details+Page)
*Ticket details with status updates and notes*

> Note: Replace placeholder images with actual screenshots once available.

## License

This project is for assessment purposes only.

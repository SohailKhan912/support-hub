import type { TicketStatus } from "@/lib/tickets/types";
import { TICKET_STATUSES } from "@/lib/tickets/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type StatusFilterValue = TicketStatus | "All";

interface StatusFilterProps {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as StatusFilterValue)}>
      <SelectTrigger className="w-full sm:w-44" aria-label="Filter by status">
        <SelectValue placeholder="Filter status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All statuses</SelectItem>
        {TICKET_STATUSES.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

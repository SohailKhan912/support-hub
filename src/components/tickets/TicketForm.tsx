import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { NewTicketInput } from "@/lib/tickets/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TicketFormProps {
  onSubmit: (values: NewTicketInput) => Promise<void> | void;
  submitting?: boolean;
}

type Errors = Partial<Record<keyof NewTicketInput, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function TicketForm({ onSubmit, submitting }: TicketFormProps) {
  const [values, setValues] = useState<NewTicketInput>({
    customerName: "",
    customerEmail: "",
    subject: "",
    description: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  function validate(v: NewTicketInput): Errors {
    const e: Errors = {};
    if (!v.customerName.trim()) e.customerName = "Customer name is required.";
    else if (v.customerName.trim().length > 80) e.customerName = "Name must be under 80 characters.";

    if (!v.customerEmail.trim()) e.customerEmail = "Email is required.";
    else if (!emailRegex.test(v.customerEmail.trim())) e.customerEmail = "Enter a valid email address.";

    if (!v.subject.trim()) e.subject = "Subject is required.";
    else if (v.subject.trim().length < 5) e.subject = "Subject must be at least 5 characters.";

    if (!v.description.trim()) e.description = "Description is required.";
    else if (v.description.trim().length < 10) e.description = "Please add at least 10 characters.";
    return e;
  }

  function setField<K extends keyof NewTicketInput>(key: K, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = {
      customerName: values.customerName.trim(),
      customerEmail: values.customerEmail.trim(),
      subject: values.subject.trim(),
      description: values.description.trim(),
    };
    const validation = validate(v);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    await onSubmit(v);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Customer Name" error={errors.customerName} htmlFor="customerName">
          <Input
            id="customerName"
            value={values.customerName}
            onChange={(e) => setField("customerName", e.target.value)}
            placeholder="Jane Doe"
            aria-invalid={!!errors.customerName}
          />
        </Field>
        <Field label="Customer Email" error={errors.customerEmail} htmlFor="customerEmail">
          <Input
            id="customerEmail"
            type="email"
            value={values.customerEmail}
            onChange={(e) => setField("customerEmail", e.target.value)}
            placeholder="jane@example.com"
            aria-invalid={!!errors.customerEmail}
          />
        </Field>
      </div>

      <Field label="Subject" error={errors.subject} htmlFor="subject">
        <Input
          id="subject"
          value={values.subject}
          onChange={(e) => setField("subject", e.target.value)}
          placeholder="Brief summary of the issue"
          aria-invalid={!!errors.subject}
        />
      </Field>

      <Field label="Description" error={errors.description} htmlFor="description">
        <Textarea
          id="description"
          rows={6}
          value={values.description}
          onChange={(e) => setField("description", e.target.value)}
          placeholder="Describe the issue in detail..."
          aria-invalid={!!errors.description}
        />
      </Field>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Create Ticket
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className={cn("text-xs font-medium text-destructive")}>{error}</p>}
    </div>
  );
}

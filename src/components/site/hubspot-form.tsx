"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* Ported from the live site's contact/book forms: fields are collected and
 * POSTed to HubSpot's collected-forms endpoint (portal 245380752) with the
 * hubspotutk cookie when present. No form library, no server route. */

const HUBSPOT_PORTAL_ID = "245380752";
const HUBSPOT_ENDPOINT = "https://forms.hubspot.com/collected-forms/submit/v2";

declare global {
  interface Window {
    _hsq?: unknown[][];
  }
}

function hubspotCookie() {
  const c = document.cookie.split(";").map((s) => s.trim()).find((s) => s.startsWith("hubspotutk="));
  return c ? c.slice("hubspotutk=".length) : undefined;
}

export async function submitToHubspot(form: HTMLFormElement, selectorId: string) {
  const fields: { name: string; value: string }[] = [];
  form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea").forEach((el) => {
    if (el.name && el.value) fields.push({ name: el.name, value: el.value.trim() });
  });
  const payload = {
    portalId: HUBSPOT_PORTAL_ID,
    collectedFormId: window.location.href,
    formSelectorId: selectorId,
    fields,
    hutk: hubspotCookie(),
    pageUrl: window.location.href,
    pageName: document.title,
  };
  try {
    await fetch(HUBSPOT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    /* HubSpot is best-effort; the live site swallows errors the same way. */
  }
  const identify: Record<string, string> = {};
  for (const f of fields) if (["email", "firstname", "lastname", "company", "website"].includes(f.name)) identify[f.name] = f.value;
  if (identify.email) {
    const hsq = (window._hsq = window._hsq || []);
    hsq.push(["identify", identify]);
    hsq.push(["trackPageView"]);
  }
}

export const fieldClass =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-ring focus:ring-[3px] focus:ring-ring/30 aria-[invalid=true]:border-destructive";

export function Field({
  label,
  htmlFor,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required && <span className="text-muted-foreground"> *</span>}
      </label>
      {children}
    </div>
  );
}

export function Select({
  id,
  name,
  required,
  placeholder,
  options,
  defaultValue = "",
}: {
  id: string;
  name: string;
  required?: boolean;
  placeholder: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <select id={id} name={name} required={required} defaultValue={defaultValue} className={cn(fieldClass, "appearance-none")}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/* Wraps a form: validates required fields natively, submits to HubSpot,
 * swaps in a success card. */
export function HubspotForm({
  id,
  selectorId,
  submitLabel,
  success,
  children,
  className,
}: {
  id: string;
  selectorId: string;
  submitLabel: string;
  success: { title: string; body: string };
  children: React.ReactNode;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setState("sending");
    await submitToHubspot(form, selectorId);
    setState("done");
  }

  if (state === "done") {
    return (
      <div className={cn("flex flex-col items-center gap-3 py-10 text-center", className)} role="status">
        <span className="flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand">
          <Check className="size-6" strokeWidth={2.5} />
        </span>
        <p className="text-lg font-semibold tracking-tight">{success.title}</p>
        <p className="max-w-sm text-sm text-muted-foreground">{success.body}</p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={onSubmit} noValidate={false} className={cn("flex flex-col gap-4", className)}>
      {children}
      <Button type="submit" className="mt-2 rounded-lg" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}

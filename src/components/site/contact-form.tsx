"use client";

import { Field, HubspotForm, Select, fieldClass } from "./hubspot-form";
import { contact } from "@/content/company";

export function ContactForm() {
  const f = contact.form;
  return (
    <HubspotForm id="contact-form" selectorId="#contact-form" submitLabel={f.submit} success={f.success}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="ct-name" required>
          <input id="ct-name" name="firstname" type="text" placeholder="Your name" required className={fieldClass} />
        </Field>
        <Field label="Email" htmlFor="ct-email" required>
          <input id="ct-email" name="email" type="email" placeholder="you@company.com" required className={fieldClass} />
        </Field>
      </div>
      <Field label="Company / Brand" htmlFor="ct-company">
        <input id="ct-company" name="company" type="text" placeholder="Your company or brand name" className={fieldClass} />
      </Field>
      <Field label="Subject" htmlFor="ct-subject" required>
        <Select id="ct-subject" name="subject" required placeholder="Select a topic" options={f.subjects} />
      </Field>
      <Field label="Message" htmlFor="ct-message" required>
        <textarea
          id="ct-message"
          name="message"
          rows={5}
          placeholder="Tell us how we can help..."
          required
          className={fieldClass}
        />
      </Field>
    </HubspotForm>
  );
}

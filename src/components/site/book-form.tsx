"use client";

import { useState } from "react";
import { Field, HubspotForm, Select, fieldClass } from "./hubspot-form";
import { book } from "@/content/company";

/* Same fields and names as the live /book form; the "number of clients"
 * select only appears for agencies, as on the live page. */
export function BookForm() {
  const f = book.form;
  const [accountType, setAccountType] = useState("");
  return (
    <HubspotForm id="bk-form" selectorId="#bk-form" submitLabel={f.submit} success={f.success}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" htmlFor="bk-first-name" required>
          <input id="bk-first-name" name="firstname" type="text" placeholder="First name" required className={fieldClass} />
        </Field>
        <Field label="Last name" htmlFor="bk-last-name" required>
          <input id="bk-last-name" name="lastname" type="text" placeholder="Last name" required className={fieldClass} />
        </Field>
      </div>
      <Field label="Work email" htmlFor="bk-email" required>
        <input id="bk-email" name="email" type="email" placeholder="you@company.com" required className={fieldClass} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company name" htmlFor="bk-company" required>
          <input id="bk-company" name="company" type="text" placeholder="Your company name" required className={fieldClass} />
        </Field>
        <Field label="Company website" htmlFor="bk-website" required>
          <input id="bk-website" name="website" type="text" placeholder="yourcompany.com" required className={fieldClass} />
        </Field>
      </div>
      <Field label="I'm signing up as a…" htmlFor="bk-account-type" required>
        <select
          id="bk-account-type"
          name="account_type"
          required
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className={fieldClass}
        >
          <option value="" disabled>
            Select one
          </option>
          {f.accountTypes.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ecommerce platform" htmlFor="bk-platform" required>
          <Select id="bk-platform" name="platform" required placeholder="Select platform" options={f.platforms} />
        </Field>
        <Field label="Annual GMV" htmlFor="bk-gmv" required>
          <Select id="bk-gmv" name="annual_gmv" required placeholder="Select range" options={f.gmv} />
        </Field>
      </div>
      {accountType === "Agency" && (
        <Field label="Number of ecommerce clients" htmlFor="bk-num-clients" required>
          <Select id="bk-num-clients" name="num_clients" required placeholder="Select range" options={f.clients} />
        </Field>
      )}
      <Field label="Primary interest" htmlFor="bk-interest">
        <Select id="bk-interest" name="primary_interest" placeholder="Select area" options={f.interests} />
      </Field>
      <Field label="Anything else we should know?" htmlFor="bk-message">
        <textarea
          id="bk-message"
          name="message"
          rows={4}
          placeholder="Tell us about your goals or questions..."
          className={fieldClass}
        />
      </Field>
    </HubspotForm>
  );
}

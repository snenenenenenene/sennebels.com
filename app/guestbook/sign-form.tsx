"use client";

import { useActionState } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { sign, type SignState } from "./actions";
import { NAME_MAX, NOTE_MAX } from "../lib/guestbook-limits";
import { MICRO, TAP } from "../components/ui";

export function SignForm() {
  const [state, action, pending] = useActionState<SignState, FormData>(sign, {});

  if (state.ok) {
    return (
      <p className="squircle rounded-panel bg-accent-soft px-6 py-5 text-body text-moss">
        Signed. Thanks for stopping by.
      </p>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <label className="flex flex-1 flex-col gap-2">
          <span className={`text-ink-3 ${MICRO}`}>Name</span>
          <input
            name="name"
            required
            maxLength={NAME_MAX}
            autoComplete="name"
            className="squircle min-h-tap rounded-tile bg-raised px-4 text-body text-ink shadow-card outline-none ring-moss/40 placeholder:text-ink-3 focus-visible:ring-2"
            placeholder="Who dropped in"
          />
        </label>
        <label className="flex flex-[2] flex-col gap-2">
          <span className={`text-ink-3 ${MICRO}`}>Note, optional</span>
          <input
            name="note"
            maxLength={NOTE_MAX}
            className="squircle min-h-tap rounded-tile bg-raised px-4 text-body text-ink shadow-card outline-none ring-moss/40 placeholder:text-ink-3 focus-visible:ring-2"
            placeholder="Say something, or don't"
          />
        </label>
      </div>

      {/* Bait. Off-screen rather than display:none, which some bots check for. */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-px w-px"
      />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className={`inline-flex w-fit items-center gap-2.5 rounded-full bg-mark-yellow px-6 py-3 text-body font-semibold text-[#1E1515] shadow-card-hover disabled:opacity-60 ${TAP}`}
        >
          {pending ? "Signing" : "Sign the guestbook"}
          <PaperPlaneTilt size={18} weight="fill" aria-hidden />
        </button>
        {state.error && (
          <p role="alert" className="text-callout text-tone-red">
            {state.error}
          </p>
        )}
      </div>
    </form>
  );
}

"use client";

import { useActionState, useMemo, useState } from "react";
import { ArrowRight, ArrowsClockwise } from "@phosphor-icons/react";
import {
  CARD_COLORS,
  CARD_COLOR_KEYS,
  HATS,
  HAT_LABELS,
  generateName,
  type CardColor,
  type Hat,
  type Signature,
} from "../data/visitor";
import { NOTE_MAX } from "../lib/guestbook-limits";
import { VisitorCard } from "../components/visitor-card";
import { HatMark } from "../components/hat";
import { SignaturePad } from "../components/signature-pad";
import { MICRO, TAP } from "../components/ui";
import { sign, type SignState } from "../guestbook/actions";
import { DirectionalLink } from "../components/transition";

/**
 * Onboarding: you are issued a card, you decorate it, you are let in.
 *
 * The whole flow is one screen with a live preview rather than a wizard.
 * Every control changes the object in front of you, so there is nothing to
 * explain and nothing to go "next" through.
 *
 * Owed to Megan Yap's visitor gallery, which is where the idea of being
 * *issued* something instead of filling in a form came from.
 */
export function Onboarding({ nextSerial }: { nextSerial: number }) {
  const [name, setName] = useState(() => generateName());
  const [color, setColor] = useState<CardColor>("red");
  const [hat, setHat] = useState<Hat>("none");
  const [signature, setSignature] = useState<Signature>([]);
  const [note, setNote] = useState("");
  const [state, action, pending] = useActionState<SignState, FormData>(sign, {});

  const issued = useMemo(() => new Date(), []);

  if (state.ok) {
    return (
      <div className="flex flex-col items-start gap-8">
        <div className="w-full max-w-[26rem]">
          <VisitorCard
            name={name}
            color={color}
            hat={hat}
            signature={signature}
            issued={issued}
            serial={nextSerial}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-display text-title2 font-medium text-ink">You&#39;re in.</p>
          <p className="max-w-[46ch] text-body text-ink-2">
            Your card is in the gallery with everyone else&#39;s.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <DirectionalLink
            href="/"
            direction="nav-forward"
            className={`inline-flex items-center gap-2.5 rounded-full bg-mark-yellow px-6 py-3 text-body font-semibold text-[#1E1515] shadow-card-hover ${TAP}`}
          >
            Have a look round
            <ArrowRight size={18} weight="bold" aria-hidden />
          </DirectionalLink>
          <DirectionalLink
            href="/guestbook"
            direction="nav-forward"
            className="inline-flex items-center text-body text-ink-2 underline decoration-hairline decoration-2 underline-offset-4 hover:text-ink"
          >
            See the gallery
          </DirectionalLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_26rem] lg:gap-16">
      <form action={action} className="flex flex-col gap-9">
        {/* The chosen values ride along as hidden fields: the controls below
            are buttons and a canvas, and a form only submits inputs. */}
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="color" value={color} />
        <input type="hidden" name="hat" value={hat} />
        <input type="hidden" name="signature" value={signature.length ? JSON.stringify(signature) : ""} />
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-px w-px" />

        <div className="flex flex-col gap-3">
          <span className={`text-ink-3 ${MICRO}`}>Name</span>
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-title3 tracking-[0.06em] text-ink">{name}</p>
            <button
              type="button"
              onClick={() => setName(generateName())}
              className={`squircle flex min-h-tap items-center gap-2 rounded-full bg-raised px-4 text-ink-2 shadow-card hover:text-ink ${MICRO} ${TAP}`}
            >
              <ArrowsClockwise size={14} weight="bold" aria-hidden />
              Reroll
            </button>
          </div>
          <p className="max-w-[42ch] text-callout text-ink-3">
            Names are issued, not asked for. Nothing here identifies you.
          </p>
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className={`mb-1 text-ink-3 ${MICRO}`}>Colour</legend>
          <div className="flex flex-wrap gap-3">
            {CARD_COLOR_KEYS.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={color === c}
                aria-label={CARD_COLORS[c].label}
                onClick={() => setColor(c)}
                style={{ backgroundColor: CARD_COLORS[c].ground }}
                className={`size-tap rounded-full transition-transform duration-200 ${
                  color === c ? "scale-110 ring-2 ring-ink ring-offset-4 ring-offset-paper" : "hover:scale-105"
                }`}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className={`mb-1 text-ink-3 ${MICRO}`}>Hat</legend>
          <div className="flex flex-wrap gap-2.5">
            {HATS.map((h) => (
              <button
                key={h}
                type="button"
                aria-pressed={hat === h}
                onClick={() => setHat(h)}
                className={`squircle flex min-h-tap items-center gap-2 rounded-tile px-4 shadow-card transition-colors duration-200 ${MICRO} ${
                  hat === h ? "bg-ink text-paper" : "bg-raised text-ink-2 hover:text-ink"
                }`}
              >
                {h === "none" ? null : <HatMark hat={h} size={22} />}
                {HAT_LABELS[h]}
              </button>
            ))}
          </div>
        </fieldset>

        <SignaturePad value={signature} onChange={setSignature} />

        <label className="flex flex-col gap-2">
          <span className={`text-ink-3 ${MICRO}`}>A note, optional</span>
          <input
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={NOTE_MAX}
            className="squircle min-h-tap rounded-tile bg-raised px-4 text-body text-ink shadow-card outline-none ring-moss/40 placeholder:text-ink-3 focus-visible:ring-2"
            placeholder="Say something, or don't"
          />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={pending}
            className={`inline-flex items-center gap-2.5 rounded-full bg-mark-yellow px-7 py-3.5 text-body font-semibold text-[#1E1515] shadow-card-hover disabled:opacity-60 ${TAP}`}
          >
            {pending ? "Issuing" : "Enter"}
            <ArrowRight size={18} weight="bold" aria-hidden />
          </button>
          {state.error && (
            <p role="alert" className="text-callout text-tone-red">
              {state.error}
            </p>
          )}
        </div>
      </form>

      {/* The card, live, on its own for the whole scroll. */}
      <div className="lg:sticky lg:top-28">
        <VisitorCard
          name={name}
          color={color}
          hat={hat}
          signature={signature}
          issued={issued}
          serial={nextSerial}
        />
        <p className={`mt-4 text-ink-3 ${MICRO}`}>Yours, once you go in</p>
      </div>
    </div>
  );
}

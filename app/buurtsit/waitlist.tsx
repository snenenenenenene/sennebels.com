"use client";

import { useEffect, useState, type FormEvent } from "react";
import posthog from "posthog-js";
import { FORM_URL, MAILTO_FALLBACK } from "./form";

type Lang = "nl" | "en";

const I18N = {
  nl: {
    submit: "Op de wachtlijst",
    ok: "Top. Je staat erop. Geen spam.",
    privacy: "Alleen voor deze pilot. Geen spam, geen doorverkoop.",
    placeholder: "Avonden / weekend / leeftijden kids…",
    altForm: "Of via form:",
    formLabel: "Google Form",
  },
  en: {
    submit: "Join waitlist",
    ok: "You're on the list. No spam.",
    privacy: "Pilot only. No spam, no resale.",
    placeholder: "Evenings / weekend / kids ages…",
    altForm: "Or via form:",
    formLabel: "Google Form",
  },
} as const;

type Qa = { q: string; a: string };

/** Pilot facts, each one stated elsewhere on this page or in the signup form. */
const PILOT: Record<Lang, { title: string; qa: Qa[] }> = {
  nl: {
    title: "Hoe de pilot werkt",
    qa: [
      {
        q: "Voor wie is BuurtSit?",
        a: "Voor ouders die een babysit zoeken in hun eigen buurt, en voor babysitters die dichtbij willen werken. Bij het aanmelden kies je of je ouder, babysit of allebei bent.",
      },
      {
        q: "Welke districten doen mee?",
        a: "De pilot start in Ekeren en Merksem. In het formulier kun je ook Deurne, Schoten of Kapellen en Hoevenen kiezen. Woon je ergens anders, kies dan Andere.",
      },
      {
        q: "Wat doet het auto-filter?",
        a: "Je geeft aan of je zelf een auto hebt, of dat je een babysit met auto nodig hebt. Zo houdt een match rekening met vervoer.",
      },
      {
        q: "Ik ben lid van de Gezinsbond. Wat nu?",
        a: "Gebruik eerst de officiële kinderoppasdienst van de Gezinsbond: die is verzekerd en heeft een vast tarief. BuurtSit is voor de rest: vaste betaalde sits, sits met de auto, of als de lijst vol zit.",
      },
      {
        q: "Is dit een stadwijde marktplaats?",
        a: "Nee. BuurtSit werkt per district en bevat een menselijke check, in plaats van een open lijst voor heel Antwerpen.",
      },
      {
        q: "Wat gebeurt er met mijn gegevens?",
        a: "Ze worden alleen voor deze pilot gebruikt. Geen spam en geen doorverkoop.",
      },
      {
        q: "Wie zit erachter?",
        a: "BuurtSit is een project van Okapi Works in Antwerpen (Ekeren), gebouwd door Senne Bels.",
      },
    ],
  },
  en: {
    title: "How the pilot works",
    qa: [
      {
        q: "Who is BuurtSit for?",
        a: "Parents looking for a sitter in their own neighbourhood, and sitters who want to work close to home. When you sign up you choose whether you are a parent, a sitter or both.",
      },
      {
        q: "Which districts are in?",
        a: "The pilot starts in Ekeren and Merksem. The form also lists Deurne, Schoten and Kapellen / Hoevenen. Live elsewhere? Pick Other.",
      },
      {
        q: "What does the car filter do?",
        a: "You say whether you have a car, or whether you need a sitter who has one. That way a match takes transport into account.",
      },
      {
        q: "I am a Gezinsbond member. Now what?",
        a: "Use the Gezinsbond's official kinderoppasdienst first: it is insured and has a fixed rate. BuurtSit covers the rest: regular paid sits, sits that need a car, or when the usual list is full.",
      },
      {
        q: "Is this a citywide marketplace?",
        a: "No. BuurtSit works per district and includes a human check, instead of an open list for all of Antwerp.",
      },
      {
        q: "What happens to my details?",
        a: "They are used for this pilot only. No spam, no resale.",
      },
      {
        q: "Who is behind it?",
        a: "BuurtSit is a project of Okapi Works in Antwerp (Ekeren), built by Senne Bels.",
      },
    ],
  },
};

export function Waitlist() {
  const [lang, setLang] = useState<Lang>("nl");
  const [ok, setOk] = useState(false);
  const t = I18N[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "nl" ? "nl" : "en";
  }, [lang]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;
    const line = [
      new Date().toISOString(),
      data.name,
      data.email,
      data.role,
      data.district,
      data.car,
      (data.note || "").replace(/\s+/g, " ").trim(),
    ].join("\t");

    try {
      const key = "buurtsit_waitlist";
      const prev = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
      prev.push(data);
      localStorage.setItem(key, JSON.stringify(prev));
    } catch {
      /* ignore quota / private mode */
    }

    setOk(true);

    const normalizedEmail = data.email.toLowerCase().trim();
    posthog.identify(normalizedEmail);
    posthog.capture("waitlist_submit", {
      product: "buurtsit",
      role: data.role,
      district: data.district,
      car: data.car,
    });

    if (FORM_URL) {
      window.setTimeout(() => {
        window.location.href = FORM_URL;
      }, 400);
      return;
    }

    const subject = encodeURIComponent("BuurtSit waitlist");
    const body = encodeURIComponent(line);
    const mailto = `mailto:${MAILTO_FALLBACK}?subject=${subject}&body=${body}`;
    window.setTimeout(() => {
      window.location.href = mailto;
    }, 400);
  }

  return (
    <>
      <style>{`
        .bs-root {
          --bg: #f7f4ef;
          --ink: #1a1a1a;
          --muted: #5c5c5c;
          --accent: #2f5d50;
          --card: #ffffff;
          --line: #e2ddd4;
          margin: 0;
          min-height: 100vh;
          font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
          background: var(--bg);
          color: var(--ink);
          line-height: 1.45;
        }
        .bs-root * { box-sizing: border-box; }
        .bs-wrap { max-width: 640px; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; }
        .bs-badge {
          display: inline-block;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 0.75rem;
        }
        .bs-root h1 { font-size: clamp(1.6rem, 4vw, 2.1rem); margin: 0 0 0.75rem; line-height: 1.2; }
        .bs-lead { color: var(--muted); font-size: 1.05rem; margin: 0 0 1.5rem; }
        .bs-card {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }
        .bs-root label { display: block; font-size: 0.9rem; font-weight: 600; margin: 0.75rem 0 0.35rem; }
        .bs-root input, .bs-root select, .bs-root textarea {
          width: 100%;
          padding: 0.65rem 0.75rem;
          border: 1px solid var(--line);
          border-radius: 8px;
          font: inherit;
          background: #fff;
        }
        .bs-root textarea { min-height: 72px; resize: vertical; }
        .bs-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        @media (max-width: 520px) { .bs-row { grid-template-columns: 1fr; } }
        .bs-root button[type="submit"] {
          display: inline-block;
          margin-top: 1rem;
          background: var(--accent);
          color: #fff;
          border: 0;
          border-radius: 8px;
          padding: 0.75rem 1.1rem;
          font: inherit;
          font-weight: 600;
          cursor: pointer;
        }
        .bs-root button[type="submit"]:hover { filter: brightness(1.05); }
        .bs-alt { margin-top: 0.75rem; font-size: 0.9rem; color: var(--muted); }
        .bs-alt a { color: var(--accent); }
        .bs-note { font-size: 0.85rem; color: var(--muted); margin-top: 1rem; }
        .bs-lang { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; }
        .bs-lang button {
          margin: 0;
          background: transparent;
          color: var(--muted);
          border: 1px solid var(--line);
          border-radius: 8px;
          padding: 0.35rem 0.7rem;
          font: inherit;
          font-weight: 500;
          cursor: pointer;
        }
        .bs-lang button.active { background: var(--ink); color: #fff; border-color: var(--ink); }
        .bs-ok {
          display: none;
          background: #e8f3ee;
          border: 1px solid #b7d8c8;
          color: #1e4a3c;
          padding: 0.9rem 1rem;
          border-radius: 8px;
          margin-top: 1rem;
        }
        .bs-ok.show { display: block; }
        .bs-root ul.compact { margin: 0.5rem 0 0; padding-left: 1.1rem; color: var(--muted); }
        .bs-faq h2 { font-size: 1.15rem; margin: 2rem 0 0.5rem; }
        .bs-faq dt { font-weight: 600; margin-top: 1rem; }
        .bs-faq dd { margin: 0.25rem 0 0; color: var(--muted); }
        .bs-footer { margin-top: 2rem; font-size: 0.8rem; color: var(--muted); }
      `}</style>

      <div className="bs-root">
        <div className="bs-wrap">
          <div className="bs-lang" role="tablist" aria-label="Language">
            <button
              type="button"
              className={lang === "nl" ? "active" : ""}
              aria-pressed={lang === "nl"}
              onClick={() => setLang("nl")}
            >
              NL
            </button>
            <button
              type="button"
              className={lang === "en" ? "active" : ""}
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>

          {lang === "nl" ? (
            <div>
              <div className="bs-badge">Pilot · Ekeren–Merksem</div>
              <h1>Babysit in je district. Dichtbij. Met auto-filter.</h1>
              <p className="bs-lead">
                BuurtSit matcht ouders en babysitters in het noorden van Antwerpen.
                Geen stadwijde zoo. Wel district, auto als dat nodig is, en een
                menselijke check.
              </p>
              <div className="bs-card">
                <strong>Gezinsbond-lid?</strong>
                <ul className="compact">
                  <li>
                    Gebruik eerst de officiële kinderoppasdienst (verzekerd, vast
                    tarief).
                  </li>
                  <li>
                    BuurtSit is voor de rest: vaste betaalde sits, auto, of als de
                    lijst vol zit.
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div className="bs-badge">Pilot · Ekeren–Merksem</div>
              <h1>Babysitter in your district. Nearby. Car filter included.</h1>
              <p className="bs-lead">
                BuurtSit matches parents and sitters in north Antwerp. Not another
                citywide marketplace. District-scoped, car-aware, human-checked.
              </p>
              <div className="bs-card">
                <strong>Gezinsbond member?</strong>
                <ul className="compact">
                  <li>
                    Use their official kinderoppasdienst first (insured, fixed
                    rate).
                  </li>
                  <li>
                    BuurtSit covers the gap: regular paid sits, car, or when the
                    usual list is full.
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="bs-card">
            <form onSubmit={handleSubmit}>
              <div className="bs-row">
                <div>
                  <label htmlFor="bs-name">{lang === "nl" ? "Naam" : "Name"}</label>
                  <input id="bs-name" name="name" required autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="bs-email">Email</label>
                  <input
                    id="bs-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="bs-row">
                <div>
                  <label htmlFor="bs-role">{lang === "nl" ? "Ik ben" : "I am"}</label>
                  <select id="bs-role" name="role" required defaultValue="parent">
                    <option value="parent">{lang === "nl" ? "Ouder" : "Parent"}</option>
                    <option value="sitter">
                      {lang === "nl" ? "Babysit" : "Babysitter"}
                    </option>
                    <option value="both">
                      {lang === "nl" ? "Beide / andere" : "Both / other"}
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bs-district">District</label>
                  <select id="bs-district" name="district" required defaultValue="Ekeren">
                    <option>Ekeren</option>
                    <option>Merksem</option>
                    <option>Deurne</option>
                    <option>Schoten</option>
                    <option>Kapellen / Hoevenen</option>
                    <option value="other">{lang === "nl" ? "Andere" : "Other"}</option>
                  </select>
                </div>
              </div>
              <label htmlFor="bs-car">
                {lang === "nl"
                  ? "Heb je een auto? (of heb je een babysit met auto nodig?)"
                  : "Do you have a car? (or need a sitter with a car?)"}
              </label>
              <select id="bs-car" name="car" required defaultValue="yes">
                <option value="yes">{lang === "nl" ? "Ja" : "Yes"}</option>
                <option value="no">{lang === "nl" ? "Nee" : "No"}</option>
                <option value="na">{lang === "nl" ? "N.v.t." : "N/A"}</option>
              </select>
              <label htmlFor="bs-note">
                {lang === "nl" ? "Korte note (optioneel)" : "Short note (optional)"}
              </label>
              <textarea
                id="bs-note"
                name="note"
                placeholder={t.placeholder}
              />

              <button type="submit">{t.submit}</button>

              {FORM_URL ? (
                <p className="bs-alt">
                  {t.altForm}{" "}
                  <a href={FORM_URL} id="gform-link">
                    {t.formLabel}
                  </a>
                </p>
              ) : (
                <p className="bs-alt">
                  {t.altForm}{" "}
                  <span>
                    {lang === "nl"
                      ? "FORM_URL nog niet gezet — submit opent mailto."
                      : "FORM_URL not set yet — submit opens mailto."}
                  </span>
                </p>
              )}

              <p className="bs-note">{t.privacy}</p>
              <div className={`bs-ok${ok ? " show" : ""}`} role="status">
                {t.ok}
              </div>
            </form>
          </div>

          <section className="bs-faq" aria-labelledby="bs-faq-title">
            <h2 id="bs-faq-title">{PILOT[lang].title}</h2>
            <dl>
              {PILOT[lang].qa.map(({ q, a }) => (
                <div key={q}>
                  <dt>{q}</dt>
                  <dd>{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <footer className="bs-footer">
            BuurtSit · Okapi Works (Antwerp / Ekeren) ·{" "}
            <a href="https://sennebels.com" style={{ color: "inherit" }}>
              sennebels.com
            </a>
          </footer>
        </div>
      </div>
    </>
  );
}

---
name: context-journal-tater
description: The advanced form of yourself. Instead of recapping a Claude session, adversarially review it — hunt the shaky decisions, risky code, and anti-patterns in the back-and-forth, research each against real best practices, and return a tight, evidenced thesis about your own recurring failure modes. Written to yourself, to make you a better developer. Triggers on "tater this", "tater the session", "review this session", "critique this session", "/context-journal-tater", or when you want the hard version of journaling.
---

# Context Journal — tater

The advanced flavor. Where `potato` recaps a session for recall, **`tater` prosecutes
it.** It reads the whole back-and-forth as a skeptical senior reviewer, finds the
places errors crept in and the anti-patterns you keep repeating, **researches** each
against real best practices, and writes back a tight, evidenced thesis — a few key
lessons about *your own* development habits. The point isn't to remember the session;
it's to not make the same mistake next time.

Written to yourself (`audience: self`). Over time these accumulate into a searchable
corpus of your recurring failure modes — which is the whole reason `tater` integrates
with the blog web app.

This is heavier than `potato` on purpose: it does real research (docs, known
pitfalls, language/framework guidance) and it takes a stance. Expect it to use web
search and inspect the codebase.

## When to use it

The user says any of: "tater this", "tater the session", "review this session",
"critique this session", "what did I do wrong here", "/context-journal-tater" — or
wants the hard, teaching version of journaling instead of the recap.

If the session was trivial, say so and skip — there's nothing to prosecute. The bar
is different from potato's: not "is there a through-line?" but **"is there at least
one real, transferable anti-pattern worth teaching?"** If the session was clean, say
that honestly rather than manufacturing a critique.

## Procedure

1. **Read adversarially.** Go through the session as a skeptic whose job is to find
   what will bite later: shaky or under-justified decisions, risky code, anti-patterns,
   knowledge gaps, unverified claims, risks that were named and then walked past,
   corners cut under time pressure. Assume something is wrong; find it.
2. **Attribute honestly, aim the lesson at the developer.** In a Claude Code session
   much of the code is Claude's — attribute fairly, but frame every lesson as *what
   you (the developer) should catch, demand, or decide differently next time.* The
   corpus is about your habits, including the habit of what you let slide.
3. **Select few, high-signal findings.** 2–5, ranked by how much they'll cost. Prefer
   *patterns* (things you'll repeat) over one-off typos. Three sharp findings beat ten
   shallow ones. Cut anything you can't make a real case for.
4. **Research each finding.** Ground it in something real — official docs, a
   documented pitfall, an established principle (contract testing, Postel's law, the
   rule of three, independence of verification, etc.), or concrete reasoning about the
   specific language/framework (Flutter, Swift, Java, JS/TS, Python…). Use web search /
   fetch and inspect the codebase. **No vibes-based "best practice."** If you can't
   ground it, either drop it or explicitly mark it a hypothesis.
5. **Write the thesis.** For each finding: the pattern (named), the evidence from the
   session, why it's a problem (with the researched backing + citation), the concrete
   fix, and the transferable lesson so it generalizes beyond this session.
6. **Emit a contract-valid entry.** Per `../CONTRACT.md`. `flavor: tater`,
   `audience: self`. `through_line` = the single biggest pattern. `diamonds` = the
   transferable **lessons** (not a recap — one crisp line each). Body = the researched
   thesis with a **Findings** section and inline citations. Filename
   `YYYY-MM-DD-<slug>.md`.
7. **Write to the output directory** (default `context-journal/out/`, honor
   `--output`), then **confirm** with the path and the through-line.

## The output contract

Conforms to `../CONTRACT.md` — same schema as every flavor, no changes. `tater` fills
it differently: `diamonds` carry transferable lessons rather than recall notes, and
the body is a researched critique (a **Findings** section, each finding with evidence
→ research + citation → fix → lesson). `flavor: tater` is the signal the web app uses
to render it as a review. Keep findings in the body; do not invent new frontmatter.

## Hard rules

- **Prosecute, don't celebrate.** Hunt for what's wrong. No "great work" padding, no
  recap of wins. If it reads like a changelog, it failed.
- **Research or drop it.** Every finding cites a real source or a named, established
  principle — or it's explicitly flagged as a hypothesis. No asserted "best practices."
- **Patterns over one-offs.** Teach transferable habits, not typos. The value is the
  lesson that generalizes.
- **Few and ranked.** 2–5 findings, ordered by cost. Depth over breadth.
- **Honest attribution, developer-aimed lesson.** Say who erred (Claude's code counts),
  but every lesson is about what *you* do next time.
- **No fabrication.** Every finding traces to something that actually happened in the
  session. The critique is real; the framing is the craft.
- **Say when it's clean.** If there's no real anti-pattern, report that plainly rather
  than inventing one. A false critique is worse than none.
- **diamonds = lessons.** Transferable, one line each — not a summary of events.
- **To yourself.** `audience: self`; the voice is a senior reviewer who wants you to
  get better, not an audience-facing post (that's `pierogi`/`fry`).
- **Potato is naming, not theme.** The entry is a clean, professional review. No puns.

---
name: context-journal-potato
description: Instead of clearing a Claude session, journal it. Reads the current session's context and writes one beautiful, structured blog entry for your future self — a recall hook so you can pick the thread back up later. Out-of-the-box, zero setup, writes a Markdown file you own. Triggers on "journal this", "context journal", "journal the session", "/context-journal", or when a working session is wrapping up.
---

# Context Journal — potato

The plain, out-of-the-box flavor. Closing a session throws away the thinking;
**journaling it keeps the diamond.** This skill reads the session you're in and
writes a single structured blog entry — for *you*, later — so that scanning your
own history gets you back up to speed fast. No backend, no setup: it drops a
Markdown file into a folder you control.

`potato` is the kernel of the context-journal family. It produces a contract-valid
entry and stops there. (Other flavors extend it: `tater` integrates with a blog
web app, `pierogi` writes for a brand audience, `fry` writes flashy/shareable.)

## When to use it

The user says any of: "journal this", "journal the session", "context journal",
"journal it instead of clearing", "/context-journal" — or a substantive working
session is wrapping up and there's a through-line worth keeping.

If the session was trivial (one quick lookup, no arc), say so and skip. The bar:
**is there a through-line — one sentence the whole session reduces to?** If not,
there's nothing to journal yet.

## Procedure

1. **Find the through-line.** One sentence the session reduces to — ideally a
   tension or a resolution (a thing that was unclear and got clearer, a decision
   that got made, a bug that got understood). Everything keys off this.
2. **Mine the diamonds.** Pull the handful of things future-you will actually want:
   key decisions and *why*, gotchas and dead-ends, the shape of the solution, open
   threads. These become the `diamonds` array and the spine of the body. Be
   honest — what was non-obvious, not what's in the code already.
3. **Write the entry for future-self.** Audience defaults to `self`. Voice: clear,
   plain, warm, first-person-to-future-self. Not marketing, not a changelog — the
   note you wish you'd left yourself. Recommended body spine: the hook → what we
   were doing → the diamonds → where it landed / open threads.
4. **Emit a contract-valid file.** Frontmatter + body per the entry contract
   (see `../CONTRACT.md`). Filename `YYYY-MM-DD-<slug>.md`. Set `flavor: potato`,
   `audience: self`, fill `through_line` and `diamonds` (≥1).
5. **Write it to the output directory.** Default: the family's `out/` directory
   (`context-journal/out/`). Honor an explicit override if the user gives one
   (`--output <dir>`, "write it to ~/notes", etc.) — this is the one knob a user
   reaches for most.
6. **Confirm.** Print the file path and a one-line summary (the title +
   through-line). Done.

## The output contract

Every entry conforms to `../CONTRACT.md` — the schema shared with the web app and
every other flavor. potato sets `flavor: potato`, `audience: self`, and a plain
body register; the schema is otherwise identical across flavors. Always read the
contract before writing so the file validates.

## Hard rules

- **One through-line per entry.** If you can't name it in a sentence, don't journal —
  say why and stop.
- **Harvest, don't fabricate.** Everything in the entry comes from what actually
  happened in the session. The story is real; the framing is the craft.
- **For future-self by default.** `audience: self`, plain warm voice. Don't write
  for an audience the user didn't ask for — that's `pierogi`/`fry`.
- **Diamonds are mandatory.** ≥1, and they must be genuinely useful recall hooks,
  not filler. An entry with no diamonds isn't worth writing.
- **Contract-valid or it didn't happen.** The file must satisfy `../CONTRACT.md`
  so the web app and other tools can read it.
- **The user owns the output.** Plain Markdown, in their directory, no lock-in.
  Default to `out/`; always honor an override.
- **Potato is naming, not theme.** The brand lives in the family's names; the entry
  itself is a clean, professional post. No potato puns shoehorned into content.

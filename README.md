# AI Mock Interview

Next.js app that generates interview questions with Gemini, records spoken answers, and rates each one.

**Stack:** Next.js 15 (App Router), Clerk (auth), Neon Postgres + Drizzle, Google Gemini.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run db:push              # create tables in Neon
npm run dev
```

Speech-to-text uses the browser Web Speech API, so use Chrome.

## Structure

- `app/actions/interview.js` – server actions (all DB and Gemini access, scoped to the signed-in user)
- `app/dashboard` – interview list, setup, recording session and feedback pages
- `utils/` – DB client, schema and Gemini helper (server only)

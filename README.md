# Med Flow System — Website

Full-stack Next.js 14 website for **Med Flow System**, a medical billing and
revenue cycle management company serving US healthcare providers.

Stack: Next.js 14 (App Router, TypeScript strict), Tailwind CSS, Prisma
(PostgreSQL), iron-session admin auth, Resend/SMTP email, zod validation.

## Local setup

1. **Install dependencies** (npm only):

   ```bash
   npm install
   ```

2. **Configure environment**: copy `.env.example` to `.env.local` and fill in
   every value (see the [Environment variables](#environment-variables) table).

3. **Set up the database**:

   ```bash
   # Quick sync of the schema to a fresh database:
   npx prisma db push
   # …or apply migrations:
   npx prisma migrate dev

   # Seed default FAQs and draft blog posts:
   npx prisma db seed
   ```

4. **Run the dev server**:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000. Admin dashboard: http://localhost:3000/admin/login.

## Environment variables

| Variable             | Required | Purpose                                                        |
| -------------------- | -------- | -------------------------------------------------------------- |
| `DATABASE_URL`       | Yes      | PostgreSQL connection string (Prisma).                         |
| `RESEND_API_KEY`     | No*      | Resend API key for transactional email.                        |
| `SMTP_HOST`          | No*      | SMTP host (fallback when `RESEND_API_KEY` is not set).          |
| `SMTP_PORT`          | No*      | SMTP port (default 587; 465 enables implicit TLS).             |
| `SMTP_USER`          | No*      | SMTP username.                                                 |
| `SMTP_PASS`          | No*      | SMTP password.                                                 |
| `SMTP_FROM`          | No       | From address, e.g. `Med Flow System <noreply@medflowsystem.co>`.|
| `NOTIFY_EMAIL`       | Yes      | Owner inbox for new lead notifications.                        |
| `ADMIN_EMAIL`        | Yes      | Admin dashboard login email.                                   |
| `ADMIN_PASSWORD_HASH`| Yes      | bcrypt hash of the admin password (see below).                 |
| `SESSION_SECRET`     | Yes      | ≥32-char random secret for the admin session cookie.           |
| `NEXT_PUBLIC_SITE_URL` | No     | Public site URL (absolute links in emails/sitemap).            |

\* Set `RESEND_API_KEY` **or** the `SMTP_*` settings so the contact/quote forms
can send mail.

### Change the admin password

```bash
npm run hash-password -- "your-new-secure-password"
```

Put the printed hash into `ADMIN_PASSWORD_HASH` (and in production, update the
env var wherever the site is deployed, then redeploy).

### Change NOTIFY_EMAIL

Set `NOTIFY_EMAIL` to the mailbox that should receive quote/contact form
notifications. In production, update it in the hosting provider's env settings
and redeploy.

## Deploying

### Vercel (recommended)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel. Framework preset: **Next.js**. Build command:
   `prisma generate && next build` (already set in `package.json`).
3. Add a Postgres database — options:
   - **Neon** (neon.tech) or **Supabase**: create a free Postgres project and
     paste its connection string into Vercel's `DATABASE_URL`.
   - **Vercel Postgres**: add it from the Vercel dashboard's Storage tab.
4. Add all environment variables from the table above in
   **Project → Settings → Environment Variables**.
5. Apply migrations against the production database (run once, then after each
   schema change). Options:
   - From your machine with `DATABASE_URL` pointed at production:
     ```bash
     npx prisma migrate deploy
     npx prisma db seed   # optional, for FAQs/draft posts
     ```
   - Or add a one-off build step. (`migrate deploy` in the build command is
     discouraged — deploys should be idempotent, but parallel builds can race.)
6. Deploy. Every push to the main branch redeploys automatically.

### Netlify

1. Push the repo and create a new site from Git in Netlify.
2. Build command: `prisma generate && next build`; publish directory: `.next`.
   Install the **Next.js Runtime** (Essential Next.js) plugin so SSR/API routes
   work — Netlify prompts for it automatically on import.
3. Add the environment variables in **Site settings → Environment variables**.
4. Run `npx prisma migrate deploy` against your production database once
   (with `DATABASE_URL` pointed at it), then deploy.

### Connect a custom domain

**Vercel**: Project → **Settings → Domains** → add your domain
(e.g. `medflowsystem.co`). Vercel gives you DNS records to add at your
registrar (A record or CNAME). HTTPS is provisioned automatically. Set
`www` → apex redirect as desired.

**Netlify**: **Site settings → Domain management → Add custom domain**, then
add the DNS records Netlify shows at your registrar. HTTPS via Let's Encrypt
is automatic.

After the domain is live, update `NEXT_PUBLIC_SITE_URL` to the real domain and
redeploy.

## Editing content

- **Placeholder stats** (homepage numbers): edit `placeholderStats` in
  `config/site.ts`. They are marked `EDITABLE PLACEHOLDER` — replace the sample
  numbers with real figures before publishing.
- **Testimonials placeholder**: wire testimonials into `config/site.ts` the
  same way (a `testimonials` array), or ask for a dedicated testimonials
  section to be added.
- **Blog posts**: manage in the admin dashboard (`/admin`) — create, edit,
  publish/unpublish, delete. Draft placeholder posts from the seed are marked
  `[DRAFT PLACEHOLDER]`; replace or delete them before launch.
- **FAQ**: the public FAQ page reads from the `Faq` table (seeded with the
  defaults in `prisma/seed.mjs`, also mirrored in `config/site.ts`
  `defaultFaqs`); edit/add/remove entries in the admin dashboard.
- **Site-wide details** (phone, email, address, tagline, nav, services,
  specialties, software list): all live in `config/site.ts`, the single source
  of truth.

## Security notes

- **No PHI collection**: the public forms (contact/quote) do not ask for
  patient health information. Never add fields that collect PHI without a
  proper HIPAA risk review and a signed BAA with every vendor touching the data.
- **Honeypot + rate limiting**: public forms include a hidden honeypot field
  and are rate-limited per IP (`lib/rate-limit.ts`) to deter spam.
- **Admin area**: `/admin` and `/api/admin/*` are protected by `middleware.ts`
  and iron-session sealed cookies. Keep `SESSION_SECRET` long and random, and
  never commit `.env*` files (they're in `.gitignore`).
- **Email**: use Resend or your own SMTP credentials; never hardcode secrets
  in source.

## Scripts

| Script                | Command                          | Purpose                          |
| --------------------- | -------------------------------- | -------------------------------- |
| `npm run dev`         | `next dev`                       | Local development server         |
| `npm run build`       | `prisma generate && next build`  | Production build                 |
| `npm start`           | `next start`                     | Serve a production build         |
| `npm run db:push`     | `prisma db push`                 | Sync schema to dev DB (no migration file) |
| `npm run db:migrate`  | `prisma migrate dev`             | Create + apply a migration       |
| `npm run db:seed`     | `prisma db seed`                 | Seed FAQs + draft posts          |
| `npm run hash-password` | `node scripts/hash-password.mjs` | Generate bcrypt admin password hash |

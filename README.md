# Kishor Kumar Mahato — Portfolio

Personal portfolio site built with Vite + React + TypeScript + Tailwind CSS. Includes a password-protected admin panel for managing blog posts, projects, and portfolio data — all changes auto-commit to GitHub and trigger a Vercel deployment.

---

## Tech Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **Markdown**: react-markdown + remark-gfm
- **Toasts**: sonner
- **Icons**: lucide-react
- **Hosting**: Vercel
- **Content storage**: GitHub (direct API commits)

---

## Local Development

```bash
npm install
npm run dev       # http://localhost:8080
npm run build
npm run preview
```

---

## Environment Variables

### How it works

| File | Committed? | Purpose |
|------|-----------|---------|
| `.env` | Yes | Template with placeholders — safe to commit, no real secrets |
| `.env.local` | No (`*.local` is gitignored) | Your actual secrets — never committed |

Copy `.env` to `.env.local` and fill in the real values. Vite automatically merges both files, with `.env.local` taking priority.

> After editing `.env.local`, restart the dev server (`Ctrl+C` then `npm run dev`) for changes to take effect.

### All variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_ADMIN_PASSWORD` | Yes | Password for `/admin/login` |
| `VITE_GITHUB_TOKEN` | Yes | GitHub personal access token (classic, `repo` scope) |
| `VITE_GITHUB_OWNER` | Yes | GitHub username — `cyberkishor` |
| `VITE_GITHUB_REPO` | Yes | Repo name — `kishor-s-digital-presence` |
| `VITE_GITHUB_BRANCH` | Yes | Branch to commit to — `main` |
| `VITE_DEPLOY_HOOK_URL` | Optional | Vercel deploy hook URL for the Deploy button |
| `VITE_USE_LOCAL_FILES` | Optional | `true` = save to local disk, `false` = commit to GitHub |

### Vercel dashboard

The same variables must also be added to **Vercel project → Settings → Environment Variables** so production builds can commit to GitHub. `.env.local` is never deployed.

---

## GitHub Token Setup

The admin panel writes directly to GitHub via the API to save blog posts, projects, and portfolio data.

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Name it something like `kishor-digital-presence-admin`
4. Select scope: `repo` (full repo access)
5. Click **Generate token** and copy it (starts with `ghp_`)
6. Paste it as `VITE_GITHUB_TOKEN` in `.env.local`

> Tokens expire — if saves start failing with "Bad credentials", generate a new token and update it in **both** `.env.local` and the Vercel dashboard.

---

## Vercel Deploy Hook Setup

The **Deploy** button in the admin sidebar triggers a Vercel build manually, so you can edit multiple posts before deploying once.

1. Open your Vercel project dashboard
2. Go to **Settings** → **Git** → scroll to **Deploy Hooks**
3. Click **Create Hook**
   - Name: `Admin Panel`
   - Branch: `main`
4. Copy the generated URL
5. Paste it as `VITE_DEPLOY_HOOK_URL` in `.env.local`

When you click Deploy in the sidebar, it POSTs to this URL and Vercel starts a new build. Only one deployment per click — no more auto-deploy on every save.

### Disable Auto-Deploy on Git Push

If your Vercel plan has it: **Settings → General → Ignored Build Step** → enter `exit 1`.

`exit 1` skips git-triggered builds. Deploy hooks (the Deploy button) bypass this check and still work.

> Do NOT add `"github": { "enabled": false }` to `vercel.json` — it also cancels deploy hook builds.

---

## Admin Panel

Visit `/admin` — it redirects to `/admin/login` if not authenticated.

### Login
- Password is set via `VITE_ADMIN_PASSWORD` in `.env.local`
- Auth state is stored in `sessionStorage` (clears when the tab is closed)

### Sections

| Route | Description |
|-------|-------------|
| `/admin/dashboard` | Overview stats, recent posts/projects, quick actions |
| `/admin/blog` | List all blog posts with search, filter, pagination |
| `/admin/blog/new` | Create a new blog post |
| `/admin/blog/:slug` | Edit an existing blog post |
| `/admin/projects` | List all projects with search, filter, pagination |
| `/admin/projects/new` | Create a new project |
| `/admin/projects/:slug` | Edit an existing project |
| `/admin/portfolio/personal` | Edit name, title, location, email, social links |
| `/admin/portfolio/hero` | Edit hero headline and description |
| `/admin/portfolio/about` | Edit bio and stats |
| `/admin/portfolio/services` | Edit services list |
| `/admin/portfolio/testimonials` | Edit testimonials |
| `/admin/portfolio/contact` | Edit contact CTA |

### Blog Post Fields
- **Title** — auto-generates slug on new posts
- **Date** — ISO date (YYYY-MM-DD)
- **Category** — e.g. Engineering, Shopify
- **Read Time** — e.g. "5 min read"
- **Cover Image** — path relative to `/blog/images/`
- **Excerpt** — short description shown in cards
- **Status** — Published or Draft (drafts are hidden on the public blog)
- **Featured** — show on home page (star icon)
- **Content** — full Markdown with live preview

### Project Fields
- **Title**, **Slug**, **Year**, **Category**
- **Metrics** — e.g. "1,000+ users"
- **Live URL** — optional external link
- **Description** — short text shown in cards
- **Tags** — comma-separated, shown as chips
- **Status** — Published or Draft
- **Featured** — show on home page (star icon)
- **Content** — full Markdown case study with live preview

---

## Content Storage

### Blog posts
- Markdown file: `public/blog/{slug}.md` (frontmatter + content)
- Metadata: `src/data/portfolio.json` → `blog.posts[]`

### Projects
- Markdown file: `public/projects/{slug}.md` (frontmatter + content)
- Metadata: `src/data/portfolio.json` → `projects.items[]`

### Portfolio data
- All other sections (personal, hero, about, services, testimonials, contact): `src/data/portfolio.json`

Every save from the admin panel commits directly to the GitHub repo via the API. The Vercel deploy is triggered manually via the Deploy button in the admin sidebar.

---

## Home Page Content

The home page blog and projects sections show only **featured** items (starred in the admin):

- Blog section → posts where `featured: true`
- Projects section → projects where `featured: true`

To feature an item, click the star icon in the admin list, or toggle "Featured" inside the editor.

---

## Recommended Deployment Workflow

1. Log in to admin at `/admin`
2. Make all your edits (posts, projects, portfolio data)
3. When done, click **Deploy** in the sidebar
4. Vercel builds once with all your changes

---

## License

All rights reserved.

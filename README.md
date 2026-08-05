# The Bloxline

The Bloxline is **The Adult’s Guide to Roblox**: an independent publication explaining the games, businesses, studios, education, safety and culture shaping Roblox.

## Technology

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS 4, with a publication specific CSS system
- Sanity Studio for adding and editing articles
- Local MDX articles as a safe fallback and migration archive
- Static generation for articles and editorial pages
- Vercel ready metadata, sitemap, robots and RSS

Sanity is the content editor. Payments and tracking are not included. The public website reads published articles from Sanity and falls back to the local MDX files if Sanity cannot be reached.

## Run locally

1. Install Node.js 20.9 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Run `npm run dev` and open `http://localhost:3000`.

Use `npm run lint`, `npm run typecheck` and `npm run build` before publishing.

## Edit or publish an article with Sanity

The online editor is [the-bloxline.sanity.studio](https://the-bloxline.sanity.studio). Sign in with the GitHub account that has access to the Sanity project.

1. Open **Article** and choose an existing article, or choose **Create** to add one.
2. Complete the headline, article address, summary, body, author, date and desk.
3. Upload a cover image that The Bloxline has permission to use and add useful alternative text.
4. Keep **Keep off the public website** switched on while the article is being prepared.
5. Complete the search title and search description.
6. Publish the document in Sanity.
7. When it is ready for readers, switch **Keep off the public website** off and publish once more.

The website checks Sanity for updates every minute. New published articles keep the route `/articles/article-address`, so changing the domain does not change article links.

## Run Sanity Studio locally

1. Open the `studio` folder.
2. Run `npm install`.
3. Copy `studio/.env.example` to `studio/.env`.
4. Run `npm run dev` and open `http://localhost:3333`.

Run `npm run build` inside `studio` before deploying editor changes. Run `npm run deploy` to update the hosted editor after changing its fields or layout.

## Local MDX fallback

1. Copy `content/articles/_template.mdx` to `content/articles/your-slug.mdx`.
2. Make the `slug` exactly match the filename.
3. Write the article in MDX and use the provided callouts where helpful.
4. Add a licensed cover image to `public/covers`, then update `coverImage` and `coverAlt`.
5. Keep `draft: true` while editing. Drafts stay off the production website.
6. Run `npm run build`. Invalid or incomplete frontmatter stops the build with the affected filename.
7. Preview locally, change to `draft: false`, commit and deploy.

Set `featured: true` to place a published article in the homepage lead slot. Keep only one current featured story. Articles sort by `publishedAt`.

Supported frontmatter includes title, slug, subtitle, excerpt, dates, author, desk, topics, cover information, featured and draft states, SEO fields, canonical URL, source links, disclosure and audience relevance notes. Reading time is generated when it is omitted.

Available MDX callouts: `WhatAdultsNeedToKnow`, `WhyItMatters`, `ForParents`, `ForTeachers`, `BusinessAngle`, `InPlainEnglish`, `KeyTakeaways`, `BloxlineView` and `EditorNote`. Sanity offers the same callout choices in its article editor.

## Editorial checklist

- Headline is clear and useful to an adult reader
- Adult relevance and affected groups are explicit
- Current claims and figures have been checked
- Primary sources are linked where appropriate
- Image rights and alt text are confirmed
- Commercial relationships are disclosed
- SEO description is unique and accurate
- Relevant internal links are included
- Desk and topics are correct
- British English, spelling and punctuation are proofread
- No em dashes, invented statistics or unverified current claims remain

## Images and brand assets

Add article images under `public/covers`. Use root relative paths such as `/covers/example.jpg`. Do not add Roblox screenshots, avatars or game artwork without permission.

Official supplied assets live in `public/brand`:

- `bloxline-banner.jpg`: horizontal banner with tagline
- `bloxline-logo.jpg`: compact square wordmark
- `bloxline-favicon.jpg`: geometric B favicon

Replace a file in place only with an approved updated asset. Keep the filename to avoid code changes.

## Site settings and URLs

Edit `src/lib/site.ts` for publication wide settings. Change the contact email with `NEXT_PUBLIC_CONTACT_EMAIL` or its central fallback.

Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin, without a trailing path. On Vercel previews the site safely falls back to `VERCEL_PROJECT_PRODUCTION_URL` or `VERCEL_URL`. Article files contain paths, not temporary hostnames, so moving to a custom domain does not change article URLs.

## Add a desk

1. Add the desk to the `desks` tuple in `src/lib/articles.ts`.
2. Add its description to `src/components/DeskPage.tsx`.
3. Create a small route that renders `DeskPage`.
4. Add the link to the header, footer and homepage desk list.
5. Add the route to `src/app/sitemap.ts`.

## Newsletter

Without `NEWSLETTER_WEBHOOK_URL`, the form validates the address and clearly says nothing was stored. To integrate Resend, MailerLite, Beehiiv or another provider, create a secure server endpoint or automation webhook, set that URL as a Vercel secret and adapt `src/app/api/newsletter/route.ts` to the provider’s documented payload. Never use a secret key in a `NEXT_PUBLIC_` variable.

## Analytics

No analytics run by default. Vercel Analytics can later be added with its official package and a component in the root layout. Plausible can be added with its privacy focused script after updating the privacy notice. Record the decision and avoid collecting data that is not needed.

## Deploy to Vercel

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Accept the detected Next.js settings.
4. Set `NEXT_PUBLIC_SITE_URL` to `https://www.thebloxline.com`.
5. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` to `ce0b69vh` and `NEXT_PUBLIC_SANITY_DATASET` to `production`. The project ID also has a code fallback, but setting it in Vercel keeps the connection explicit.
6. Optionally add `NEXT_PUBLIC_CONTACT_EMAIL` and `NEWSLETTER_WEBHOOK_URL`.
7. Deploy, then check `/robots.txt`, `/sitemap.xml`, `/rss.xml`, a published article and a search query.

## Connect thebloxline.com later

1. Purchase `thebloxline.com` from the registrar of your choice.
2. Open the Vercel project, select **Settings → Domains**, and add `thebloxline.com` and `www.thebloxline.com`.
3. Add the DNS records shown by Vercel at the registrar. DNS values can change, so use the values Vercel shows at that time.
4. Choose `thebloxline.com` as primary and configure `www` to redirect to it.
5. Set the Production environment value of `NEXT_PUBLIC_SITE_URL` to `https://thebloxline.com` and redeploy.
6. Confirm article canonical tags use the new domain. Article paths remain `/articles/[slug]`.
7. Open `/sitemap.xml` and confirm URLs use the new domain, then submit it to relevant webmaster tools.
8. Test the homepage and article Open Graph previews using current social preview tools.

## How the content connection works

The Sanity schemas live in `studio/schemaTypes`. Website queries live in `src/sanity`, and the shared article adapter lives in `src/lib/articles.ts`. The six starter articles were imported into the `production` dataset. Three current editorial drafts remain hidden from readers.

Future jobs, memberships, reports, advertising, directories and more authors can be added as separate content types when their workflows are defined.

# Big Bowl Hot Pot Website

Next.js website for Big Bowl Hot Pot, ready to deploy on Vercel.

## Local Development

```bash
npm install
npm run dev
```

The local site runs on `http://localhost:3001`.

## Vercel Environment Variables

Set these in Vercel under Project Settings > Environment Variables:

```bash
NEXT_PUBLIC_SITE_URL=https://bigbowlhotpot.com
RESEND_API_KEY=your-resend-api-key
RESERVATION_FROM_EMAIL=Big Bowl Hot Pot <reservations@bigbowlhotpot.com>
RESERVATION_NOTIFICATION_EMAILS=bigbowlhotpot@gmail.com
```

The reservation form sends email notifications through Resend. It does not store reservations in Vercel's filesystem.

## Deploy

The recommended flow is GitHub plus Vercel:

1. Create a GitHub repository and push this project.
2. Import the repository in Vercel.
3. Add the environment variables above.
4. Add `bigbowlhotpot.com` and `www.bigbowlhotpot.com` in Vercel Domains.
5. Update Hostinger DNS to point the domain to Vercel.

## SEO

The site includes metadata, canonical URLs, Open Graph tags, `robots.txt`, and `sitemap.xml`.

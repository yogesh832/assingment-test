# DataOnDeck

A Next.js platform for data management, metrics tracking, and company governance.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Inline CSS with IBM Plex Sans
- **Icons:** Lucide React
- **Deployment:** Vercel

## Routes

| Route                        | Page         | Description                                 |
| ---------------------------- | ------------ | ------------------------------------------- |
| `/`                          | Sign In      | Login page with email/password              |
| `/signup`                    | Sign Up      | 4-step registration flow                    |
| `/dashboard/company-details` | Company Data | Board members table, modal form, pagination |
| `/dashboard/metrics-hub`     | Metrics Hub  | Company Metrics & Metrics Dictionary tabs   |

## Route Config

All frontend routes are defined in `app/routes.ts`:

```ts
export const ROUTES = {
  SIGN_IN: "/",
  SIGN_UP: "/signup",
  DASHBOARD: {
    COMPANY_DETAILS: "/dashboard/company-details",
    METRICS_HUB: "/dashboard/metrics-hub",
  },
};
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Set **Root Directory** to `test` (if project is inside a subfolder)
4. Deploy — Vercel auto-detects Next.js

## Project Structure

```
app/
├── routes.ts                          # Centralized route definitions
├── globals.css                        # Global styles
├── layout.tsx                         # Root layout (IBM Plex Sans font)
├── page.tsx                           # Sign-in page
├── signup/
│   └── page.tsx                       # 4-step signup flow
└── dashboard/
    ├── company-details/
    │   ├── layout.tsx                 # Force-dynamic (Vercel compat)
    │   └── page.tsx                   # Company data page
    └── metrics-hub/
        ├── layout.tsx                 # Force-dynamic (Vercel compat)
        └── page.tsx                   # Metrics hub page

public/
├── auth/
│   └── wave.jpg                       # Auth background image
└── dasboard/
    ├── fi_6102666.png                 # Logo
    ├── 95bca3ecaf6d28d115834f85b6163b6e58e91c7c.png  # Avatar
    ├── Sidebar Toggle.png             # Sidebar toggle icon
    ├── 55024599_9264882 1.png         # Empty state illustration
    ├── FileImport.png                 # File import icon
    ├── dashboard.png                  # Menu icons
    ├── upload.png
    ├── mattrix.png
    ├── company.png
    ├── request.png
    ├── file-export-alt.png
    ├── audit.png
    ├── billing.png
    ├── stakeholder.png
    └── schedular.png
```

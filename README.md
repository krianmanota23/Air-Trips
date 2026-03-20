# ✈️ Air Trips Travel & Tours

A full-stack travel agency web platform built for Air Trips Travel & Tours — 
a boutique travel agency offering domestic & international ticketing, 
tour packages, visa processing, PSA documents, and travel insurance.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui (Radix + Nova preset) |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **Real-time Chat** | Supabase Realtime (WebSockets) |
| **File Storage** | Supabase Storage |
| **Icons** | Lucide React |
| **Fonts** | Google Fonts — Playfair Display + Lato |
| **Deployment** | Vercel (recommended) |

---

## 📁 Project Structure
```
air-trips/
├── src/
│   ├── app/
│   │   ├── page.tsx              ← Public landing page
│   │   ├── agency/access/        ← Hidden admin login
│   │   ├── agency/dashboard/     ← Admin dashboard
│   │   ├── client/dashboard/     ← Customer chat page
│   │   ├── register/             ← Customer registration
│   │   └── api/                  ← API routes
│   ├── components/
│   │   ├── landing/              ← Landing page sections
│   │   ├── chat/                 ← Chat components
│   │   ├── admin/                ← Admin dashboard components
│   │   └── ui/                   ← shadcn/ui base components
│   └── lib/
│       ├── supabase/             ← Supabase client + server
│       ├── hooks/                ← Custom React hooks
│       ├── types.ts              ← TypeScript interfaces
│       └── utils.ts              ← Utility functions
├── supabase/
│   └── schema.sql                ← Full database schema
└── middleware.ts                 ← Route protection
```

---

## 🗄️ Database Tables

- `profiles` — Customer information
- `admins` — 3 agent accounts
- `messages` — Real-time chat messages
- `agent_assignments` — Agent pinning system
- `posts` — Announcements & news
- `promos` — Promo deals & tour packages
- `gallery_photos` — Photo gallery

---

## 🚀 Getting Started

1. Clone the repo
2. Run `npm install`
3. Copy `.env.local.example` to `.env.local` and fill in your Supabase keys
4. Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor
5. Run `npm run dev`
6. Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Admin Access

Admin portal is at `/agency/access` — not linked anywhere publicly.

# Prakriti Foods — Next.js 15 Website

A production-ready, premium FMCG website built with Next.js 15, TypeScript, Tailwind CSS, Supabase, and Framer Motion.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy the example file and fill in your values:
```bash
cp .env.local.example .env.local
```

Required variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=https://prakritifoods.in
```

### 3. Set Up Supabase Database
1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor**
3. Paste and run the entire contents of `supabase/schema.sql`
4. This creates all tables, indexes, RLS policies, and sample seed data

### 4. Create Admin User
In your Supabase dashboard:
1. Go to **Authentication → Users**
2. Click **Invite User** or **Add User**
3. Enter your admin email and password
4. This user can then log in at `/admin/login`

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Homepage
│   ├── about/                  # About Us
│   ├── products/               # Products listing + [slug] detail
│   ├── premium-range/          # Premium collection
│   ├── blog/                   # Blog listing + [slug] post
│   ├── become-a-distributor/   # Distributor application
│   ├── contact-us/             # Contact page
│   ├── admin/                  # Protected admin dashboard
│   │   ├── login/              # Admin login
│   │   ├── products/           # CRUD products
│   │   ├── blogs/              # CRUD blog posts
│   │   ├── leads/              # View distributor leads
│   │   └── messages/           # View contact messages
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # Robots.txt
├── components/
│   ├── layout/                 # Navbar, Footer, Analytics
│   ├── sections/               # Page sections (Hero, Forms, etc.)
│   ├── ui/                     # Reusable UI (Motion, PageHero, etc.)
│   └── admin/                  # Admin-specific components
├── lib/
│   ├── supabase/               # Client + Server Supabase utilities
│   ├── utils.ts                # Helper functions
│   └── validations.ts          # Zod schemas
├── actions/                    # Next.js Server Actions
└── types/
    └── database.ts             # TypeScript Supabase types
```

---

## 🎨 Brand Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Forest Green | `#1B4332` | Primary brand colour, headings |
| Sage Green | `#95D5B2` | Accents, badges on dark bg |
| Cream | `#FAF7F2` | Page backgrounds |
| Gold | `#D4A373` | CTA buttons, highlights |
| Charcoal | `#2B2D42` | Body text |

**Fonts:** Playfair Display (headings) · Inter (body)

---

## 🗄️ Database Tables

| Table | Purpose |
|-------|---------|
| `products` | Product catalogue with category, pricing, images |
| `blog_posts` | Articles with slug routing, publish toggle |
| `distributor_leads` | Distributor application form submissions |
| `contact_messages` | Contact form submissions |

---

## 🔐 Admin Access

- URL: `/admin/login`
- Authenticated via Supabase Auth
- Protected by middleware (unauthenticated users → redirect to login)
- Admin can: Add/Edit/Delete products, Manage blogs, View leads & messages

---

## 📊 Analytics

Set these in `.env.local` to activate:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics 4
- `NEXT_PUBLIC_META_PIXEL_ID` — Meta (Facebook) Pixel
- `NEXT_PUBLIC_CLARITY_ID` — Microsoft Clarity

---

## 🔮 Future Integrations (Pre-wired)

The codebase is structured for easy addition of:

| Feature | Implementation Path |
|---------|-------------------|
| **Razorpay** | Add to `/products/[slug]` — CTA button already placed |
| **Shiprocket** | New API route `/api/shipping/` |
| **Customer Login** | Supabase Auth already configured |
| **Order Management** | Add `orders` table to `supabase/schema.sql` |
| **Distributor Portal** | Extend `/admin` with role-based access |
| **Inventory Dashboard** | Add `stock` column to products table |

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build   # Test build locally first
vercel deploy
```

Set all environment variables in Vercel project settings.

### Other Platforms
The app is a standard Next.js 15 app — works on any platform that supports Node.js 18+.

---

## 🛠️ Key Technologies

- **Next.js 15** — App Router, Server Components, Server Actions
- **TypeScript** — Full type safety throughout
- **Tailwind CSS** — Utility-first styling with custom brand tokens
- **Supabase** — Database, Auth, Row Level Security
- **Framer Motion** — Scroll reveals, page transitions, hover effects
- **React Hook Form + Zod** — Form handling with runtime validation
- **Sonner** — Toast notifications
- **Lucide React** — Icons

---

## 📝 Content To Update Before Launch

- [ ] Replace placeholder phone number in Footer & Contact page
- [ ] Replace placeholder email with real business email
- [ ] Add real office address
- [ ] Upload product images to Supabase Storage and update `image_url`
- [ ] Set real Google Analytics, Meta Pixel, Clarity IDs
- [ ] Write real blog posts via `/admin/blogs/new`
- [ ] Add all products via `/admin/products/new`
- [ ] Update site URL in `.env.local`

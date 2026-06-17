-- ============================================================
-- Prakriti Foods — Supabase Database Schema
-- Run this entire file in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── 1. PRODUCTS ──────────────────────────────────────────────
create table if not exists public.products (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  slug          text not null unique,
  category      text not null check (category in ('pulses', 'spices', 'premium', 'gift')),
  description   text not null,
  price         numeric(10, 2) not null check (price > 0),
  weight        text not null,
  image_url     text,
  featured      boolean not null default false,
  badge         text,
  created_at    timestamptz not null default now()
);

-- Index for category filtering
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_featured on public.products(featured);
create index if not exists idx_products_slug on public.products(slug);

-- ── 2. BLOG POSTS ─────────────────────────────────────────────
create table if not exists public.blog_posts (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  slug          text not null unique,
  content       text not null,
  excerpt       text,
  image_url     text,
  tag           text,
  read_time     text,
  published     boolean not null default false,
  created_at    timestamptz not null default now()
);

create index if not exists idx_blog_slug      on public.blog_posts(slug);
create index if not exists idx_blog_published on public.blog_posts(published);

-- ── 3. DISTRIBUTOR LEADS ──────────────────────────────────────
create table if not exists public.distributor_leads (
  id                  uuid primary key default uuid_generate_v4(),
  name                text not null,
  phone               text not null,
  city                text not null,
  investment_capacity text not null,
  business_type       text not null,
  created_at          timestamptz not null default now()
);

create index if not exists idx_leads_created_at on public.distributor_leads(created_at desc);

-- ── 4. CONTACT MESSAGES ───────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  subject     text not null,
  message     text not null,
  created_at  timestamptz not null default now()
);

create index if not exists idx_messages_created_at on public.contact_messages(created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
alter table public.products          enable row level security;
alter table public.blog_posts        enable row level security;
alter table public.distributor_leads enable row level security;
alter table public.contact_messages  enable row level security;

-- ── Products: public read, authenticated write ────────────────
create policy "Products: public read"
  on public.products for select
  to anon, authenticated
  using (true);

create policy "Products: authenticated insert"
  on public.products for insert
  to authenticated
  with check (true);

create policy "Products: authenticated update"
  on public.products for update
  to authenticated
  using (true);

create policy "Products: authenticated delete"
  on public.products for delete
  to authenticated
  using (true);

-- ── Blog Posts: public read published, authenticated all ──────
create policy "Blog: public read published"
  on public.blog_posts for select
  to anon
  using (published = true);

create policy "Blog: authenticated read all"
  on public.blog_posts for select
  to authenticated
  using (true);

create policy "Blog: authenticated insert"
  on public.blog_posts for insert
  to authenticated
  with check (true);

create policy "Blog: authenticated update"
  on public.blog_posts for update
  to authenticated
  using (true);

create policy "Blog: authenticated delete"
  on public.blog_posts for delete
  to authenticated
  using (true);

-- ── Distributor Leads: anon insert, authenticated read ────────
create policy "Leads: anon insert"
  on public.distributor_leads for insert
  to anon, authenticated
  with check (true);

create policy "Leads: authenticated read"
  on public.distributor_leads for select
  to authenticated
  using (true);

-- ── Contact Messages: anon insert, authenticated read ─────────
create policy "Messages: anon insert"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "Messages: authenticated read"
  on public.contact_messages for select
  to authenticated
  using (true);

-- ============================================================
-- SAMPLE SEED DATA (optional — remove before production)
-- ============================================================

-- Sample product
insert into public.products (name, slug, category, description, price, weight, featured, badge)
values
  ('Toor Dal Premium', 'toor-dal-premium', 'pulses', 'Sun-dried, hand-sorted toor dal from the heartland of Maharashtra. Rich in protein, light on the stomach — perfect for everyday dal.', 199, '1 kg', true, 'Bestseller'),
  ('Chana Dal', 'chana-dal', 'pulses', 'Naturally processed chana dal with a golden hue and earthy flavour. Ideal for dal, snacks, and sweets.', 149, '500 g', true, null),
  ('Turmeric Powder', 'turmeric-powder', 'spices', 'Cold-ground turmeric from Sangli — vibrant colour, deep aroma, and potent curcumin content.', 129, '200 g', true, 'New'),
  ('Red Chilli Powder', 'red-chilli-powder', 'spices', 'Sun-dried Byadgi chillies ground to a rich, deep-red powder with balanced heat and brilliant colour.', 99, '100 g', false, null),
  ('Masoor Dal', 'masoor-dal', 'pulses', 'Tender red lentils that cook quickly and taste beautifully — great for soups, dal tadka, and curries.', 119, '500 g', true, null),
  ('Premium Saffron', 'premium-saffron', 'premium', 'Hand-harvested Kashmiri Mongra saffron — only the finest threads, intense colour, and a floral aroma that transforms any dish.', 599, '1 g', true, 'Premium')
on conflict (slug) do nothing;

-- Sample blog post
insert into public.blog_posts (title, slug, excerpt, content, tag, read_time, published)
values (
  'Why Toor Dal Should Be on Every Indian Table',
  'why-toor-dal-should-be-on-every-indian-table',
  'Toor dal is more than just comfort food — it is a nutritional powerhouse that has nourished Indian families for centuries.',
  '<p>Toor dal — also known as pigeon pea — is one of India''s most beloved pulses, and for good reason. Rich in plant-based protein, dietary fibre, and essential minerals, it is both nutritious and incredibly versatile.</p><h2>The Nutritional Story</h2><p>A single cup of cooked toor dal provides approximately 11 grams of protein, making it an excellent meat-free protein source. It is also rich in folate, manganese, and potassium.</p><h2>How to Buy Well</h2><p>Always look for dal that is uniform in colour, free of dust, and has a clean, slightly earthy smell. Avoid dal that looks pale or has visible debris — these are signs of poor handling or age.</p><p>At Prakriti Foods, our toor dal is hand-sorted and sun-dried to preserve its natural goodness — no bleaching, no polishing, no shortcuts.</p>',
  'Nutrition',
  '4 min read',
  true
)
on conflict (slug) do nothing;

create extension if not exists pgcrypto;

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_name text,
  slug text unique,
  phone text,
  city text,
  state text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  auth_user_id uuid,
  name text not null,
  email text not null unique,
  role text not null,
  status text not null default 'Ativo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  name text not null,
  phone text,
  email text,
  city text,
  status text not null default 'Ativo',
  total_spent numeric(12, 2) not null default 0,
  last_service_date date,
  next_service text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  plate text not null unique,
  model text not null,
  year text,
  fuel text,
  km integer not null default 0,
  last_km integer not null default 0,
  next_km integer not null default 0,
  next_date date,
  status text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  sku text not null unique,
  name text not null,
  category text not null,
  brand text,
  unit text not null,
  stock numeric(12, 2) not null default 0,
  min_stock numeric(12, 2) not null default 0,
  cost numeric(12, 2) not null default 0,
  price numeric(12, 2) not null default 0,
  margin numeric(6, 2) not null default 0,
  status text,
  favorite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  name text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists work_orders (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  vehicle_id uuid references vehicles(id) on delete set null,
  code text not null unique,
  opened_at timestamptz not null default now(),
  closed_at timestamptz,
  km integer not null default 0,
  status text not null,
  total numeric(12, 2) not null default 0,
  payment text,
  next_km integer,
  next_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists work_order_items (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references work_orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  quantity numeric(12, 2) not null default 1,
  unit_price numeric(12, 2) not null default 0,
  kind text not null default 'product',
  created_at timestamptz not null default now()
);

create table if not exists stock_movements (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  movement_type text not null,
  quantity numeric(12, 2) not null,
  note text,
  reference text,
  created_at timestamptz not null default now()
);

create table if not exists returns (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  vehicle_id uuid references vehicles(id) on delete set null,
  code text unique,
  next_km integer,
  next_date date,
  status text not null,
  channel text,
  contacted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  customer_name text not null,
  preview text not null,
  time_label text,
  unread boolean not null default true,
  type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  name text not null,
  status text not null,
  sent_count integer not null default 0,
  read_count integer not null default 0,
  reply_count integer not null default 0,
  rate text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  key text not null,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (company_id, key)
);

create index if not exists idx_users_company_id on users(company_id);
create index if not exists idx_customers_company_id on customers(company_id);
create index if not exists idx_vehicles_company_id on vehicles(company_id);
create index if not exists idx_vehicles_plate on vehicles(plate);
create index if not exists idx_products_company_id on products(company_id);
create index if not exists idx_work_orders_company_id on work_orders(company_id);
create index if not exists idx_returns_company_id on returns(company_id);
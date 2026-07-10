import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  boards,
  brand,
  campaigns,
  customers,
  currency,
  customerFor,
  findVehicle,
  metrics,
  messages,
  permissions,
  products,
  productsFor,
  returns,
  routeGroups,
  services,
  users,
  vehicles,
  workOrders,
} from './src/data.js';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);

function loadEnvFile(filePath = path.join(rootDir, '.env')) {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const index = trimmed.indexOf('=');
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.md', 'text/plain; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.svg', 'image/svg+xml'],
]);

function json(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify(payload, null, 2));
}

function text(res, statusCode, body, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function normalizePathname(pathname) {
  const decoded = decodeURIComponent(pathname).replace(/\\/g, '/');
  const normalized = path.posix.normalize(decoded).replace(/^\/+/, '');
  return normalized || 'index.html';
}

function withinRoot(filePath) {
  const absolute = path.resolve(rootDir, filePath);
  return absolute.startsWith(rootDir);
}

function buildDashboardPayload() {
  return {
    brand,
    metrics,
    summary: {
      todayServices: metrics.todayServices,
      finalized: metrics.finalized,
      returns: metrics.returns,
      lowStock: metrics.lowStock,
      monthlyRevenue: currency(metrics.monthlyRevenue),
    },
    quickActions: [
      { label: 'Atendimento por placa', route: '/atendimento' },
      { label: 'Nova troca / OS', route: '/nova-troca' },
      { label: 'Retornos', route: '/retornos' },
      { label: 'Estoque', route: '/estoque' },
    ],
    returns: returns.slice(0, 5),
    workOrders: workOrders.slice(0, 4),
    lowStockProducts: products.filter((product) => product.status !== 'Em estoque'),
    insights: [
      { label: 'Retorno', text: '32 clientes entram na janela de contato nos proximos 7 dias.' },
      { label: 'Estoque', text: 'Filtro PSL619 deve ser reposto antes da proxima semana.' },
      { label: 'Receita', text: 'Oleo 5W30 responde por 41% das trocas recentes.' },
    ],
  };
}

function buildCustomerPayload(customerId) {
  const customer = customers.find((entry) => entry.id === customerId);
  if (!customer) return null;
  const ownedVehicles = vehicles.filter((vehicle) => vehicle.customerId === customer.id);
  const customerOrders = workOrders.filter((order) => order.customerId === customer.id);
  return {
    customer,
    vehicles: ownedVehicles,
    workOrders: customerOrders,
  };
}

function buildVehiclePayload(plate) {
  const vehicle = vehicles.find((entry) => entry.plate === plate);
  if (!vehicle) return null;
  const customer = customerFor(vehicle);
  const vehicleOrders = workOrders.filter((order) => order.plate === vehicle.plate);
  return {
    vehicle,
    customer,
    workOrders: vehicleOrders,
    currentVehicle: findVehicle(plate),
  };
}

function buildProductPayload(productId) {
  const product = products.find((entry) => entry.id === productId);
  if (!product) return null;
  return {
    product,
    relatedWorkOrders: workOrders.filter((order) => productsFor(order).some((item) => item.id === product.id)),
  };
}

function buildApiSnapshot() {
  return {
    brand,
    permissions,
    routeGroups,
    services,
    boards,
    dashboard: buildDashboardPayload(),
    users,
    customers,
    vehicles,
    products,
    workOrders,
    returns,
    messages,
    campaigns,
  };
}

async function routeApi(url) {
  if (url.pathname === '/api/health') {
    return { status: 200, body: { ok: true, app: brand.name, env: process.env.APP_ENV || 'development', hasSupabase: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) } };
  }

  if (url.pathname === '/api/dashboard') return { status: 200, body: buildDashboardPayload() };
  if (url.pathname === '/api/customers') return { status: 200, body: customers };
  if (url.pathname.startsWith('/api/customers/')) return { status: 200, body: buildCustomerPayload(url.pathname.split('/').pop()) };
  if (url.pathname === '/api/vehicles') return { status: 200, body: vehicles };
  if (url.pathname.startsWith('/api/vehicles/')) return { status: 200, body: buildVehiclePayload(url.pathname.split('/').pop()) };
  if (url.pathname === '/api/products') return { status: 200, body: products };
  if (url.pathname.startsWith('/api/products/')) return { status: 200, body: buildProductPayload(url.pathname.split('/').pop()) };
  if (url.pathname === '/api/work-orders') return { status: 200, body: workOrders };
  if (url.pathname.startsWith('/api/work-orders/')) return { status: 200, body: workOrders.find((entry) => entry.id === url.pathname.split('/').pop()) || null };
  if (url.pathname === '/api/returns') return { status: 200, body: returns };
  if (url.pathname === '/api/messages') return { status: 200, body: messages };
  if (url.pathname === '/api/campaigns') return { status: 200, body: campaigns };
  if (url.pathname === '/api/navigation') return { status: 200, body: routeGroups };

  return null;
}

async function serveStatic(url, res) {
  const pathname = normalizePathname(url.pathname === '/' ? '/index.html' : url.pathname);
  const filePath = path.resolve(rootDir, pathname);
  if (!withinRoot(pathname) || !existsSync(filePath)) {
    const indexPath = path.join(rootDir, 'index.html');
    const content = await readFile(indexPath);
    text(res, 200, content, 'text/html; charset=utf-8');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes.get(ext) || 'application/octet-stream';
  const content = await readFile(filePath);
  text(res, 200, content, contentType);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);

  if (req.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    res.end();
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    const result = await routeApi(url);
    if (!result) {
      json(res, 404, { error: 'Not found' });
      return;
    }
    json(res, result.status, result.body);
    return;
  }

  await serveStatic(url, res);
});

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  server.listen(port, '127.0.0.1', () => {
    console.log(`AutoLub server running at http://127.0.0.1:${port}/`);
  });
}

export { buildApiSnapshot, buildDashboardPayload, buildCustomerPayload, buildVehiclePayload, buildProductPayload };
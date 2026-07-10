import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import {
  allRoutes,
  boards,
  brand,
  customers,
  findVehicle,
  metrics,
  permissions,
  products,
  returns,
  routeGroups,
  vehicles,
  workOrders,
} from '../src/data.js';

test('brand uses the approved product name', () => {
  assert.equal(brand.name, 'AutoLub');
});

test('core operational data supports the oil-change flow', () => {
  const vehicle = findVehicle('abc1d23');
  assert.equal(vehicle.plate, 'ABC1D23');
  assert.ok(customers.some((customer) => customer.id === vehicle.customerId));
  assert.ok(workOrders.some((order) => order.plate === vehicle.plate));
  assert.ok(products.some((product) => product.category === 'Oleos do motor'));
  assert.ok(products.some((product) => product.status === 'Estoque baixo'));
  assert.ok(returns.some((item) => item.status.includes('Vencido') || item.status.includes('Hoje')));
});

test('navigation covers the modules from the specification', () => {
  const labels = allRoutes.map((route) => route.label).join(' ');
  for (const expected of ['Dashboard', 'Atendimento rapido', 'Nova troca / OS', 'Clientes', 'Veiculos', 'Estoque', 'Retornos', 'Mensagens', 'Relatorios', 'Financeiro', 'Usuarios', 'Configuracoes']) {
    assert.match(labels, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.equal(routeGroups.length, 3);
});

test('permissions include all required roles', () => {
  for (const role of ['Administrador', 'Atendente', 'Estoque', 'Financeiro']) {
    assert.ok(Array.isArray(permissions[role]));
    assert.ok(permissions[role].length > 0);
  }
});

test('visual boards exist and are referenced', () => {
  assert.equal(boards.length, 7);
  for (const board of boards) {
    assert.ok(existsSync(board.file), `${board.file} should exist`);
  }
});

test('specification and app entrypoint are present', () => {
  const spec = readFileSync('entrada/ESPECIFICACAO_SAAS_TROCA_OLEO.md', 'utf8');
  const html = readFileSync('index.html', 'utf8');
  const app = readFileSync('src/app.js', 'utf8');
  assert.match(spec, /SaaS multiempresa/);
  assert.match(spec, /troca de óleo|troca de oleo/i);
  assert.match(html, /src\/app\.js/);
  assert.match(app, /ordemDetalhePage/);
  assert.match(app, /clienteDetalhePage/);
  assert.match(app, /veiculoDetalhePage/);
  assert.match(app, /produtoDetalhePage/);
  assert.match(app, /operationChecklist/);
  assert.match(app, /messageComposer/);
  assert.ok(metrics.monthlyRevenue > 0);
  assert.ok(vehicles.length >= 5);
});

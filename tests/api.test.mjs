import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApiSnapshot, buildCustomerPayload, buildDashboardPayload, buildProductPayload, buildVehiclePayload } from '../server.mjs';

test('api snapshot exposes the dashboard domain', () => {
  const snapshot = buildApiSnapshot();
  assert.equal(snapshot.brand.name, 'AutoLub');
  assert.equal(snapshot.users.length, 4);
  assert.equal(snapshot.customers.length, 5);
  assert.equal(snapshot.vehicles.length, 5);
  assert.equal(snapshot.products.length, 6);
  assert.equal(snapshot.workOrders.length, 4);
  assert.equal(snapshot.returns.length, 5);
});

test('dashboard payload contains the operational slices', () => {
  const dashboard = buildDashboardPayload();
  assert.equal(dashboard.returns.length, 5);
  assert.equal(dashboard.workOrders.length, 4);
  assert.ok(dashboard.lowStockProducts.length >= 1);
  assert.equal(dashboard.quickActions.length, 4);
});

test('customer payload includes related vehicles and orders', () => {
  const payload = buildCustomerPayload('c1');
  assert.equal(payload.customer.name, 'Joao da Silva');
  assert.equal(payload.vehicles.length, 1);
  assert.equal(payload.workOrders.length, 1);
});

test('vehicle and product payloads resolve related records', () => {
  const vehiclePayload = buildVehiclePayload('ABC1D23');
  const productPayload = buildProductPayload('p3');
  assert.equal(vehiclePayload.vehicle.plate, 'ABC1D23');
  assert.equal(vehiclePayload.workOrders.length, 1);
  assert.equal(productPayload.product.id, 'p3');
  assert.ok(productPayload.relatedWorkOrders.length >= 1);
});
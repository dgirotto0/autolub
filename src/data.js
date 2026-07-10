export const brand = {
  name: 'AutoLub',
  legalName: 'AutoLub Multiempresa',
  tagline: 'Gestao inteligente para troca de oleo',
  company: 'AutoLub Center',
  color: '#1D4ED8',
};

export const users = [
  { id: 'u1', name: 'Joao Silva', role: 'Administrador', email: 'joao@autolub.com.br', status: 'Ativo' },
  { id: 'u2', name: 'Maria Oliveira', role: 'Atendente', email: 'maria@autolub.com.br', status: 'Ativo' },
  { id: 'u3', name: 'Carlos Lima', role: 'Estoque', email: 'carlos@autolub.com.br', status: 'Ativo' },
  { id: 'u4', name: 'Ana Costa', role: 'Financeiro', email: 'ana@autolub.com.br', status: 'Inativo' },
];

export const permissions = {
  Administrador: ['dashboard', 'atendimento', 'trocas', 'clientes', 'veiculos', 'estoque', 'compras', 'retornos', 'mensagens', 'relatorios', 'financeiro', 'usuarios', 'configuracoes'],
  Atendente: ['dashboard', 'atendimento', 'trocas', 'clientes', 'veiculos', 'retornos', 'mensagens'],
  Estoque: ['dashboard', 'estoque', 'compras', 'retornos'],
  Financeiro: ['dashboard', 'relatorios', 'financeiro'],
};

export const customers = [
  { id: 'c1', name: 'Joao da Silva', phone: '(11) 98765-4321', email: 'joao.silva@email.com', city: 'Sao Paulo', status: 'Ativo', total: 8320, last: '08/03/2025', next: '08/06/2025' },
  { id: 'c2', name: 'Maria Oliveira', phone: '(11) 97654-3210', email: 'maria@email.com', city: 'Santo Andre', status: 'Ativo', total: 4210, last: '15/02/2025', next: 'Hoje' },
  { id: 'c3', name: 'Paulo Santos', phone: '(11) 96543-2109', email: 'paulo@email.com', city: 'Sao Paulo', status: 'Retorno vencido', total: 2180, last: '20/01/2025', next: 'Vencido' },
  { id: 'c4', name: 'Ana Costa', phone: '(11) 95432-1098', email: 'ana@email.com', city: 'Guarulhos', status: 'Ativo', total: 1570, last: '12/04/2025', next: '12/07/2025' },
  { id: 'c5', name: 'Carlos Lima', phone: '(11) 94321-0987', email: 'carlos@email.com', city: 'Osasco', status: 'Inativo', total: 960, last: '11/11/2024', next: 'Sem regra' },
];

export const vehicles = [
  { plate: 'ABC1D23', model: 'Honda Civic EXL 2.0', year: '2020/2020', fuel: 'Flex', customerId: 'c1', km: 86300, lastKm: 78200, nextKm: 92500, nextDate: '08/06/2025', status: 'Retorno em breve', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=240&q=70' },
  { plate: 'XYZ9F81', model: 'VW Polo 1.6', year: '2018/2018', fuel: 'Flex', customerId: 'c2', km: 54200, lastKm: 49200, nextKm: 59200, nextDate: 'Hoje', status: 'Hoje', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=240&q=70' },
  { plate: 'QWE5A12', model: 'Fiat Argo 1.3', year: '2019/2020', fuel: 'Flex', customerId: 'c3', km: 41000, lastKm: 35000, nextKm: 40000, nextDate: '27/05/2025', status: 'Vencido', image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=240&q=70' },
  { plate: 'RTY2B34', model: 'Jeep Compass 2.0', year: '2020/2020', fuel: 'Diesel', customerId: 'c4', km: 22300, lastKm: 17300, nextKm: 27300, nextDate: '03/06/2025', status: 'Futuro', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=240&q=70' },
  { plate: 'HJK8G77', model: 'GM Onix 1.0', year: '2017/2018', fuel: 'Flex', customerId: 'c5', km: 66800, lastKm: 60100, nextKm: 70100, nextDate: '06/06/2025', status: 'Futuro', image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=240&q=70' },
];

export const products = [
  { id: 'p1', sku: 'OLP-5W30-1L', name: 'Shell Helix HX8 5W30', category: 'Oleos do motor', brand: 'Shell', unit: 'L', stock: 18, min: 6, cost: 28.5, price: 45.9, margin: 37.9, status: 'Em estoque', favorite: true },
  { id: 'p2', sku: 'OLP-10W40-1L', name: 'Oleo 10W40 Semissintetico', category: 'Oleos do motor', brand: 'Mobil', unit: 'L', stock: 45, min: 20, cost: 22.1, price: 38.5, margin: 42.6, status: 'Em estoque', favorite: false },
  { id: 'p3', sku: 'FIL-PSL619', name: 'Filtro de Oleo PSL619', category: 'Filtros', brand: 'Tecfil', unit: 'un', stock: 2, min: 10, cost: 12.8, price: 28.5, margin: 55.1, status: 'Estoque baixo', favorite: true },
  { id: 'p4', sku: 'FIL-WOE123', name: 'Mann W 712/94', category: 'Filtros', brand: 'Mann', unit: 'un', stock: 25, min: 8, cost: 15.2, price: 32, margin: 52.5, status: 'Em estoque', favorite: true },
  { id: 'p5', sku: 'FLD-DOT4-500', name: 'Fluido de Freio DOT 4', category: 'Fluidos', brand: 'Bosch', unit: 'un', stock: 0, min: 5, cost: 11.5, price: 25.9, margin: 55.6, status: 'Sem estoque', favorite: false },
  { id: 'p6', sku: 'ADT-RAD-1L', name: 'Aditivo Radiador Concentrado', category: 'Aditivos', brand: 'Radiex', unit: 'un', stock: 60, min: 15, cost: 9.2, price: 22.9, margin: 59.8, status: 'Em estoque', favorite: false },
];

export const services = [
  'Troca de oleo',
  'Filtro de oleo',
  'Filtro de ar',
  'Filtro de combustivel',
  'Filtro de cabine',
  'Fluido de freio',
  'Palhetas',
  'Revisao rapida',
];

export const workOrders = [
  { id: 'OS-000123', customerId: 'c1', plate: 'ABC1D23', date: '08/03/2025 10:30', km: 78200, status: 'Concluida', total: 276, payment: 'PIX', products: ['p1', 'p4'], nextKm: 92500, nextDate: '08/06/2025' },
  { id: 'OS-000124', customerId: 'c2', plate: 'XYZ9F81', date: '15/02/2025 09:10', km: 49200, status: 'Concluida', total: 198.6, payment: 'Cartao', products: ['p2', 'p3'], nextKm: 59200, nextDate: 'Hoje' },
  { id: 'OS-000125', customerId: 'c3', plate: 'QWE5A12', date: '20/01/2025 11:00', km: 35000, status: 'Concluida', total: 221.3, payment: 'Dinheiro', products: ['p1', 'p3'], nextKm: 40000, nextDate: '27/05/2025' },
  { id: 'OS-000126', customerId: 'c4', plate: 'RTY2B34', date: '12/04/2025 16:20', km: 17300, status: 'Concluida', total: 254.8, payment: 'PIX', products: ['p1', 'p4', 'p6'], nextKm: 27300, nextDate: '03/06/2025' },
];

export const returns = vehicles.map((vehicle) => {
  const customer = customers.find((item) => item.id === vehicle.customerId);
  return {
    id: `ret-${vehicle.plate}`,
    customer: customer.name,
    phone: customer.phone,
    plate: vehicle.plate,
    vehicle: vehicle.model,
    lastKm: vehicle.lastKm,
    nextKm: vehicle.nextKm,
    nextDate: vehicle.nextDate,
    status: vehicle.status,
    channel: 'WhatsApp',
  };
});

export const messages = [
  { id: 'm1', customer: 'Joao da Silva', preview: 'Sua proxima troca esta chegando. Podemos agendar?', time: '08:41', unread: true, type: 'Retorno' },
  { id: 'm2', customer: 'Maria Oliveira', preview: 'Obrigada! Estarei ai.', time: '09:32', unread: false, type: 'Confirmacao' },
  { id: 'm3', customer: 'Paulo Santos', preview: 'Pode enviar o orcamento?', time: 'Ontem', unread: true, type: 'Orcamento' },
];

export const campaigns = [
  { id: 'cmp1', name: 'Retorno - Troca de oleo', status: 'Ativa', sent: 498, read: 342, replies: 68, rate: '13,7%' },
  { id: 'cmp2', name: 'Promocao - Filtros', status: 'Concluida', sent: 520, read: 312, replies: 44, rate: '8,7%' },
  { id: 'cmp3', name: 'Revisao - Seguranca', status: 'Concluida', sent: 450, read: 188, replies: 39, rate: '8,7%' },
];

export const metrics = {
  todayServices: 24,
  finalized: 18,
  returns: 32,
  overdue: 7,
  lowStock: 12,
  monthlyRevenue: 125430,
  monthlyProfit: 32615.8,
  averageTicket: 226.67,
  stockValue: 245320.6,
};

export const boards = [
  { title: 'Board 1 - Design System', file: 'entrada/8A69AFA4-3F1D-4660-8A26-15EC4C18D538.PNG' },
  { title: 'Board 2 - Arquitetura e Fluxos', file: 'entrada/B1034EB6-82E1-4285-9C3E-E5F6D22AFED4.PNG' },
  { title: 'Board 3 - Desktop Operacional', file: 'entrada/3CB9643B-8D8D-4333-8F71-427F8218B932.PNG' },
  { title: 'Board 4 - Estoque, Retornos e Mensagens', file: 'entrada/A51BD699-4B2B-4C3F-BD89-80CC2E090A56.PNG' },
  { title: 'Board 5 - Gestao', file: 'entrada/27DA1A22-36A1-4CF8-9669-641FCBADA465.PNG' },
  { title: 'Board 6 - Mobile Operacional', file: 'entrada/81C694CC-5042-481E-AB1E-C06C753A4348.PNG' },
  { title: 'Board 7 - Mobile Relacionamento', file: 'entrada/F141106E-476E-4779-BBA0-B780BE988064.PNG' },
];

export const routeGroups = [
  {
    label: 'Operacao',
    routes: [
      { path: '/dashboard', label: 'Dashboard', icon: 'grid', permission: 'dashboard' },
      { path: '/atendimento', label: 'Atendimento rapido', icon: 'search', permission: 'atendimento' },
      { path: '/nova-troca', label: 'Nova troca / OS', icon: 'plus', permission: 'trocas' },
      { path: '/trocas', label: 'Trocas / OS', icon: 'clipboard', permission: 'trocas' },
      { path: '/clientes', label: 'Clientes', icon: 'users', permission: 'clientes' },
      { path: '/veiculos', label: 'Veiculos', icon: 'car', permission: 'veiculos' },
    ],
  },
  {
    label: 'Recorrencia',
    routes: [
      { path: '/estoque', label: 'Estoque', icon: 'box', permission: 'estoque' },
      { path: '/compras', label: 'Compras / Notas', icon: 'upload', permission: 'compras' },
      { path: '/retornos', label: 'Retornos', icon: 'refresh', permission: 'retornos' },
      { path: '/mensagens', label: 'Mensagens', icon: 'message', permission: 'mensagens' },
    ],
  },
  {
    label: 'Gestao',
    routes: [
      { path: '/relatorios', label: 'Relatorios', icon: 'chart', permission: 'relatorios' },
      { path: '/financeiro', label: 'Financeiro', icon: 'money', permission: 'financeiro' },
      { path: '/usuarios', label: 'Usuarios', icon: 'shield', permission: 'usuarios' },
      { path: '/configuracoes', label: 'Configuracoes', icon: 'settings', permission: 'configuracoes' },
      { path: '/referencias', label: 'Referencias', icon: 'image', permission: 'dashboard' },
    ],
  },
];

export const allRoutes = routeGroups.flatMap((group) => group.routes);

export const onboardingSteps = [
  'Dados da empresa',
  'Servicos oferecidos',
  'Regras de retorno',
  'Usuarios',
  'Aparencia inicial',
  'Resumo final',
  'Tudo pronto',
];

export function currency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function findVehicle(plate) {
  const normalized = String(plate || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return vehicles.find((vehicle) => vehicle.plate === normalized);
}

export function customerFor(vehicle) {
  return customers.find((customer) => customer.id === vehicle?.customerId);
}

export function productsFor(order) {
  return order.products.map((id) => products.find((product) => product.id === id)).filter(Boolean);
}

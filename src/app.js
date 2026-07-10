import {
  allRoutes,
  boards,
  brand,
  campaigns,
  currency,
  customerFor,
  customers,
  findVehicle,
  metrics,
  onboardingSteps,
  permissions,
  products,
  productsFor,
  returns,
  routeGroups,
  services,
  users,
  vehicles,
  workOrders,
} from './data.js';

const state = {
  role: 'Administrador',
  plate: 'ABC1D23',
  selectedProducts: ['p1', 'p3'],
  onboardingStep: 0,
  toast: '',
  drawer: null,
};

const app = document.querySelector('#app');

const iconMap = {
  grid: '▦',
  search: '⌕',
  plus: '+',
  clipboard: '▤',
  users: '◉',
  car: '▰',
  box: '□',
  upload: '⇧',
  refresh: '↻',
  message: '◌',
  chart: '↗',
  money: '$',
  shield: '◇',
  settings: '⚙',
  image: '▣',
};

function route() {
  return location.hash.replace('#', '') || '/dashboard';
}

function go(path) {
  location.hash = path;
}

function icon(name) {
  return `<span class="nav-ico" aria-hidden="true">${iconMap[name] || '•'}</span>`;
}

function statusClass(status = '') {
  const value = status.toLowerCase();
  if (value.includes('venc') || value.includes('sem estoque') || value.includes('critico') || value.includes('cancel')) return 'danger';
  if (value.includes('baixo') || value.includes('hoje') || value.includes('pendente') || value.includes('breve') || value.includes('aguard')) return 'warn';
  if (value.includes('ativo') || value.includes('conclu') || value.includes('estoque') || value.includes('pago')) return 'success';
  return 'muted';
}

function badge(text) {
  return `<span class="badge ${statusClass(text)}">${text}</span>`;
}

function pageHead(title, subtitle, actions = '') {
  return `
    <div class="page-head">
      <div>
        <div class="eyebrow">AutoLub</div>
        <h1>${title}</h1>
        <p class="subtle">${subtitle}</p>
      </div>
      <div class="chips">${actions}</div>
    </div>
  `;
}

function metricCard(label, value, delta = '+12%', bad = false) {
  return `
    <div class="card metric">
      <div class="metric-label">${label}</div>
      <div class="metric-value">${value}</div>
      <div class="delta ${bad ? 'bad' : ''}">${bad ? '↓' : '↑'} ${delta} vs. mes anterior</div>
    </div>
  `;
}

function bars(values = [18, 28, 22, 36, 41, 33, 30, 44, 52, 38, 48, 55]) {
  const max = Math.max(...values);
  return `<div class="chart-bars">${values.map((value) => `<span class="bar" style="height:${Math.max(12, (value / max) * 100)}%"></span>`).join('')}</div>`;
}

function shell(content) {
  const current = route();
  return `
    <div class="app-shell">
      <aside class="sidebar">
        ${brandBlock()}
        ${routeGroups.map((group) => `
          <div class="nav-section">
            <div class="nav-label">${group.label}</div>
            ${group.routes.map((item) => navItem(item, current)).join('')}
          </div>
        `).join('')}
      </aside>
      <main class="main">
        ${topbar()}
        ${content}
      </main>
      ${bottomNav(current)}
      ${state.toast ? `<div class="toast">${state.toast}</div>` : ''}
      ${state.drawer ? drawer() : ''}
    </div>
  `;
}

function brandBlock() {
  return `
    <button class="brand nav-reset" data-route="/dashboard" aria-label="Ir para dashboard">
      <span class="brand-mark">滴</span>
      <span>
        <span class="brand-name">${brand.name}</span>
        <span class="brand-tag">${brand.tagline}</span>
      </span>
    </button>
  `;
}

function navItem(item, current) {
  const allowed = permissions[state.role].includes(item.permission);
  return `
    <button class="nav-item ${current === item.path ? 'active' : ''}" data-route="${allowed ? item.path : '/sem-permissao'}">
      ${icon(item.icon)}
      <span>${item.label}</span>
    </button>
  `;
}

function topbar() {
  return `
    <div class="topbar">
      <label class="global-search">
        <span>${iconMap.search}</span>
        <input id="globalSearch" placeholder="Buscar placa, cliente, OS, produto..." />
      </label>
      <button class="top-pill" data-route="/nova-troca">${iconMap.plus} Nova troca</button>
      <div class="profile-pill">
        <span class="avatar">JS</span>
        <select class="select" id="roleSwitch" aria-label="Perfil">
          ${Object.keys(permissions).map((role) => `<option ${state.role === role ? 'selected' : ''}>${role}</option>`).join('')}
        </select>
      </div>
    </div>
  `;
}

function bottomNav(current) {
  const items = [
    ['/dashboard', 'Inicio', 'grid'],
    ['/atendimento', 'Buscar', 'search'],
    ['/nova-troca', 'Nova', 'plus'],
    ['/retornos', 'Retornos', 'refresh'],
    ['/mensagens', 'Mais', 'message'],
  ];
  return `<nav class="bottom-nav">${items.map(([path, label, ico]) => `
    <button class="${current === path ? 'active' : ''}" data-route="${path}">
      <span>${iconMap[ico]}</span><span>${label}</span>
    </button>`).join('')}</nav>`;
}

function dashboardPage() {
  return shell(`
    ${pageHead('Dashboard operacional', 'Visao clara da loja, retornos, estoque e faturamento.', `
      <button class="btn" data-route="/atendimento">${iconMap.search} Buscar placa</button>
      <button class="btn primary" data-route="/nova-troca">${iconMap.plus} Nova troca</button>
    `)}
    <section class="grid cols-5">
      ${metricCard('Atendimentos do dia', metrics.todayServices)}
      ${metricCard('Trocas finalizadas', metrics.finalized)}
      ${metricCard('Clientes para retorno', metrics.returns, '+15%')}
      ${metricCard('Estoque baixo', metrics.lowStock, '-4%', true)}
      ${metricCard('Faturamento do mes', currency(metrics.monthlyRevenue))}
    </section>
    <section class="grid cols-2" style="margin-top:14px">
      <div class="card">
        <div class="card-head"><h2>Evolucao de faturamento</h2><div class="tabs"><button class="tab active">7 dias</button><button class="tab">30 dias</button><button class="tab">12 meses</button></div></div>
        ${bars()}
      </div>
      <div class="card">
        <div class="card-head"><h2>Retornos proximos</h2><button class="btn ghost" data-route="/retornos">Ver todos</button></div>
        <div class="table-wrap">${returnsTable(returns.slice(0, 5), false)}</div>
      </div>
    </section>
    <section class="grid cols-3" style="margin-top:14px">
      <div class="card">
        <div class="card-head"><h2>Ultimas trocas</h2><button class="btn ghost" data-route="/trocas">Ver OS</button></div>
        <div class="table-wrap">${ordersTable(workOrders.slice(0, 4), false)}</div>
      </div>
      <div class="card pad">
        <h2>Estoque critico</h2>
        <div class="timeline" style="margin-top:14px">${products.filter((p) => p.status !== 'Em estoque').map((p) => `
          <div class="timeline-item"><span class="dot"></span><div><strong>${p.name}</strong><div class="subtle">${p.stock} ${p.unit} disponiveis - minimo ${p.min}</div></div></div>
        `).join('')}</div>
      </div>
      <div class="card pad">
        <h2>Insights inteligentes</h2>
        <div class="grid" style="margin-top:14px">
          ${insight('Retorno', '32 clientes entram na janela de contato nos proximos 7 dias.')}
          ${insight('Estoque', 'Filtro PSL619 deve ser reposto antes da proxima semana.')}
          ${insight('Receita', 'Oleo 5W30 responde por 41% das trocas recentes.')}
        </div>
      </div>
    </section>
  `);
}

function insight(label, text) {
  return `<div class="card pad" style="box-shadow:none"><span class="badge">${label}</span><p class="subtle">${text}</p></div>`;
}

function atendimentoPage() {
  const vehicle = findVehicle(state.plate);
  const customer = customerFor(vehicle);
  return shell(`
    ${pageHead('Atendimento rapido por placa', 'Abertura de OS com historico, cliente, produtos usados e retorno.', `
      <button class="btn" data-action="plate-missing">Simular placa nova</button>
      <button class="btn primary" data-route="/nova-troca">${iconMap.plus} Abrir OS</button>
    `)}
    <section class="split">
      <div class="card pad">
        <div class="grid cols-2">
          <label class="field">
            <span>Digite a placa</span>
            <input class="input" id="plateInput" value="${state.plate}" placeholder="ABC1D23" />
          </label>
          <div class="field">
            <span>&nbsp;</span>
            <button class="btn primary" data-action="search-plate">${iconMap.search} Buscar veiculo</button>
          </div>
        </div>
        <div id="plateResult" style="margin-top:16px">${vehicle ? vehicleFound(vehicle, customer) : vehicleMissing()}</div>
      </div>
      <div class="card pad">
        <h2>Sugestoes para o atendimento</h2>
        <p class="subtle">Produtos recentes, favoritos e usados anteriormente aparecem antes da digitacao longa.</p>
        ${productSuggestions()}
      </div>
    </section>
  `);
}

function vehicleFound(vehicle, customer) {
  const orders = workOrders.filter((order) => order.plate === vehicle.plate);
  return `
    <div class="grid cols-3">
      <div class="card pad">
        <span class="badge ${statusClass(vehicle.status)}">${vehicle.status}</span>
        <h2 style="margin-top:10px">${vehicle.plate}</h2>
        <p class="subtle">${vehicle.model} - ${vehicle.year}</p>
        <p><strong>Km atual:</strong> ${vehicle.km.toLocaleString('pt-BR')} km</p>
      </div>
      <div class="card pad">
        <h2>${customer.name}</h2>
        <p class="subtle">${customer.phone}<br>${customer.email}</p>
        <button class="btn" data-action="whatsapp">WhatsApp</button>
      </div>
      <div class="card pad">
        <h2>Proximo retorno</h2>
        <p><strong>${vehicle.nextKm.toLocaleString('pt-BR')} km</strong></p>
        <p class="subtle">${vehicle.nextDate}</p>
        <button class="btn primary" data-route="/retornos">Ver retornos</button>
      </div>
    </div>
    <div class="card" style="margin-top:14px">
      <div class="card-head"><h2>Historico resumido</h2><button class="btn" data-route="/veiculos">Ver veiculo</button></div>
      <div class="table-wrap">${ordersTable(orders, false)}</div>
    </div>
  `;
}

function vehicleMissing() {
  return `
    <div class="card pad" style="background:#fbfdff">
      <span class="badge warn">Placa nao encontrada</span>
      <h2 style="margin-top:10px">Cadastre o cliente sem interromper o atendimento</h2>
      <p class="subtle">A OS pode continuar com cadastro rapido de cliente e veiculo, deixando dados opcionais para depois.</p>
      <div class="chips">
        <button class="btn primary" data-route="/nova-troca">${iconMap.plus} Continuar para nova troca</button>
        <button class="btn" data-route="/clientes">Cadastrar cliente</button>
      </div>
    </div>
  `;
}

function productSuggestions() {
  return `
    <div class="grid" style="margin-top:14px">
      <div><strong>Favoritos da loja</strong><div class="chips" style="margin-top:8px">${products.filter((p) => p.favorite).map(productChip).join('')}</div></div>
      <div><strong>Mais usados</strong><div class="chips" style="margin-top:8px">${products.slice(0, 4).map(productChip).join('')}</div></div>
      <div><strong>Alertas contextuais</strong><div class="grid" style="margin-top:8px">
        <div class="badge warn">Filtro PSL619 com estoque baixo</div>
        <div class="badge danger">Fluido DOT 4 sem estoque</div>
        <div class="badge">Duplicar ultima troca disponivel</div>
      </div></div>
    </div>
  `;
}

function productChip(product) {
  return `<button class="chip ${state.selectedProducts.includes(product.id) ? 'active' : ''}" data-product="${product.id}">${product.name}</button>`;
}

function novaTrocaPage() {
  const vehicle = findVehicle(state.plate) || vehicles[0];
  const customer = customerFor(vehicle);
  const selected = state.selectedProducts.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  const total = selected.reduce((sum, product) => sum + product.price * (product.category.includes('Oleo') ? 4 : 1), 40);
  return shell(`
    ${pageHead('Nova troca / ordem de servico', 'Tela central para registrar produtos especificos, servicos, valores e retorno.', `
      <button class="btn" data-action="duplicate-last">Duplicar ultima troca</button>
      <button class="btn primary" data-action="finish-order">Finalizar OS</button>
    `)}
    <section class="grid cols-3">
      <div class="card pad">
        <h2>Cliente e veiculo</h2>
        <div class="grid" style="margin-top:14px">
          <label class="field"><span>Cliente</span><input class="input" value="${customer.name}" /></label>
          <label class="field"><span>Telefone</span><input class="input" value="${customer.phone}" /></label>
          <label class="field"><span>Veiculo</span><input class="input" value="${vehicle.model}" /></label>
          <label class="field"><span>Placa</span><input class="input" value="${vehicle.plate}" /></label>
          <label class="field"><span>Km atual</span><input class="input" value="${vehicle.km}" /></label>
        </div>
      </div>
      <div class="card pad" style="grid-column:span 2">
        <h2>Produtos utilizados</h2>
        <p class="subtle">Cada item vem do estoque e mostra disponibilidade antes da finalizacao.</p>
        <div class="chips" style="margin:12px 0">${products.map(productChip).join('')}</div>
        <div class="table-wrap">${selectedProductsTable(selected)}</div>
      </div>
    </section>
    <section class="grid cols-3" style="margin-top:14px">
      <div class="card pad">
        <h2>Servicos</h2>
        <div class="grid" style="margin-top:12px">${services.slice(0, 6).map((service, index) => `<label class="chip ${index < 2 ? 'active' : ''}"><input type="checkbox" ${index < 2 ? 'checked' : ''}/> ${service}</label>`).join('')}</div>
      </div>
      <div class="card pad">
        <h2>Proximo retorno</h2>
        <div class="grid" style="margin-top:12px">
          <label class="field"><span>Intervalo em km</span><input class="input" value="5000" /></label>
          <label class="field"><span>Proxima troca</span><input class="input" value="${(vehicle.km + 5000).toLocaleString('pt-BR')} km" /></label>
          <label class="field"><span>Aviso antes</span><select class="select"><option>21 dias antes</option><option>7 dias antes</option></select></label>
        </div>
      </div>
      <div class="card pad">
        <h2>Valores</h2>
        <div class="timeline" style="margin-top:14px">
          <div class="timeline-item"><span class="dot"></span><div><strong>Produtos</strong><div class="subtle">${currency(total - 40)}</div></div></div>
          <div class="timeline-item"><span class="dot"></span><div><strong>Servicos</strong><div class="subtle">${currency(40)}</div></div></div>
          <div class="timeline-item"><span class="dot"></span><div><strong>Total</strong><div class="metric-value">${currency(total)}</div></div></div>
        </div>
      </div>
    </section>
  `);
}

function selectedProductsTable(selected) {
  return `<table><thead><tr><th>Produto</th><th>Categoria</th><th>Qtd.</th><th>Estoque</th><th>Preco</th><th>Status</th></tr></thead><tbody>
    ${selected.map((p) => `<tr><td>${p.name}</td><td>${p.category}</td><td>${p.category.includes('Oleo') ? '4 L' : '1 un'}</td><td>${p.stock} ${p.unit}</td><td>${currency(p.price)}</td><td>${badge(p.status)}</td></tr>`).join('')}
  </tbody></table>`;
}

function listPage(title, subtitle, table, actions = '') {
  return shell(`${pageHead(title, subtitle, actions)}<div class="card"><div class="card-head"><div class="tabs"><button class="tab active">Todos</button><button class="tab">Ativos</button><button class="tab">Alertas</button></div><button class="btn" data-action="columns">Colunas</button></div><div class="table-wrap">${table}</div></div>`);
}

function trocasPage() {
  return listPage('Trocas e OS', 'Historico de atendimentos com status, produtos e valores.', ordersTable(workOrders), `<button class="btn primary" data-route="/nova-troca">Nova OS</button>`);
}

function clientesPage() {
  return listPage('Clientes', 'Clientes, contatos, veiculos vinculados e recorrencia.', customersTable(customers), `<button class="btn primary">Novo cliente</button>`);
}

function veiculosPage() {
  return listPage('Veiculos', 'Historico por placa, km atual, ultima troca e proximo retorno.', vehiclesTable(vehicles), `<button class="btn primary">Novo veiculo</button>`);
}

function estoquePage() {
  return listPage('Estoque', 'Produtos, custo, venda, margem e disponibilidade por categoria.', productsTable(products), `<button class="btn" data-route="/compras">Entrada</button><button class="btn primary">Novo produto</button>`);
}

function comprasPage() {
  return shell(`
    ${pageHead('Compras / notas', 'Entrada manual, importacao XML e leitura futura por IA com revisao antes de salvar.', `<button class="btn primary" data-action="confirm-stock">Confirmar entrada</button>`)}
    <section class="grid cols-3">
      <div class="card pad"><h2>Dados da nota</h2><div class="grid" style="margin-top:12px"><label class="field"><span>Fornecedor</span><input class="input" value="Auto Pecas Brasil Ltda." /></label><label class="field"><span>Numero</span><input class="input" value="12345" /></label><label class="field"><span>Data</span><input class="input" value="12/05/2025" /></label></div></div>
      <div class="card pad" style="grid-column:span 2"><h2>Itens identificados</h2><div class="table-wrap">${selectedProductsTable(products.slice(0, 3))}</div></div>
    </section>
    <section class="card pad" style="margin-top:14px"><h2>Leitura por IA futura</h2><p class="subtle">O fluxo ja reserva upload, extracao, sugestao de vinculo e conferencia antes da entrada atualizar o estoque.</p><div class="chips"><span class="badge">Enviar nota</span><span class="badge">Extrair itens</span><span class="badge">Sugerir vinculos</span><span class="badge success">Confirmar entrada</span></div></section>
  `);
}

function retornosPage() {
  return listPage('Retornos programados', 'Clientes que precisam voltar por km ou data.', returnsTable(returns), `<button class="btn primary" data-action="send-reminders">Enviar lembretes</button>`);
}

function mensagensPage() {
  return shell(`
    ${pageHead('Mensagens e campanhas', 'Conversas, modelos, campanhas e metricas de recorrencia.', `<button class="btn primary" data-action="new-campaign">Nova campanha</button>`)}
    <section class="grid cols-3">
      <div class="card"><div class="card-head"><h2>Conversas</h2></div>${messages.map((m) => `<button class="nav-item" style="color:var(--ink);padding:12px;border-radius:0"><span class="avatar">${m.customer.split(' ').map((p) => p[0]).slice(0, 2).join('')}</span><span><strong>${m.customer}</strong><br><span class="subtle">${m.preview}</span></span></button>`).join('')}</div>
      <div class="card pad"><h2>Preview WhatsApp</h2><div class="card pad" style="margin-top:12px;background:#e7ffe9"><p>Ola Joao! Sua proxima troca do Honda Civic esta chegando. Ultima troca: 78.200 km. Proxima: 92.500 km ou 08/06/2025.</p><button class="btn primary" data-action="whatsapp">Enviar agora</button></div></div>
      <div class="card"><div class="card-head"><h2>Campanhas</h2></div><div class="table-wrap">${campaignsTable()}</div></div>
    </section>
  `);
}

function relatoriosPage() {
  return shell(`
    ${pageHead('Relatorios', 'Faturamento, produtos, clientes recorrentes, margem e produtividade.', `<button class="btn">Exportar PDF</button><button class="btn">Exportar XLSX</button>`)}
    <section class="grid cols-4">${metricCard('Faturamento', currency(125430))}${metricCard('Pedidos', '1.248')}${metricCard('Itens vendidos', '2.153')}${metricCard('Ticket medio', currency(100.67))}</section>
    <section class="grid cols-2" style="margin-top:14px"><div class="card"><div class="card-head"><h2>Comparacao de periodos</h2></div>${bars([31, 44, 38, 55, 49, 60, 72, 68, 74, 80, 79, 92])}</div><div class="card"><div class="card-head"><h2>Produtos mais vendidos</h2></div><div class="table-wrap">${productsTable(products.slice(0, 5))}</div></div></section>
  `);
}

function financeiroPage() {
  return shell(`
    ${pageHead('Financeiro basico', 'Fechamento, metodos de pagamento, a receber e lucro estimado.', `<button class="btn primary">Fechar caixa</button>`)}
    <section class="grid cols-4">${metricCard('Faturamento mes', currency(metrics.monthlyRevenue))}${metricCard('A receber', currency(38720))}${metricCard('Lucro estimado', currency(metrics.monthlyProfit))}${metricCard('Ticket medio', currency(metrics.averageTicket))}</section>
    <section class="grid cols-2" style="margin-top:14px"><div class="card pad"><h2>Fechamento de caixa</h2><div class="timeline" style="margin-top:14px">${['Abertura R$ 2.000,00','Entradas R$ 8.530,00','Saidas R$ 6.125,00','Fechamento R$ 4.225,00'].map((x) => `<div class="timeline-item"><span class="dot"></span><div>${x}</div></div>`).join('')}</div></div><div class="card"><div class="card-head"><h2>Linha do tempo financeira</h2></div><div class="table-wrap">${financeTable()}</div></div></section>
  `);
}

function usuariosPage() {
  return shell(`
    ${pageHead('Usuarios e permissoes', 'Perfis por funcao, matriz de permissoes e estado sem permissao.', `<button class="btn primary">Novo usuario</button>`)}
    <section class="grid cols-2"><div class="card"><div class="card-head"><h2>Usuarios</h2></div><div class="table-wrap">${usersTable()}</div></div><div class="card"><div class="card-head"><h2>Matriz de permissoes</h2></div><div class="table-wrap">${permissionTable()}</div></div></section>
  `);
}

function configuracoesPage() {
  return shell(`
    ${pageHead('Configuracoes', 'Empresa, atendimento, regras de retorno, visual, integracoes e backup.', `<button class="btn primary" data-action="save-settings">Salvar alteracoes</button>`)}
    <section class="grid cols-3">
      <div class="card pad"><h2>Empresa</h2><div class="grid" style="margin-top:12px"><label class="field"><span>Nome fantasia</span><input class="input" value="AutoLub Center" /></label><label class="field"><span>Telefone</span><input class="input" value="(11) 98765-4321" /></label><label class="field"><span>CNPJ</span><input class="input" value="12.345.678/0001-90" /></label></div></div>
      <div class="card pad"><h2>Servicos ativos</h2><div class="grid" style="margin-top:12px">${services.map((s) => `<label class="chip active"><input type="checkbox" checked/> ${s}</label>`).join('')}</div></div>
      <div class="card pad"><h2>Retornos e mensagens</h2><div class="grid" style="margin-top:12px"><label class="field"><span>Regra padrao</span><select class="select"><option>5.000 km ou 90 dias</option><option>10.000 km ou 180 dias</option></select></label><label class="field"><span>Canal</span><select class="select"><option>WhatsApp</option><option>E-mail</option></select></label></div></div>
    </section>
  `);
}

function referenciasPage() {
  return shell(`
    ${pageHead('Referencias visuais', 'Boards recebidos no pacote e usados como direcao visual principal.', '')}
    <section class="board-grid">${boards.map((board) => `<article class="card pad"><h2>${board.title}</h2><img class="board-img" src="${board.file}" alt="${board.title}" loading="lazy" /></article>`).join('')}</section>
  `);
}

function semPermissaoPage() {
  return shell(`
    ${pageHead('Sem permissao', 'Este perfil nao tem acesso a tela solicitada.', `<button class="btn primary" data-route="/dashboard">Voltar</button>`)}
    <section class="card pad"><h2>Controle por perfil</h2><p class="subtle">Troque o perfil no topo para testar permissao de Administrador, Atendente, Estoque ou Financeiro.</p></section>
  `);
}

function landingPage() {
  return `
    <div class="landing">
      <nav class="landing-nav">${brandBlock()}<div class="chips"><button class="btn" data-route="/login">Entrar</button><button class="btn primary" data-route="/registro">Comecar agora</button></div></nav>
      <section class="hero">
        <div>
          <div class="eyebrow">SaaS especializado para troca de oleo</div>
          <h1>Gestao completa para lojas de troca de oleo e servicos rapidos.</h1>
          <p class="hero-copy">Controle placa, historico, produtos usados, estoque, retorno por km/data e mensagens para trazer clientes de volta.</p>
          <div class="chips"><button class="btn primary" data-route="/registro">Comecar agora</button><button class="btn" data-route="/dashboard">Ver demonstracao</button></div>
        </div>
        <div class="mock-dashboard">
          <div class="mock-title">Dashboard AutoLub</div>
          <div class="grid cols-2" style="padding:16px">${metricCard('Atendimentos', '128')}${metricCard('Faturamento', currency(28430))}${metricCard('Retornos hoje', '24', '+8%')}${metricCard('Ticket medio', currency(221.3))}</div>
          ${bars([12, 18, 14, 28, 34, 26, 31])}
        </div>
      </section>
    </div>
  `;
}

function authPage(mode = 'login') {
  const isRegister = mode === 'registro';
  const isRecover = mode === 'recuperar';
  return `
    <div class="auth-wrap">
      <aside class="auth-side">
        ${brandBlock()}
        <div><h1>Sua operacao na melhor direcao.</h1><p>Controle clientes, estoque, OS e retornos em uma experiencia pensada para balcão.</p></div>
        <div class="grid">${insight('Seguranca', 'Dados organizados por empresa e perfil.')}${insight('Recorrencia', 'Lembretes para trazer o cliente de volta.')}</div>
      </aside>
      <main class="auth-panel">
        <h1>${isRegister ? 'Criar conta' : isRecover ? 'Recuperar senha' : 'Bem-vindo(a)'}</h1>
        <p class="subtle">${isRecover ? 'Informe seu e-mail para receber instrucoes.' : 'Acesse sua conta para continuar.'}</p>
        <div class="grid" style="margin-top:18px">
          ${isRegister ? '<label class="field"><span>Nome</span><input class="input" value="Daniel Girotto" /></label>' : ''}
          ${!isRecover ? '<label class="field"><span>E-mail</span><input class="input" value="seu@email.com" /></label>' : '<label class="field"><span>E-mail</span><input class="input" value="seu@email.com" /></label>'}
          ${isRegister ? '<label class="field"><span>Empresa</span><input class="input" value="AutoLub Center" /></label><label class="field"><span>Telefone</span><input class="input" value="(11) 99999-9999" /></label>' : ''}
          ${!isRecover ? '<label class="field"><span>Senha</span><input class="input" type="password" value="12345678" /></label>' : ''}
          ${isRegister ? '<label class="chip active"><input type="checkbox" checked/> Aceito os termos</label>' : ''}
          <button class="btn primary" data-route="${isRegister ? '/onboarding' : isRecover ? '/login' : '/dashboard'}">${isRecover ? 'Enviar link' : isRegister ? 'Criar conta' : 'Entrar'}</button>
          <button class="btn" data-route="${isRegister ? '/login' : '/registro'}">${isRegister ? 'Ja tenho conta' : 'Criar conta'}</button>
          ${!isRecover && !isRegister ? '<button class="btn ghost" data-route="/recuperar-senha">Esqueci minha senha</button>' : ''}
        </div>
      </main>
    </div>
  `;
}

function onboardingPage() {
  const step = state.onboardingStep;
  return `
    <main class="onboarding">
      ${brandBlock()}
      ${pageHead('Onboarding da empresa', 'Configuracao progressiva para colocar a loja em operacao sem cadastro cansativo.', '')}
      <div class="stepper">${onboardingSteps.map((_, index) => `<span class="step ${index <= step ? 'done' : ''}"></span>`).join('')}</div>
      <section class="card pad">
        <div class="eyebrow">Etapa ${step + 1} de ${onboardingSteps.length}</div>
        <h1>${onboardingSteps[step]}</h1>
        <div style="margin-top:18px">${onboardingContent(step)}</div>
        <div class="chips" style="margin-top:18px">
          <button class="btn" data-action="onboarding-prev">Voltar</button>
          <button class="btn primary" data-action="onboarding-next">${step === onboardingSteps.length - 1 ? 'Ir para o painel' : 'Continuar'}</button>
        </div>
      </section>
    </main>
  `;
}

function onboardingContent(step) {
  const blocks = [
    `<div class="grid cols-2"><label class="field"><span>Nome fantasia</span><input class="input" value="AutoLub Center" /></label><label class="field"><span>Cidade / UF</span><input class="input" value="Sao Paulo / SP" /></label><label class="field"><span>CNPJ</span><input class="input" value="12.345.678/0001-90" /></label><label class="field"><span>Telefone</span><input class="input" value="(11) 98765-4321" /></label></div>`,
    `<div class="grid cols-3">${services.map((s) => `<label class="chip active"><input type="checkbox" checked/> ${s}</label>`).join('')}</div>`,
    `<div class="grid cols-3"><label class="field"><span>Retorno por km</span><select class="select"><option>5.000 km</option><option>10.000 km</option></select></label><label class="field"><span>Retorno por data</span><select class="select"><option>90 dias</option><option>180 dias</option></select></label><label class="field"><span>Aviso</span><select class="select"><option>21 dias antes</option><option>7 dias antes</option></select></label></div>`,
    `<div class="table-wrap">${usersTable()}</div>`,
    `<div class="chips"><button class="chip active">Azul AutoLub</button><button class="chip">Claro</button><button class="chip">Escuro parcial</button><button class="chip">Neutro premium</button></div>`,
    `<div class="grid cols-3">${metricCard('Empresa', 'AutoLub Center', 'OK')}${metricCard('Servicos', '8 ativos', 'OK')}${metricCard('Regra', '5.000 km', 'OK')}</div>`,
    `<div class="card pad" style="background:#eff6ff"><h2>Ambiente pronto</h2><p class="subtle">A partir daqui o usuario entra no painel com dashboard, atendimento por placa, estoque e retornos.</p></div>`,
  ];
  return blocks[step];
}

function ordersTable(rows, full = true) {
  return `<table><thead><tr><th>OS</th><th>Cliente</th><th>Veiculo</th><th>Km</th><th>Status</th><th>Total</th>${full ? '<th>Acoes</th>' : ''}</tr></thead><tbody>${rows.map((order) => {
    const vehicle = vehicles.find((item) => item.plate === order.plate);
    const customer = customers.find((item) => item.id === order.customerId);
    return `<tr><td>${order.id}</td><td>${customer.name}</td><td>${vehicle.model}</td><td>${order.km.toLocaleString('pt-BR')}</td><td>${badge(order.status)}</td><td>${currency(order.total)}</td>${full ? '<td><button class="btn">Abrir</button></td>' : ''}</tr>`;
  }).join('')}</tbody></table>`;
}

function customersTable(rows) {
  return `<table><thead><tr><th>Nome</th><th>Telefone</th><th>Cidade</th><th>Ultima troca</th><th>Proximo retorno</th><th>Status</th><th>Total gasto</th></tr></thead><tbody>${rows.map((c) => `<tr><td>${c.name}</td><td>${c.phone}</td><td>${c.city}</td><td>${c.last}</td><td>${c.next}</td><td>${badge(c.status)}</td><td>${currency(c.total)}</td></tr>`).join('')}</tbody></table>`;
}

function vehiclesTable(rows) {
  return `<table><thead><tr><th>Placa</th><th>Modelo</th><th>Cliente</th><th>Km atual</th><th>Proxima troca</th><th>Status</th></tr></thead><tbody>${rows.map((v) => `<tr><td>${v.plate}</td><td>${v.model}</td><td>${customerFor(v).name}</td><td>${v.km.toLocaleString('pt-BR')}</td><td>${v.nextKm.toLocaleString('pt-BR')} km</td><td>${badge(v.status)}</td></tr>`).join('')}</tbody></table>`;
}

function productsTable(rows) {
  return `<table><thead><tr><th>SKU</th><th>Produto</th><th>Categoria</th><th>Estoque</th><th>Min.</th><th>Preco</th><th>Margem</th><th>Status</th></tr></thead><tbody>${rows.map((p) => `<tr><td>${p.sku}</td><td>${p.name}</td><td>${p.category}</td><td>${p.stock} ${p.unit}</td><td>${p.min}</td><td>${currency(p.price)}</td><td>${p.margin}%</td><td>${badge(p.status)}</td></tr>`).join('')}</tbody></table>`;
}

function returnsTable(rows, full = true) {
  return `<table><thead><tr><th>Cliente</th><th>Placa</th><th>Veiculo</th><th>Proximo km</th><th>Data</th><th>Status</th>${full ? '<th>Contato</th>' : ''}</tr></thead><tbody>${rows.map((r) => `<tr><td>${r.customer}</td><td>${r.plate}</td><td>${r.vehicle}</td><td>${r.nextKm.toLocaleString('pt-BR')}</td><td>${r.nextDate}</td><td>${badge(r.status)}</td>${full ? '<td><button class="btn" data-action="whatsapp">WhatsApp</button></td>' : ''}</tr>`).join('')}</tbody></table>`;
}

function campaignsTable() {
  return `<table><thead><tr><th>Campanha</th><th>Status</th><th>Enviadas</th><th>Lidas</th><th>Taxa</th></tr></thead><tbody>${campaigns.map((c) => `<tr><td>${c.name}</td><td>${badge(c.status)}</td><td>${c.sent}</td><td>${c.read}</td><td>${c.rate}</td></tr>`).join('')}</tbody></table>`;
}

function financeTable() {
  const rows = [['Recebimento PIX #REC1234', currency(850)], ['Pagamento fornecedor #NF4521', `- ${currency(1245)}`], ['Venda #VEN2156', currency(620)], ['Despesa #DESP889', `- ${currency(320)}`]];
  return `<table><thead><tr><th>Movimento</th><th>Valor</th></tr></thead><tbody>${rows.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table>`;
}

function usersTable() {
  return `<table><thead><tr><th>Nome</th><th>E-mail</th><th>Funcao</th><th>Status</th></tr></thead><tbody>${users.map((u) => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td><td>${badge(u.status)}</td></tr>`).join('')}</tbody></table>`;
}

function permissionTable() {
  const modules = ['dashboard', 'atendimento', 'trocas', 'clientes', 'estoque', 'financeiro', 'usuarios'];
  return `<table><thead><tr><th>Modulo</th>${Object.keys(permissions).map((role) => `<th>${role}</th>`).join('')}</tr></thead><tbody>${modules.map((module) => `<tr><td>${module}</td>${Object.keys(permissions).map((role) => `<td>${permissions[role].includes(module) ? '✓' : '-'}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

function drawer() {
  return `<div class="drawer-backdrop" data-action="close-drawer"><aside class="drawer" onclick="event.stopPropagation()"><div class="page-head"><div><h2>${state.drawer.title}</h2><p class="subtle">${state.drawer.text}</p></div><button class="icon-btn" data-action="close-drawer">×</button></div>${state.drawer.body}</aside></div>`;
}

const pageMap = {
  '/': landingPage,
  '/site': landingPage,
  '/login': () => authPage('login'),
  '/registro': () => authPage('registro'),
  '/recuperar-senha': () => authPage('recuperar'),
  '/onboarding': onboardingPage,
  '/dashboard': dashboardPage,
  '/atendimento': atendimentoPage,
  '/nova-troca': novaTrocaPage,
  '/trocas': trocasPage,
  '/clientes': clientesPage,
  '/veiculos': veiculosPage,
  '/estoque': estoquePage,
  '/compras': comprasPage,
  '/retornos': retornosPage,
  '/mensagens': mensagensPage,
  '/relatorios': relatoriosPage,
  '/financeiro': financeiroPage,
  '/usuarios': usuariosPage,
  '/configuracoes': configuracoesPage,
  '/referencias': referenciasPage,
  '/sem-permissao': semPermissaoPage,
};

export function render() {
  const view = pageMap[route()] || dashboardPage;
  app.innerHTML = view();
}

function notify(message) {
  state.toast = message;
  render();
  setTimeout(() => {
    state.toast = '';
    render();
  }, 2200);
}

function openColumnsDrawer() {
  state.drawer = {
    title: 'Personalizar colunas',
    text: 'Escolha o que fica visivel e salve a visualizacao da loja.',
    body: `<div class="grid">${['Nome','Telefone','Placa','Veiculo','Km atual','Proximo retorno','Status','Total gasto','Margem','Ultima entrada'].map((item, index) => `<label class="chip ${index < 6 ? 'active' : ''}"><input type="checkbox" ${index < 6 ? 'checked' : ''}/> ${item}</label>`).join('')}<button class="btn primary" data-action="close-drawer">Salvar visualizacao</button></div>`,
  };
  render();
}

document.addEventListener('click', (event) => {
  const routeButton = event.target.closest('[data-route]');
  if (routeButton) {
    go(routeButton.dataset.route);
    return;
  }

  const productButton = event.target.closest('[data-product]');
  if (productButton) {
    const id = productButton.dataset.product;
    state.selectedProducts = state.selectedProducts.includes(id) ? state.selectedProducts.filter((item) => item !== id) : [...state.selectedProducts, id];
    render();
    return;
  }

  const action = event.target.closest('[data-action]')?.dataset.action;
  if (!action) return;

  if (action === 'search-plate') {
    state.plate = document.querySelector('#plateInput')?.value || '';
    render();
  }
  if (action === 'plate-missing') {
    state.plate = 'ZZZ9Z99';
    render();
  }
  if (action === 'duplicate-last') {
    state.selectedProducts = productsFor(workOrders[0]).map((p) => p.id);
    notify('Ultima troca duplicada. Ajuste km, produtos e valores antes de finalizar.');
  }
  if (action === 'finish-order') notify('OS finalizada: estoque baixado, historico atualizado e retorno programado.');
  if (action === 'whatsapp') notify('Mensagem pronta para envio via WhatsApp.');
  if (action === 'send-reminders') notify('Lembretes de retorno enviados para clientes selecionados.');
  if (action === 'confirm-stock') notify('Entrada confirmada e estoque atualizado.');
  if (action === 'new-campaign') notify('Campanha criada como rascunho.');
  if (action === 'save-settings') notify('Configuracoes salvas.');
  if (action === 'columns') openColumnsDrawer();
  if (action === 'close-drawer') {
    state.drawer = null;
    render();
  }
  if (action === 'onboarding-prev') {
    state.onboardingStep = Math.max(0, state.onboardingStep - 1);
    render();
  }
  if (action === 'onboarding-next') {
    if (state.onboardingStep === onboardingSteps.length - 1) go('/dashboard');
    else {
      state.onboardingStep += 1;
      render();
    }
  }
});

document.addEventListener('change', (event) => {
  if (event.target.id === 'roleSwitch') {
    state.role = event.target.value;
    notify(`Perfil alterado para ${state.role}.`);
  }
});

window.addEventListener('hashchange', render);
render();

export const routes = Object.keys(pageMap);

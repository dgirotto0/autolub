# Plano de Execucao - SaaS Troca de Oleo

## 1. Leitura do pacote

Arquivo principal analisado:

- `entrada/ESPECIFICACAO_SAAS_TROCA_OLEO.md`

Imagens analisadas:

- `entrada/8A69AFA4-3F1D-4660-8A26-15EC4C18D538.PNG`
- `entrada/B1034EB6-82E1-4285-9C3E-E5F6D22AFED4.PNG`
- `entrada/3CB9643B-8D8D-4333-8F71-427F8218B932.PNG`
- `entrada/A51BD699-4B2B-4C3F-BD89-80CC2E090A56.PNG`
- `entrada/27DA1A22-36A1-4CF8-9669-641FCBADA465.PNG`
- `entrada/81C694CC-5042-481E-AB1E-C06C753A4348.PNG`
- `entrada/F141106E-476E-4779-BBA0-B780BE988064.PNG`

O repositorio esta vazio de aplicacao. Hoje ele contem apenas a especificacao e os PNGs de referencia.

## 2. Direcao do produto extraida

O produto e um SaaS multiempresa para lojas de troca de oleo, lubrificantes, filtros, fluidos, palhetas, revisao rapida e retorno recorrente de clientes.

O fluxo principal deve comandar a arquitetura:

1. buscar placa;
2. identificar veiculo e cliente;
3. consultar historico;
4. abrir nova troca ou OS;
5. selecionar produtos especificos usados;
6. baixar estoque;
7. calcular proximo retorno por km/data;
8. enviar comprovante, agradecimento ou lembrete;
9. acompanhar retornos recorrentes.

O sistema nao deve virar um CRUD generico. A tela central do produto e a operacao de troca por placa, com produtos reais vindos do estoque.

## 3. Mapa das imagens

As imagens seguem uma linguagem visual de SaaS automotivo com azul royal, fundo claro, cards de borda sutil, tabelas densas, navegacao lateral desktop e bottom navigation mobile. A marca final definida para implementacao e `AutoLub`.

Mapeamento observado:

- `8A69AFA4...PNG`: Board 1 - Design System.
- `B1034EB6...PNG`: Board 2 - Arquitetura e Fluxos.
- `3CB9643B...PNG`: Board 3 - Desktop Operacional. Inclui dashboard, atendimento por placa, nova troca/OS, detalhe da OS, clientes e veiculos.
- `A51BD699...PNG`: Board 4 - Desktop Estoque, Retornos e Mensagens. Inclui estoque, detalhe de produto, entrada de mercadoria, leitura por nota/IA futura, retornos programados e campanhas/mensagens.
- `27DA1A22...PNG`: Board 5 - Desktop Gestao. Inclui relatorios, financeiro basico, usuarios/permissoes, configuracoes da empresa, plano/assinatura e perfil.
- `81C694CC...PNG`: Board 6 - Mobile Operacional. Inclui dashboard, busca por placa, nova troca, atendimentos, estoque e retornos.
- `F141106E...PNG`: Board 7 - Mobile Relacionamento e Configuracoes. Inclui agenda, detalhe do cliente, historico do veiculo, mensagens/WhatsApp, alertas/retornos e perfil/configuracoes.

Observacao: o documento cita 8 boards, mas o pacote contem 7 imagens. Alem disso, a numeracao/conteudo das imagens parece consolidar ou deslocar alguns boards do documento.

## 4. Arquitetura funcional proposta

### 4.1 Blocos da aplicacao

1. Site publico
2. Autenticacao
3. Onboarding da empresa
4. Painel interno desktop
5. Experiencia mobile operacional

### 4.2 Rotas previstas

Publicas:

- `/`
- `/login`
- `/registro`
- `/recuperar-senha`
- `/redefinir-senha`

Onboarding:

- `/onboarding`

Painel:

- `/app/dashboard`
- `/app/atendimento`
- `/app/trocas`
- `/app/trocas/:id`
- `/app/clientes`
- `/app/clientes/:id`
- `/app/veiculos`
- `/app/veiculos/:placa`
- `/app/estoque`
- `/app/estoque/:id`
- `/app/compras-notas`
- `/app/retornos`
- `/app/mensagens`
- `/app/relatorios`
- `/app/financeiro`
- `/app/usuarios`
- `/app/configuracoes`
- `/app/assinatura`
- `/app/perfil`

Rotas auxiliares para estados:

- `/app/sem-permissao`
- modais/drawers internos para novo cliente, novo veiculo, novo produto, nova entrada, nova campanha e personalizacao de colunas.

## 5. Componentes obrigatorios

Base visual:

- `AppShell`
- `Sidebar`
- `Topbar`
- `BottomNav`
- `PageHeader`
- `SectionHeader`
- `MetricCard`
- `InfoCard`
- `StatusBadge`
- `ActionButton`
- `IconButton`
- `Tabs`
- `DataTable`
- `ColumnPicker`
- `FilterBar`
- `SearchInput`
- `EmptyState`
- `LoadingState`
- `PermissionState`
- `Toast`
- `Modal`
- `Drawer`

Operacao:

- `PlateSearch`
- `VehicleSummary`
- `CustomerSummary`
- `ServiceHistoryTimeline`
- `OilChangeForm`
- `ProductSelector`
- `ProductSuggestionChips`
- `ReturnRuleSelector`
- `PaymentSummary`
- `StockAlert`
- `MessagePreview`

Gestao:

- `DashboardKpis`
- `RevenueChart`
- `StockTable`
- `ReturnsTable`
- `CampaignMetrics`
- `PermissionMatrix`
- `PlanUsage`
- `CompanySettingsForm`

## 6. Dados mockados centralizados

Os mocks devem ficar separados da UI para facilitar backend futuro.

Entidades:

- empresas;
- usuarios;
- permissoes;
- clientes;
- veiculos;
- produtos;
- categorias de produto;
- servicos;
- trocas/OS;
- movimentacoes de estoque;
- retornos programados;
- mensagens;
- campanhas;
- relatorios;
- financeiro;
- planos/assinaturas.

Casos obrigatorios para mock:

- placa existente;
- placa inexistente;
- veiculo com historico;
- veiculo sem historico;
- produto em estoque normal;
- produto com estoque baixo;
- produto sem estoque;
- retorno vencido;
- retorno hoje;
- retorno futuro;
- cliente inativo;
- usuario sem permissao;
- erro de formulario;
- loading;
- sucesso apos acao.

## 7. Permissoes

Perfis:

- Administrador: acesso total.
- Atendente: busca placa, cria troca, cadastra cliente, ve historico.
- Estoque: produtos, entradas, ajustes, alertas.
- Financeiro: relatorios, pagamentos, fechamento.

Cada tela importante deve prever estado de sem permissao. A permissao pode ser simulada nos mocks, mas a UI precisa existir desde o inicio.

## 8. Etapas de implementacao

### Etapa 0 - Confirmacao de escopo e assets

Objetivo:

- marca final validada como `AutoLub`;
- PNGs mais recentes da raiz foram copiados novamente para `entrada/`;
- stack tecnica definida como SPA estatica moderna sem dependencias externas obrigatorias;
- primeira entrega sera uma aplicacao navegavel pronta, com mocks realistas e testes automatizados.

Saida:

- decisao de marca;
- assets finais organizados;
- backlog fechado para a primeira entrega.

### Etapa 1 - Fundacao tecnica

Objetivo:

- criar projeto front-end;
- configurar rotas;
- configurar tema;
- configurar dados mockados;
- criar estrutura de componentes base.

Telas:

- shell vazio;
- pagina de referencias visuais;
- pagina 404 simples.

Estados:

- loading global;
- erro generico;
- sem permissao generico.

### Etapa 2 - Design system e layout

Objetivo:

- implementar tokens visuais seguindo os boards e aplicando a marca AutoLub;
- criar navegacao desktop e mobile;
- criar componentes reutilizaveis.

Componentes:

- sidebar;
- topbar;
- bottom nav;
- cards;
- tabelas;
- filtros;
- inputs;
- selects;
- badges;
- tabs;
- modais;
- drawers;
- toasts.

Critério:

- a aplicacao deve parecer visualmente alinhada aos boards antes de criar telas profundas.

### Etapa 3 - Site publico, autenticacao e onboarding

Objetivo:

- criar entrada comercial do SaaS;
- criar login nao generico;
- criar registro;
- criar recuperacao de senha;
- criar onboarding progressivo.

Telas:

- landing page;
- login;
- registro;
- recuperar senha;
- redefinir senha;
- onboarding em 7 etapas.

Interacoes:

- CTAs navegaveis;
- validacoes visuais;
- progresso do onboarding;
- resumo final;
- ir para o painel.

### Etapa 4 - Nucleo operacional desktop

Objetivo:

- implementar o fluxo central do produto no desktop.

Telas:

- dashboard;
- atendimento rapido por placa;
- nova troca/OS;
- detalhe da OS;
- clientes;
- detalhe do cliente;
- veiculos;
- detalhe do veiculo.

Interacoes:

- buscar placa;
- abrir nova troca;
- duplicar ultima troca;
- selecionar produtos especificos;
- sugerir produtos recentes/mais usados/historico;
- calcular retorno por km/data;
- finalizar OS;
- atualizar estoque mockado visualmente;
- enviar mensagem simulada.

### Etapa 5 - Estoque, notas, retornos e mensagens

Objetivo:

- implementar o ciclo de recorrencia e estoque.

Telas:

- estoque;
- detalhe/edicao de produto;
- entrada manual de mercadoria;
- importacao futura por nota/IA simulada;
- retornos programados;
- mensagens;
- campanhas;
- modelos de mensagem.

Interacoes:

- filtros e colunas personalizaveis;
- alertas de estoque;
- entrada de produto;
- revisao antes de confirmar entrada;
- enviar WhatsApp simulado;
- marcar retorno como contatado;
- criar campanha.

### Etapa 6 - Gestao e administracao

Objetivo:

- entregar a visao do dono/administrador.

Telas:

- relatorios;
- financeiro basico;
- usuarios;
- permissoes;
- configuracoes da empresa;
- plano/assinatura;
- perfil.

Interacoes:

- filtros de periodo;
- exportar simulado;
- matriz de permissoes;
- toggles de servicos;
- configuracao de regras de retorno;
- configuracao de canais de mensagem;
- preferencias de usuario.

### Etapa 7 - Experiencia mobile

Objetivo:

- criar uma experiencia mobile operacional, nao apenas responsiva.

Telas prioritarias:

- inicio;
- buscar placa;
- nova troca;
- atendimentos;
- estoque;
- retornos;
- detalhe do cliente;
- historico do veiculo;
- mensagens;
- alertas;
- perfil/configuracoes.

Interacoes:

- bottom navigation;
- botao central de nova troca;
- formularios curtos;
- cards de atendimento;
- envio rapido de WhatsApp simulado.

### Etapa 8 - Qualidade e criterios de aceite

Objetivo:

- validar completude, navegacao e responsividade.

Checklist:

- todas as telas previstas existem ou tem rota/estado planejado;
- fluxos principais sao navegaveis;
- desktop e mobile foram testados;
- foco em troca de oleo esta claro;
- produtos especificos sao registrados;
- sugestoes rapidas existem;
- tabelas personalizaveis existem;
- retorno por km/data existe;
- mensagens para cliente existem;
- login nao e generico;
- onboarding e progressivo;
- visual segue os boards disponiveis;
- estados de loading, vazio, erro e sem permissao foram previstos.

## 9. Decisoes e duvidas restantes

Decisoes tomadas:

- Marca final: `AutoLub`.
- Entrega: aplicacao navegavel pronta, com mocks realistas.
- Testes: incluir testes automatizados antes de concluir.
- Stack: usar a opcao mais segura para o ambiente atual. Como o repositorio estava vazio e a rede pode ser restrita, a primeira versao foi montada como SPA estatica sem dependencias externas obrigatorias.

Duvidas restantes, nao bloqueantes para a primeira versao:

1. Boards: o documento descreve 8 boards, mas o pacote atual tem 7 imagens. A implementacao trata os 7 boards recebidos como fonte visual principal.
2. WhatsApp: a primeira versao simula envio e preview. Integracao real por `wa.me` ou API pode entrar depois.
3. Multiempresa: a primeira versao simula uma empresa/unidade. Alternancia real entre empresas pode entrar quando houver backend.
4. Backend: a arquitetura separa dados mockados da UI para troca futura por API.

## 10. Recomendacao de inicio

Comecar com uma aplicacao front-end navegavel e completa em escopo visual, sem backend real ainda.

Motivo:

- o documento exige muitas telas e estados;
- o valor inicial esta na validacao do produto e fluxo operacional;
- os dados podem ser mockados de forma realista;
- a arquitetura pode ser preparada para troca futura dos mocks por API;
- evita travar a definicao visual e funcional em decisoes prematuras de banco/autenticacao.

A primeira meta concreta deve ser: shell + design system + dashboard + atendimento por placa + nova troca/OS + estoque + retornos, com mobile operacional basico.

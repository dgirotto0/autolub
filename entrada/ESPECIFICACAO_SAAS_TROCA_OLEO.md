# Especificação do Produto — SaaS para Troca de Óleo

## Prompt obrigatório para o Codex

Use este documento como especificação principal do produto. Antes de implementar qualquer coisa, leia tudo, extraia todas as telas, fluxos, componentes, estados, regras de negócio e requisitos funcionais. Não comece codando diretamente. Primeiro, gere um plano de execução por etapas, incluindo mapa de rotas, estrutura visual, componentes, dados mockados, fluxos principais, estados de tela, permissões e critérios de aceite.

As imagens de referência serão fornecidas posteriormente e devem ser seguidas de forma estrita como especificação visual. Este documento define o escopo funcional e a estrutura do produto; as imagens definirão a identidade visual, layout, espaçamentos, hierarquia, componentes e aparência final. A implementação deve unir os dois: este documento + imagens.

Não simplifique o produto. Não transforme isso em um painel genérico. O sistema é um SaaS multiempresa focado em lojas de troca de óleo, lubrificantes, filtros, revisão rápida e retorno recorrente de clientes. Tudo deve ser pensado para operação real de balcão: rápido, simples, profissional, responsivo e comercialmente apresentável.

O projeto deve ser planejado antes por etapas. Para cada etapa, descreva o que será feito, quais telas serão criadas, quais componentes serão reutilizados, quais dados mockados serão necessários, quais interações serão simuladas e quais estados serão previstos. Depois implemente de forma organizada, sem pular telas e sem ignorar detalhes deste documento.

Evite decisões técnicas rígidas que não foram solicitadas. Use a tecnologia mais adequada ao repositório e ao ambiente atual, mas mantenha o código organizado, preparado para backend futuro, com componentes reutilizáveis, dados mockados centralizados, validações visuais, tratamento de estados, responsividade e estrutura limpa.

---

# 1. Visão do Produto

O produto será um SaaS multiempresa para lojas de troca de óleo.

O foco principal não é oficina mecânica geral. A aplicação pode permitir serviços extras, mas a experiência, as telas, os termos, os fluxos e os dados devem ser pensados principalmente para:

- troca de óleo;
- lubrificantes;
- filtros;
- fluidos;
- aditivos;
- palhetas;
- revisão rápida;
- histórico por placa;
- controle de estoque;
- retorno do cliente por km/data;
- mensagens de lembrete;
- gestão simples da operação.

Cada empresa terá sua própria conta, seus usuários, clientes, veículos, estoque, atendimentos, mensagens, retornos e configurações.

O nome provisório pode ser `AutoMaster`, mas deve ser fácil trocar depois.

---

# 2. Princípios de Produto

## 2.1 Simplicidade operacional

O funcionário do balcão precisa conseguir fazer o essencial em poucos passos:

1. buscar placa;
2. identificar cliente e veículo;
3. abrir nova troca;
4. selecionar produtos usados;
5. informar km atual;
6. definir próxima troca;
7. finalizar atendimento;
8. enviar comprovante ou lembrete.

## 2.2 Produto completo para o administrador

O administrador precisa conseguir:

- acompanhar dashboard;
- ver faturamento;
- controlar estoque;
- ver produtos mais usados;
- configurar regras de retorno;
- gerenciar usuários;
- configurar serviços;
- acompanhar clientes que precisam voltar;
- enviar campanhas;
- ver relatórios.

## 2.3 Personalização sem complicar

O sistema deve permitir personalização, mas sem transformar o primeiro uso em um cadastro cansativo.

A configuração deve ser progressiva:

- básico no onboarding;
- avançado em configurações;
- personalização visual e operacional depois.

## 2.4 Aparência profissional

A aplicação precisa parecer um SaaS real e premium, não um CRUD simples.

Deve ter:

- design limpo;
- telas bem espaçadas;
- cards consistentes;
- tabelas claras;
- botões evidentes;
- estados de erro/sucesso/loading;
- responsividade real;
- navegação desktop e mobile coerente.

---

# 3. Estrutura Geral

A aplicação será dividida em quatro blocos:

1. Site público;
2. Autenticação;
3. Onboarding da empresa;
4. Painel interno do SaaS.

---

# 4. Site Público

## 4.1 Landing Page

A landing page deve vender o SaaS como uma solução especializada para troca de óleo.

### Objetivo

Convencer o dono de loja que o sistema resolve problemas reais:

- controle por papel ou planilha;
- dificuldade de lembrar retorno de cliente;
- perda de histórico por placa;
- estoque desorganizado;
- falta de visão de faturamento;
- falta de acompanhamento dos produtos que mais saem;
- demora no atendimento;
- retrabalho no balcão.

### Seções obrigatórias

1. Hero principal;
2. Benefícios principais;
3. Como funciona;
4. Mockup do dashboard;
5. Mockup de atendimento por placa;
6. Mockup de mensagem para cliente;
7. Funcionalidades;
8. Planos;
9. FAQ;
10. CTA final.

### Hero

Deve conter:

- título direto;
- subtítulo explicando o SaaS;
- CTA principal: `Começar agora`;
- CTA secundário: `Ver demonstração`;
- imagem/mockup do dashboard ou cards flutuantes.

### Seção de mensagem para cliente

Deve existir uma área mostrando visualmente uma notificação/mensagem enviada ao cliente.

Pode ser simulada como um print de WhatsApp, sem depender de integração real neste momento.

Exemplo de mensagem:

> Olá, Carlos! Tudo bem?  
> Sua próxima troca de óleo do Honda Civic está próxima.  
> Última troca: 78.500 km  
> Próxima troca sugerida: 88.500 km ou 15/08/2026.  
> Agende sua troca com a gente.

A intenção é mostrar no site público que o sistema ajuda a trazer o cliente de volta.

### Seção “Como funciona”

Fluxo visual:

1. Cliente chega;
2. Loja busca a placa;
3. Sistema mostra histórico;
4. Operador registra a troca;
5. Estoque baixa automaticamente;
6. Próximo retorno é programado;
7. Cliente recebe lembrete.

---

# 5. Autenticação

## 5.1 Login

Não deve ser uma tela branca simples.

### Layout desktop

Usar layout dividido:

- lado esquerdo com identidade visual, mensagem do produto, cards ou ilustração em UI;
- lado direito com formulário de login.

O lado esquerdo pode mostrar:

- mini dashboard;
- frase de valor;
- indicadores fictícios;
- print de lembrete de retorno;
- selo de segurança;
- destaque para “feito para troca de óleo”.

### Campos

- e-mail;
- senha;
- lembrar acesso;
- esqueci minha senha;
- botão entrar;
- link para criar conta.

### Estados

- loading;
- erro de senha;
- usuário não encontrado;
- conta bloqueada;
- campo obrigatório;
- senha visível/oculta.

### Mobile

No mobile, o login pode ser mais direto, mas ainda deve manter identidade visual:

- logo;
- frase curta;
- formulário;
- links essenciais.

---

## 5.2 Registro

Campos:

- nome;
- e-mail;
- telefone;
- senha;
- confirmar senha;
- nome da empresa;
- aceite dos termos.

Depois do registro, o usuário deve ir para o onboarding.

---

## 5.3 Recuperação de Senha

Fluxo:

1. informar e-mail;
2. exibir confirmação de envio;
3. tela de redefinir senha;
4. confirmação de senha alterada.

---

# 6. Onboarding da Empresa

O onboarding deve ser simples, em etapas, com progresso visual.

## Etapa 1 — Dados da empresa

Campos:

- nome fantasia;
- CNPJ opcional;
- telefone;
- cidade;
- estado;
- logo opcional.

## Etapa 2 — Tipo de operação

Opções:

- troca de óleo;
- troca de óleo + filtros;
- troca de óleo + revisão rápida;
- loja de lubrificantes;
- outro.

## Etapa 3 — Serviços realizados

Checklist:

- troca de óleo;
- filtro de óleo;
- filtro de ar;
- filtro de combustível;
- filtro de cabine;
- fluido de freio;
- fluido de direção;
- aditivo;
- palheta;
- bujão;
- outros.

## Etapa 4 — Regras de retorno

Configurar padrões:

- retorno por 5.000 km;
- retorno por 7.000 km;
- retorno por 10.000 km;
- retorno por data;
- retorno por km;
- dias antes para aviso;
- modelo de mensagem padrão.

## Etapa 5 — Usuários

- primeiro administrador;
- convite opcional para funcionário;
- função do funcionário.

## Etapa 6 — Aparência inicial

A aparência deve poder ser configurada futuramente.

No onboarding pode existir uma escolha simples de tema:

- tema padrão;
- tema claro;
- tema escuro/parcial;
- cor principal da empresa.

A personalização visual deve ser opcional para não travar o cadastro.

## Etapa 7 — Finalização

Mostrar resumo:

- dados da empresa;
- serviços ativos;
- regra de retorno padrão;
- usuários;
- tema escolhido.

Botão: `Ir para o painel`.

---

# 7. Layout Desktop

## Estrutura

- sidebar fixa;
- topbar;
- área principal;
- cards;
- tabelas;
- filtros;
- ações rápidas.

## Sidebar

Itens:

- Dashboard;
- Atendimento rápido;
- Trocas de óleo;
- Clientes;
- Veículos;
- Estoque;
- Compras/Notas;
- Retornos;
- Mensagens;
- Relatórios;
- Financeiro;
- Usuários;
- Configurações.

## Topbar

Deve conter:

- busca global;
- empresa atual;
- notificações;
- perfil do usuário;
- ação rápida para nova troca.

---

# 8. Layout Mobile

O mobile deve ser operacional, não apenas responsivo.

## Bottom navigation

Itens:

- Início;
- Buscar placa;
- Nova troca;
- Retornos;
- Mais.

## Prioridades no mobile

- buscar placa rápido;
- criar troca;
- ver histórico;
- ver retornos;
- consultar estoque;
- enviar mensagem.

---

# 9. Dashboard

## Objetivo

Mostrar o estado atual da loja.

## KPIs

- atendimentos do dia;
- trocas finalizadas;
- clientes para retorno;
- retornos vencidos;
- estoque baixo;
- faturamento do mês;
- ticket médio;
- produtos mais vendidos.

## Cards e listas

- gráfico de faturamento;
- gráfico de trocas por período;
- últimas trocas;
- retornos próximos;
- estoque crítico;
- produtos em alta;
- insights inteligentes.

## Ações rápidas

- buscar placa;
- nova troca;
- cadastrar cliente;
- cadastrar produto;
- ver retornos.

---

# 10. Atendimento Rápido por Placa

Essa é uma das telas principais do produto.

## Fluxo

1. Operador digita placa;
2. sistema busca veículo;
3. exibe cliente vinculado;
4. exibe último atendimento;
5. exibe produtos usados anteriormente;
6. exibe próxima troca;
7. permite abrir nova troca.

## Quando a placa existe

Mostrar:

- placa;
- veículo;
- cliente;
- telefone;
- km da última troca;
- óleo usado anteriormente;
- filtros usados anteriormente;
- próxima troca prevista;
- histórico resumido.

Ações:

- nova troca;
- ver histórico;
- enviar mensagem;
- editar veículo.

## Quando a placa não existe

Mostrar estado vazio com:

- cadastrar novo veículo;
- cadastrar cliente;
- continuar para nova troca.

---

# 11. Nova Troca de Óleo / Nova OS

Esta é a tela central da operação.

## Bloco 1 — Cliente e veículo

Campos:

- cliente;
- telefone;
- veículo;
- placa;
- km atual;
- observações.

## Bloco 2 — Produtos utilizados

Importante: o operador não deve registrar apenas “filtro trocado”. Ele deve registrar qual produto específico foi utilizado.

Exemplo:

- óleo: Shell Helix HX8 5W30;
- quantidade: 4 litros;
- filtro de óleo: Wega WOE-123;
- filtro de ar: Tecfil ARL-456;
- filtro de cabine: não trocado;
- aditivo: Radiex XPTO.

Cada item deve vir do cadastro de produtos/estoque.

## Campos de produto

Para cada produto usado:

- categoria;
- produto específico;
- marca;
- código/SKU;
- quantidade;
- unidade;
- preço;
- estoque disponível;
- alerta se estoque for insuficiente.

## Sugestões rápidas de produtos

Para reduzir digitação, abaixo dos campos principais devem aparecer sugestões rápidas.

Exemplo no campo de óleo:

- últimos 3 óleos usados recentemente;
- 3 óleos mais vendidos;
- óleo usado na última troca desse mesmo veículo;
- favoritos da loja.

Exemplo no campo de filtro:

- filtro usado anteriormente no mesmo veículo;
- filtros mais usados;
- últimos filtros selecionados;
- produtos compatíveis cadastrados.

Essas sugestões devem aparecer como chips/cards clicáveis.

O operador deve conseguir clicar e preencher rapidamente.

## Melhorias de usabilidade para esta tela

- busca inteligente por produto;
- seleção por categoria;
- chips de produtos recentes;
- chips de produtos mais vendidos;
- sugestão baseada no histórico do veículo;
- alerta de estoque baixo durante a seleção;
- botão para adicionar produto manualmente se não existir;
- opção de salvar produto novo no estoque;
- duplicar itens da última troca;
- calcular próxima troca automaticamente;
- permitir editar antes de finalizar.

## Bloco 3 — Serviços

Serviços possíveis:

- troca de óleo;
- troca de filtro de óleo;
- troca de filtro de ar;
- troca de filtro de combustível;
- troca de filtro de cabine;
- revisão rápida;
- outros serviços configurados.

## Bloco 4 — Próximo retorno

Campos:

- km atual;
- intervalo em km;
- próxima troca em km;
- data estimada;
- regra usada;
- mensagem automática;
- dias antes do aviso.

## Bloco 5 — Valores

Campos:

- produtos;
- serviços;
- desconto;
- total;
- forma de pagamento;
- observação de pagamento.

## Finalização

Ações:

- salvar rascunho;
- finalizar troca;
- imprimir comprovante;
- enviar comprovante;
- enviar mensagem de agradecimento;
- programar retorno.

Ao finalizar:

- baixar estoque;
- registrar histórico;
- atualizar km do veículo;
- gerar próxima troca;
- atualizar dashboard;
- criar evento de retorno.

---

# 12. Detalhe da Troca / OS

Mostrar:

- número da OS;
- status;
- data;
- cliente;
- veículo;
- placa;
- km;
- produtos usados;
- serviços;
- valores;
- forma de pagamento;
- próxima troca;
- comprovante;
- mensagem enviada;
- histórico de alterações.

Ações:

- editar;
- imprimir;
- reenviar comprovante;
- cancelar;
- duplicar atendimento;
- abrir nova troca para o mesmo veículo.

---

# 13. Clientes

## Lista

Colunas sugeridas:

- nome;
- telefone;
- veículos;
- última troca;
- próximo retorno;
- status;
- valor gasto;
- ações.

## Tabelas personalizáveis

O usuário deve poder escolher quais colunas quer ver como principais.

Exemplo:

- uma loja pode querer ver telefone e próxima troca;
- outra pode querer ver valor gasto e status;
- outra pode querer ver cidade e quantidade de veículos.

A tabela deve ter opção de personalizar colunas, salvar visualização e restaurar padrão.

## Filtros

- ativos;
- inativos;
- retorno vencido;
- retorno próximo;
- aniversariantes;
- cidade;
- período.

## Ações

- novo cliente;
- editar;
- ver veículos;
- enviar WhatsApp;
- abrir nova troca.

---

# 14. Detalhe do Cliente

Mostrar:

- dados pessoais;
- telefone;
- WhatsApp;
- veículos vinculados;
- histórico de trocas;
- total gasto;
- ticket médio;
- retornos pendentes;
- mensagens enviadas;
- observações.

Ações:

- ligar;
- enviar WhatsApp;
- nova troca;
- editar cliente;
- adicionar veículo.

---

# 15. Veículos

## Lista

Colunas sugeridas:

- placa;
- cliente;
- marca;
- modelo;
- ano;
- km atual;
- última troca;
- próxima troca;
- status.

## Tabela personalizável

Assim como em clientes, permitir:

- escolher colunas;
- salvar visualização;
- ordenar;
- filtrar;
- restaurar padrão.

## Filtros

- retorno vencido;
- retorno próximo;
- marca;
- modelo;
- cliente;
- período.

---

# 16. Detalhe do Veículo

Mostrar:

- placa;
- marca/modelo;
- ano;
- cliente;
- km atual;
- histórico completo;
- óleo usado anteriormente;
- filtros trocados;
- produtos usados;
- próxima troca;
- observações.

Ações:

- nova troca;
- editar veículo;
- enviar lembrete;
- ver cliente.

---

# 17. Estoque

## Categorias

- óleos;
- filtros de óleo;
- filtros de ar;
- filtros de combustível;
- filtros de cabine;
- fluidos;
- aditivos;
- palhetas;
- bujões;
- outros.

## Tabela

Colunas sugeridas:

- código;
- produto;
- categoria;
- marca;
- quantidade;
- estoque mínimo;
- custo;
- preço de venda;
- margem;
- status.

## Personalização da tabela

Permitir ao usuário definir as colunas principais.

Exemplo:

- loja focada em estoque pode priorizar quantidade, mínimo e custo;
- loja focada em venda pode priorizar preço, margem e produtos mais vendidos.

## Status

- normal;
- baixo;
- crítico;
- sem estoque.

## Ações

- novo produto;
- entrada;
- saída manual;
- ajuste;
- histórico;
- importar nota;
- editar preço;
- definir estoque mínimo.

---

# 18. Entrada de Produtos / Notas

Fluxos:

1. entrada manual;
2. importação XML;
3. upload PDF/imagem;
4. leitura por IA futuramente.

Campos:

- fornecedor;
- número da nota;
- data;
- produtos;
- quantidade;
- custo;
- preço sugerido;
- total.

Antes de salvar, o sistema deve mostrar revisão dos itens.

Ao confirmar:

- criar movimentação;
- atualizar estoque;
- registrar fornecedor;
- atualizar custo médio;
- permitir ajuste dos produtos identificados.

---

# 19. Retornos Programados

Tela para controlar clientes que precisam voltar.

## Lista

- cliente;
- veículo;
- placa;
- última troca;
- km da última troca;
- próxima troca por km;
- próxima troca por data;
- status;
- contato.

## Status

- vencido;
- hoje;
- em breve;
- futuro;
- sem regra.

## Ações

- enviar WhatsApp;
- marcar como contatado;
- agendar;
- ignorar;
- abrir nova troca.

---

# 20. Mensagens e Campanhas

## Objetivo

Ajudar a loja a trazer clientes de volta.

## Áreas

- conversas;
- campanhas;
- modelos;
- histórico;
- métricas.

## Modelos de mensagem

- lembrete de troca próxima;
- retorno vencido;
- agradecimento após atendimento;
- promoção;
- cliente inativo;
- orçamento não finalizado.

## Mensagem de retorno

A mensagem deve usar variáveis:

- nome do cliente;
- veículo;
- placa;
- última troca;
- km da última troca;
- próxima troca;
- nome da loja;
- telefone da loja.

## Campanha

Campos:

- nome;
- público;
- canal;
- mensagem;
- data de envio;
- status;
- métricas.

---

# 21. Relatórios

Relatórios principais:

- faturamento por período;
- quantidade de trocas;
- produtos mais vendidos;
- óleos mais usados;
- filtros mais usados;
- clientes recorrentes;
- clientes inativos;
- ticket médio;
- estoque baixo;
- retorno de clientes;
- margem por produto;
- vendas por funcionário.

Filtros:

- período;
- produto;
- serviço;
- funcionário;
- forma de pagamento.

---

# 22. Financeiro Básico

Não precisa ser ERP completo no início, mas deve parecer profissional.

Mostrar:

- faturamento do dia;
- faturamento do mês;
- formas de pagamento;
- contas a receber;
- descontos;
- lucro estimado;
- ticket médio;
- fechamento de caixa.

---

# 23. Usuários e Permissões

Perfis:

## Administrador

- acesso total;
- configura empresa;
- vê financeiro;
- gerencia usuários.

## Atendente

- busca placa;
- cria troca;
- cadastra cliente;
- vê histórico.

## Estoque

- produtos;
- entradas;
- ajustes;
- alertas.

## Financeiro

- relatórios;
- pagamentos;
- fechamento.

Cada tela deve prever estado de sem permissão.

---

# 24. Configurações

## Empresa

- nome;
- logo;
- telefone;
- endereço;
- CNPJ;
- dados do comprovante.

## Atendimento

- serviços ativos;
- categorias de produtos;
- regras de retorno;
- campos obrigatórios;
- modelos de mensagem.

## Visual / tema

A aplicação deve permitir personalização visual futuramente.

Motivo: algumas empresas podem rejeitar uma cor fixa por não combinar com sua marca.

Possibilidades:

- cor principal;
- logo;
- tema padrão;
- tema claro;
- tema escuro parcial;
- aplicação de cor em botões e destaques.

As imagens finais deverão explorar opções de identidade visual, incluindo no mínimo:

- tons de laranja com sensação de sol/energia;
- estética mais espacial/tecnológica;
- opção com azul royal;
- opção neutra/premium;
- opção escura moderna;
- opção clara e comercial.

A definição final de cores será feita depois, antes das imagens definitivas.

## Sistema

- usuários;
- permissões;
- assinatura;
- integrações;
- backup;
- segurança.

---

# 25. Plano / Assinatura

Mostrar:

- plano atual;
- limite de usuários;
- limite de unidades;
- recursos ativos;
- histórico de pagamento;
- upgrade/downgrade;
- cobrança.

---

# 26. Perfil do Usuário

Mostrar:

- nome;
- e-mail;
- senha;
- foto;
- função;
- empresa atual;
- preferências;
- sair.

---

# 27. Componentes Obrigatórios

Criar componentes reutilizáveis para:

- sidebar;
- topbar;
- bottom nav;
- cards;
- KPI cards;
- tabelas;
- filtros;
- busca global;
- formulários;
- inputs;
- selects;
- textareas;
- checkboxes;
- radio buttons;
- switches;
- botões;
- chips;
- badges;
- modais;
- drawers;
- alertas;
- toasts;
- empty states;
- loading states;
- gráficos;
- cards de sugestão;
- cards de produtos recentes;
- cards de produtos favoritos;
- componente de personalização de colunas.

---

# 28. Estados Obrigatórios

Cada tela importante deve prever:

- carregando;
- vazio;
- erro;
- sucesso;
- sem permissão;
- confirmação;
- validação de formulário;
- item não encontrado;
- estoque insuficiente;
- ação concluída.

---

# 29. Melhorias de UX Obrigatórias

Além das telas principais, incluir melhorias práticas:

## Produtos recentes e mais usados

Em campos de produto, mostrar:

- últimos usados;
- mais vendidos;
- favoritos;
- usados anteriormente no veículo.

## Duplicar última troca

Ao abrir nova troca para veículo recorrente, permitir usar como base a última troca.

O operador pode ajustar km, produtos e valores antes de finalizar.

## Alertas contextuais

Durante a troca:

- produto com estoque baixo;
- produto sem estoque;
- cliente com retorno vencido;
- veículo sem histórico;
- km menor que último km registrado;
- produto não cadastrado.

## Tabelas personalizáveis

Nas principais listas:

- clientes;
- veículos;
- estoque;
- trocas;
- retornos.

Permitir:

- escolher colunas;
- ordenar;
- filtrar;
- salvar visualização;
- restaurar padrão.

## Ações rápidas

Sempre que fizer sentido, incluir:

- nova troca;
- buscar placa;
- enviar WhatsApp;
- ver histórico;
- editar;
- imprimir;
- exportar.

---

# 30. Boards / Imagens que serão geradas posteriormente

As imagens serão usadas como referência visual principal. Elas devem ser organizadas como especificação, parecidas com boards de Figma, com telas separadas, componentes claros e detalhes visuais explícitos.

## Board 1 — Design System

Deve conter:

- logo provisória;
- paleta;
- tipografia;
- espaçamentos;
- botões;
- inputs;
- selects;
- cards;
- tabelas;
- chips;
- alertas;
- modais;
- navegação desktop;
- navegação mobile;
- estados de componentes.

## Board 2 — Site Público e Autenticação

Deve conter:

- landing page;
- hero;
- mockup do dashboard;
- mockup de mensagem/WhatsApp para cliente;
- planos;
- login personalizado em layout dividido;
- registro;
- recuperar senha.

## Board 3 — Onboarding e Configuração Inicial

Deve conter:

- etapas do onboarding;
- dados da empresa;
- serviços ativos;
- regras de retorno;
- usuários;
- tema visual;
- resumo final.

## Board 4 — Desktop Operacional

Deve conter:

- dashboard;
- atendimento rápido por placa;
- nova troca de óleo;
- detalhe da troca/OS;
- clientes;
- veículos.

## Board 5 — Estoque, Retornos e Mensagens

Deve conter:

- estoque;
- produto;
- entrada de nota;
- leitura futura por IA;
- retornos programados;
- mensagens;
- campanhas.

## Board 6 — Gestão e Administração

Deve conter:

- relatórios;
- financeiro;
- usuários;
- permissões;
- configurações;
- assinatura;
- perfil.

## Board 7 — Mobile Operacional

Deve conter:

- dashboard mobile;
- buscar placa;
- nova troca;
- lista de atendimentos;
- estoque;
- retornos.

## Board 8 — Mobile Relacionamento e Gestão

Deve conter:

- detalhe do cliente;
- detalhe do veículo;
- histórico;
- mensagens;
- campanhas;
- alertas;
- perfil;
- configurações rápidas.

---

# 31. Critérios de Aceite

A entrega inicial será considerada correta se:

- todas as telas listadas estiverem previstas;
- os fluxos principais forem navegáveis;
- desktop e mobile forem considerados;
- o sistema estiver claramente focado em troca de óleo;
- produtos específicos forem registrados em cada troca;
- houver sugestões rápidas de produtos;
- houver tabelas personalizáveis;
- houver retorno por km/data;
- houver mockup de mensagens para clientes;
- login não for genérico;
- onboarding for progressivo;
- a aplicação parecer um SaaS real;
- as imagens futuras forem seguidas como referência visual principal;
- o código não for implementado sem planejamento prévio.

---

# 32. Direção Final

O produto precisa ser simples para o funcionário e completo para o dono.

A experiência principal deve ser:

1. placa;
2. histórico;
3. nova troca;
4. produtos usados;
5. baixa no estoque;
6. próxima troca;
7. mensagem para o cliente;
8. retorno recorrente.

Tudo que não ajudar esse fluxo deve ser secundário.

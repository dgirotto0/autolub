# Roadmap - AutoLub

## Fase 1 - Consolidar Prototipo Navegavel

Status: em andamento.

Objetivo:

- manter a aplicacao navegavel;
- cobrir todas as telas previstas na especificacao;
- garantir que os fluxos principais sejam claros;
- preparar a base para backend futuro.

Ja feito:

- SPA estatica com rotas por hash.
- Design system inicial.
- Dados mockados centralizados.
- Dashboard.
- Atendimento por placa.
- Nova troca / OS.
- Estoque, retornos, mensagens, relatorios, financeiro e configuracoes.
- Onboarding e autenticacao visual.
- Testes automatizados basicos.
- Detalhes navegaveis de OS, cliente, veiculo e produto.
- Boards visuais locais validados como PNGs integros.

Ainda fazer:

- Refinar microcopy de todas as telas.
- Melhorar estados vazios e estados de erro por tela.
- Adicionar mais casos mockados para placa inexistente, produto sem estoque e cliente inativo.
- Tornar a tela de nova OS mais proxima de uma operacao real, com agrupamento por categoria.
- Melhorar a experiencia mobile de nova troca.
- Evoluir detalhe de cliente, veiculo, produto e OS com edicao real e historico mais profundo.

Critérios de aceite:

- Toda rota abre sem erro.
- Fluxo placa -> nova OS -> finalizar -> retorno fica compreensivel.
- Mobile permite operar busca, nova troca, estoque e retornos.
- `npm run check` e `npm test` passam.

## Fase 2 - Backend e Persistencia

Objetivo:

- substituir mocks por API;
- persistir empresas, usuarios, clientes, veiculos, estoque, OS e retornos.

Decisoes pendentes:

- banco de dados;
- autenticacao;
- hospedagem;
- estrategia multiempresa;
- controle de permissoes no backend.

Entidades minimas:

- `companies`;
- `users`;
- `roles`;
- `customers`;
- `vehicles`;
- `products`;
- `services`;
- `work_orders`;
- `work_order_items`;
- `stock_movements`;
- `returns`;
- `messages`;
- `campaigns`;
- `settings`;

Critérios de aceite:

- Login real.
- Empresa isolada por conta.
- CRUD basico das entidades centrais.
- OS finalizada persiste historico, baixa estoque e cria retorno.
- Permissoes aplicadas no backend e no frontend.

## Fase 3 - Operacao de Balcao

Objetivo:

- deixar o fluxo de atendimento rapido o suficiente para uso em loja.

Escopo:

- busca por placa com normalizacao;
- cadastro rapido de cliente e veiculo;
- duplicar ultima troca;
- sugestoes de produtos por historico;
- favoritos da loja;
- produtos mais usados;
- validacao de km menor que ultimo km;
- alerta de estoque insuficiente;
- comprovante de atendimento;
- envio de mensagem pos-atendimento.

Critérios de aceite:

- operador consegue finalizar uma troca recorrente em poucos passos;
- produto usado sempre vem do cadastro/estoque;
- sistema impede ou alerta estoque insuficiente;
- retorno por km/data fica programado automaticamente.

## Fase 4 - Estoque e Notas

Objetivo:

- tornar estoque confiavel e integrado a compras.

Escopo:

- entrada manual;
- ajuste de estoque;
- historico de movimentacoes;
- custo medio;
- margem;
- estoque minimo;
- importacao XML;
- upload PDF/imagem como fluxo preparado;
- revisao antes de confirmar entrada.

Critérios de aceite:

- toda OS gera saida de estoque;
- toda entrada aumenta estoque e registra fornecedor;
- produto sem estoque aparece como alerta na OS;
- tabelas permitem filtro e colunas personalizaveis.

## Fase 5 - Recorrencia e Mensagens

Objetivo:

- transformar historico de troca em retorno de cliente.

Escopo:

- retornos por km;
- retornos por data;
- status vencido, hoje, em breve e futuro;
- modelos de mensagem;
- campanhas;
- historico de contato;
- marcacao de contatado/agendado/ignorado;
- integracao real de WhatsApp quando definida.

Critérios de aceite:

- lista de retornos e acionavel;
- mensagem usa variaveis de cliente, veiculo, placa, km e loja;
- campanha mostra metricas basicas;
- loja consegue encontrar clientes inativos.

## Fase 6 - Gestao

Objetivo:

- entregar valor para o dono da loja.

Escopo:

- relatorios por periodo;
- faturamento;
- ticket medio;
- margem por produto;
- produtos mais vendidos;
- vendas por funcionario;
- clientes recorrentes;
- clientes inativos;
- financeiro basico;
- fechamento de caixa;
- usuarios e permissoes;
- configuracoes da empresa;
- plano/assinatura.

Critérios de aceite:

- administrador entende desempenho da loja sem exportar planilha;
- financeiro basico nao tenta virar ERP completo;
- permissoes restringem telas e acoes corretamente.

## Fase 7 - Qualidade, Acessibilidade e Entrega

Objetivo:

- deixar o produto confiavel para validacao real.

Escopo:

- testes unitarios;
- testes de fluxo;
- testes visuais/smoke com navegador quando houver Playwright/Chromium;
- auditoria mobile;
- revisao de acessibilidade;
- estados de erro;
- documentacao de deploy;
- checklist de aceite.

Critérios de aceite:

- testes passam em ambiente limpo;
- principais fluxos sao testados;
- nenhum texto importante quebra em mobile;
- app funciona em hospedagem estatica;
- documentacao permite outro agente continuar sem contexto adicional.

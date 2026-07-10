# Handoff - AutoLub

Este documento resume o estado atual do projeto para continuidade por outro agente ou desenvolvedor.

## Objetivo

Construir o `AutoLub`, um SaaS multiempresa para lojas de troca de oleo, lubrificantes, filtros, revisao rapida, controle de estoque e retorno recorrente de clientes.

O fluxo central do produto e:

1. buscar placa;
2. identificar cliente e veiculo;
3. consultar historico;
4. abrir nova troca / OS;
5. selecionar produtos especificos do estoque;
6. baixar estoque;
7. calcular proximo retorno por km/data;
8. enviar mensagem ou comprovante;
9. acompanhar recorrencia.

## Estado Atual

O projeto ja tem uma primeira aplicacao navegavel em SPA estatica, sem dependencias externas obrigatorias.
As imagens em `entrada/*.PNG` foram substituidas por versoes validadas e todos os sete arquivos passam em verificacao via PIL.

Arquivos principais:

- `index.html`: entrada da aplicacao.
- `src/app.js`: renderizacao das telas, rotas por hash e interacoes.
- `src/data.js`: dados mockados centralizados.
- `src/styles.css`: design system, layout desktop/mobile e componentes.
- `tests/data.test.mjs`: testes automatizados de escopo e integridade.
- `README.md`: comandos para rodar e testar.
- `PLANO_EXECUCAO_SAAS_TROCA_OLEO.md`: plano de execucao e entendimento da especificacao.
- `docs/TASKS.md`: backlog operacional e ordem recomendada das proximas tarefas.
- `docs/ROADMAP.md`: fases de produto do prototipo ate backend/deploy.
- `docs/AGENT_CHECKLIST.md`: checklist para agentes antes de alterar e commitar.
- `entrada/ESPECIFICACAO_SAAS_TROCA_OLEO.md`: especificacao original do produto.
- `entrada/*.PNG`: boards visuais de referencia.

## Decisoes Tomadas

- Nome final do produto: `AutoLub`.
- Primeira versao: aplicacao front-end navegavel com dados mockados realistas.
- Sem backend real nesta etapa.
- Sem dependencia externa obrigatoria para rodar localmente.
- Rotas por hash para funcionar bem como site estatico.
- Mocks separados da UI para facilitar troca futura por API.
- Testes com `node:test`, sem instalar framework adicional.

## Como Rodar

```bash
npm run dev
```

Abrir:

```text
http://127.0.0.1:4173/
```

Rotas uteis:

```text
/#/dashboard
/#/atendimento
/#/nova-troca
/#/estoque
/#/retornos
/#/mensagens
/#/referencias
```

## Como Testar

```bash
npm run check
npm test
```

Estado da ultima validacao feita:

- `npm run check`: passou.
- `npm test`: passou.
- Smoke HTTP local: passou para HTML, JS, CSS e PNG.

## Telas Ja Navegaveis

- Site publico.
- Login.
- Registro.
- Recuperacao de senha.
- Onboarding.
- Dashboard.
- Atendimento rapido por placa.
- Nova troca / OS.
- Trocas / OS.
- Clientes.
- Veiculos.
- Estoque.
- Compras / notas.
- Retornos programados.
- Mensagens e campanhas.
- Relatorios.
- Financeiro.
- Usuarios e permissoes.
- Configuracoes.
- Referencias visuais.
- Estado de sem permissao.
- Detalhe de OS.
- Detalhe de cliente.
- Detalhe de veiculo.
- Detalhe de produto.

## Interacoes Ja Simuladas

- Busca por placa existente.
- Simulacao de placa nao encontrada.
- Duplicar ultima troca.
- Selecionar/remover produtos da OS.
- Ver produtos agrupados por oleo, filtros e complementos.
- Ver checklist antes de finalizar OS.
- Ver preview de mensagem com variaveis reais da OS.
- Finalizar OS com toast.
- Enviar lembretes.
- Confirmar entrada de estoque.
- Criar campanha como rascunho.
- Salvar configuracoes.
- Trocar perfil de permissao.
- Abrir personalizacao de colunas.
- Avancar/voltar onboarding.
- Navegar de tabelas para detalhes de OS, cliente, veiculo e produto.

## Pontos Importantes para Proximos Agentes

- Nao transformar o produto em CRM ou ERP generico.
- O diferencial esta no fluxo de troca por placa, historico, produtos especificos, baixa de estoque e retorno recorrente.
- Manter a operacao de balcao rapida: poucos cliques, informacao escaneavel e formularios curtos.
- Preservar responsividade real. Mobile deve ser operacional, nao apenas uma tela desktop encolhida.
- Toda nova tela importante deve prever loading, vazio, erro, sem permissao e sucesso.
- Dados mockados devem continuar centralizados em `src/data.js` ate existir backend.
- Issues do GitHub devem espelhar as tarefas de `docs/TASKS.md`.

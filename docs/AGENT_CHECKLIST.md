# Checklist para Agentes

## Antes de Alterar

- Leia `entrada/ESPECIFICACAO_SAAS_TROCA_OLEO.md`.
- Leia `PLANO_EXECUCAO_SAAS_TROCA_OLEO.md`.
- Leia `docs/HANDOFF.md`.
- Confira `docs/ROADMAP.md`.
- Rode `npm test` para saber o estado inicial.

## Regras de Produto

- Priorize o fluxo de troca por placa.
- Nao generalize para oficina mecanica completa antes de fechar troca de oleo.
- Produtos usados na OS precisam ser produtos especificos do estoque.
- Retorno por km/data e parte central do produto.
- Mobile precisa ser operacional.
- Toda acao importante deve ter feedback visual.

## Regras de Codigo

- Dados mockados ficam em `src/data.js`.
- UI e interacoes ficam em `src/app.js`.
- Estilos globais e componentes visuais ficam em `src/styles.css`.
- Ao adicionar uma rota, inclua no mapa de rotas e, quando fizer sentido, no teste.
- Ao adicionar dados ou regra central, inclua teste em `tests/data.test.mjs`.

## Comandos Obrigatorios

```bash
npm run check
npm test
```

## Servidor Local

```bash
npm run dev
```

URL:

```text
http://127.0.0.1:4173/
```

## Antes de Entregar

- Verifique se o app abre em `/#/dashboard`.
- Verifique `/#/atendimento`.
- Teste buscar `ABC1D23`.
- Teste simular placa nova.
- Teste `/#/nova-troca`.
- Teste alternar perfil no topo e acessar uma tela sem permissao.
- Teste `/#/referencias`.
- Rode os comandos obrigatorios.

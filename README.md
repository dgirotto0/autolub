# AutoLub SaaS

Aplicacao navegavel para um SaaS multiempresa focado em lojas de troca de oleo, lubrificantes, filtros, estoque e retorno recorrente de clientes.

## Como rodar

```bash
npm run dev
```

Acesse:

```text
http://127.0.0.1:4173/
```

Rotas principais usam hash, por exemplo:

```text
http://127.0.0.1:4173/#/dashboard
http://127.0.0.1:4173/#/atendimento
http://127.0.0.1:4173/#/nova-troca
http://127.0.0.1:4173/#/referencias
```

## Testes

```bash
npm run check
npm test
```

## Escopo entregue

- Site publico.
- Login, registro e recuperacao de senha.
- Onboarding progressivo.
- Painel interno desktop.
- Navegacao mobile com bottom nav.
- Dashboard operacional.
- Atendimento rapido por placa.
- Nova troca / OS.
- Trocas, clientes e veiculos.
- Estoque e compras/notas.
- Retornos programados.
- Mensagens e campanhas.
- Relatorios, financeiro, usuarios, permissoes e configuracoes.
- Galeria de boards de referencia.
- Dados mockados centralizados em `src/data.js`.
- Testes automatizados em `tests/data.test.mjs`.

## Continuidade

Para continuar o projeto sem depender do historico da conversa:

- Leia `docs/HANDOFF.md`.
- Siga `docs/ROADMAP.md`.
- Use `docs/AGENT_CHECKLIST.md` antes de commitar qualquer alteracao.
- Consulte `PLANO_EXECUCAO_SAAS_TROCA_OLEO.md` para a leitura consolidada da especificacao.

## Observacoes

O projeto foi implementado como SPA estatica sem dependencias externas obrigatorias. Essa escolha evita bloqueio por rede ou instalacao de pacotes e deixa a primeira versao imediatamente navegavel. Os mocks foram separados da interface para permitir troca futura por API/backend.

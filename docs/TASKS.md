# Tasks - AutoLub

Este arquivo e o quadro de tarefas do projeto. Cada item deve existir tambem como issue no GitHub para permitir continuidade por Codex, Claude, Gemini ou outro agente.

## Legenda

- `P0`: essencial para validar o produto.
- `P1`: importante para completar a primeira versao.
- `P2`: evolucao apos a base estar coerente.

## Estado Atual

Repositorio remoto:

- `git@github.com:dgirotto0/autolub.git`

Branch principal:

- `main`

Commits principais:

- `37066f2` - prototipo navegavel inicial.
- `e9124b5` - boards validados e telas de detalhe.
- `4f9d5c1` - melhoria do fluxo operacional de OS.

Validacoes atuais:

- `npm run check`: passando.
- `npm test`: passando.
- 7 PNGs em `entrada/*.PNG`: integros.
- Servidor local funciona com `npm run dev`.

## P0 - Produto e Operacao

### T01 - Refinar nova OS para operacao real de balcao

Objetivo:

- transformar a tela de nova troca/OS na melhor experiencia do produto.

Escopo:

- separar oleo, filtros, fluidos e complementos em blocos claros;
- permitir quantidade por item;
- mostrar subtotal por item;
- impedir finalizacao com produto sem estoque ou pedir confirmacao explicita;
- validar km menor que o ultimo km;
- permitir marcar filtro como "nao trocado";
- permitir adicionar produto novo em fluxo rapido;
- manter sugestoes por historico, favoritos e mais vendidos.

Aceite:

- uma troca recorrente pode ser finalizada em poucos passos;
- cada produto usado vem do estoque;
- retorno por km/data e calculado automaticamente;
- estoque e historico sao atualizados visualmente no mock.

### T02 - Criar estados completos por tela

Objetivo:

- garantir que toda tela importante tenha estados de carregando, vazio, erro, sem permissao e sucesso.

Escopo:

- dashboard;
- atendimento por placa;
- nova OS;
- clientes;
- veiculos;
- estoque;
- retornos;
- mensagens;
- relatorios;
- financeiro;
- usuarios;
- configuracoes.

Aceite:

- existe forma de visualizar cada estado no front-end;
- os estados usam componentes consistentes;
- testes cobrem a existencia dos estados principais.

### T03 - Melhorar mobile operacional

Objetivo:

- fazer o mobile funcionar como ferramenta de balcao, nao apenas layout responsivo.

Escopo:

- nova troca mobile em passos curtos;
- busca por placa com resultado rapido;
- detalhes de cliente/veiculo otimizados;
- estoque e retornos em cards acionaveis;
- botoes fixos quando fizer sentido.

Aceite:

- fluxo placa -> nova troca -> finalizar e usavel em tela pequena;
- textos nao quebram nem sobrepoem;
- bottom navigation cobre os caminhos principais.

## P1 - Gestao, Recorrencia e Estoque

### T04 - Evoluir retornos e mensagens

Objetivo:

- deixar recorrencia como um modulo acionavel.

Escopo:

- status vencido, hoje, em breve, futuro e sem regra;
- filtros por status;
- marcar como contatado, agendado, ignorado;
- modelos de mensagem com variaveis;
- preview de WhatsApp;
- historico de contato por cliente;
- campanha com publico e metricas.

Aceite:

- operador consegue priorizar quem chamar primeiro;
- mensagem mostra nome, veiculo, placa, km e loja;
- campanhas tem status e metricas mockadas.

### T05 - Evoluir estoque e notas

Objetivo:

- tornar estoque confiavel e integrado ao atendimento.

Escopo:

- detalhe de produto com edicao;
- entrada manual completa;
- revisao antes de confirmar entrada;
- historico de movimentacoes;
- ajuste manual;
- custo medio;
- margem;
- estoque minimo;
- simulacao de importacao XML/PDF/imagem.

Aceite:

- entrada aumenta estoque no mock visual;
- OS baixa estoque no mock visual;
- alertas aparecem antes de finalizar OS.

### T06 - Evoluir tabelas personalizaveis

Objetivo:

- implementar personalizacao de colunas mais realista.

Escopo:

- clientes;
- veiculos;
- estoque;
- trocas;
- retornos;
- salvar visualizacao em estado local;
- restaurar padrao;
- ordenar colunas principais;
- filtros consistentes.

Aceite:

- usuario consegue alterar colunas visiveis;
- visualizacao permanece durante a sessao;
- filtros nao quebram layout mobile.

## P1 - Autenticacao, Onboarding e Site Publico

### T07 - Refinar site publico e autenticacao

Objetivo:

- deixar entrada comercial e login com qualidade de produto SaaS.

Escopo:

- landing com secoes obrigatorias da especificacao;
- mockup de dashboard;
- mockup de mensagem/WhatsApp;
- planos;
- FAQ;
- login em layout dividido;
- registro;
- recuperacao e redefinicao de senha.

Aceite:

- landing comunica troca de oleo, nao software generico;
- login nao parece tela branca simples;
- CTAs levam para os fluxos corretos.

### T08 - Refinar onboarding progressivo

Objetivo:

- deixar cadastro inicial rapido e suficiente para primeiro uso.

Escopo:

- dados da empresa;
- tipo de operacao;
- servicos realizados;
- regras de retorno;
- usuarios;
- tema inicial;
- resumo final;
- validacoes visuais.

Aceite:

- usuario chega ao painel com configuracao coerente;
- campos opcionais nao bloqueiam o cadastro;
- resumo final mostra o que foi configurado.

## P2 - Backend e Arquitetura

### T09 - Definir backend e banco

Objetivo:

- escolher stack de backend e persistencia para sair dos mocks.

Escopo:

- modelo multiempresa;
- autenticacao;
- autorizacao por perfil;
- banco relacional recomendado;
- schema inicial;
- API para entidades centrais;
- estrategia de deploy.

Aceite:

- proposta tecnica documentada;
- entidades centrais mapeadas;
- plano de migracao de mocks para API.

### T10 - Implementar persistencia real do fluxo de OS

Objetivo:

- persistir o fluxo principal antes de implementar modulos secundarios.

Escopo:

- clientes;
- veiculos;
- produtos;
- OS;
- itens da OS;
- movimentacao de estoque;
- retorno programado.

Aceite:

- finalizar OS grava historico;
- estoque baixa de verdade;
- retorno e criado;
- dashboard le dados persistidos.

## P2 - Qualidade e Entrega

### T11 - Adicionar testes de navegador

Objetivo:

- validar fluxos reais em browser.

Escopo:

- instalar/configurar Playwright quando ambiente permitir;
- smoke de rotas principais;
- fluxo busca placa;
- fluxo nova OS;
- fluxo mobile;
- screenshot em desktop e mobile.

Aceite:

- testes rodam em CI/local;
- falhas visuais basicas sao detectadas;
- docs explicam como rodar.

### T12 - Preparar deploy

Objetivo:

- deixar aplicacao pronta para hospedagem publica.

Escopo:

- definir destino de deploy;
- configurar build se migrar para bundler;
- documentar variaveis;
- revisar cache/assets;
- criar checklist de release.

Aceite:

- outro agente consegue publicar seguindo docs;
- `README.md` tem instrucoes suficientes;
- branch `main` representa estado deployavel.

### T13 - Vetorizar ou otimizar qualquer imagem usada no site

Objetivo:

- impedir que imagens pesadas ou rasterizadas prejudiquem a qualidade visual e o carregamento do site.

Escopo:

- qualquer imagem nova usada na interface deve passar por vetorizacao, simplificacao, compressao ou formatacao adequada antes de entrar no repo;
- manter consistencia visual entre boards, mockups e elementos de produto;
- preferir assets leves e nativos do sistema quando possivel;
- documentar a origem e o tratamento de cada imagem usada no site.

Aceite:

- nenhuma imagem entra no site sem passar por verificacao de peso, nitidez e adequacao ao layout;
- o site nao fica dependente de assets enormes sem necessidade;
- a documentacao deixa claro quais imagens sao referencia, quais sao assets finais e quais foram vetorizadas ou otimizadas.

## Proxima Ordem Recomendada

1. T01 - Refinar nova OS.
2. T03 - Melhorar mobile operacional.
3. T04 - Evoluir retornos e mensagens.
4. T05 - Evoluir estoque e notas.
5. T02 - Criar estados completos por tela.
6. T09 - Definir backend e banco.
7. T13 - Vetorizar ou otimizar qualquer imagem usada no site.

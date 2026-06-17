# PDFRápido — Plano de Tarefas (Task Plan)

Este documento descreve as fases planejadas para colocar a aplicação em pleno funcionamento e testar todos os cenários.

## Checklist Geral

### Fase 1: V - Visão (Lógica e Configuração Inicial)
* [x] Identificar e configurar arquivos `.env`
* [x] Corrigir caminhos `/tmp/` para `os.tmpdir()` nos arquivos de serviço
* [x] Substituir dependências externas (Ghostscript, pdftotext) por `pdfjs-dist` e `canvas`

### Fase 2: L - Link (Verificação de Conectividade)
* [x] Iniciar e testar container local do Redis
* [x] Garantir que o Redis esteja acessível na porta 6379

### Fase 3: A - Arquitetura (Compilação e Execução)
* [x] Verificar e compilar o código do backend (`apps/api`)
* [x] Iniciar a API em modo de desenvolvimento (`npm run dev`)
* [x] Iniciar o Frontend em modo de desenvolvimento (`npm run dev`)
* [x] Testar a conexão API <-> Frontend

### Fase 4: E - Estilo (Validação de UI/UX)
* [x] Abrir e inspecionar a interface do frontend via navegador
* [x] Validar design limpo, mobile-first e aplicação correta do Tailwind CSS (resolvido com o PostCSS)

### Fase 5: G - Gatilho (Testes de Fluxo Completo)
* [x] Realizar teste prático de compressão de PDF
* [x] Realizar teste prático de PDF para Word
* [x] Realizar teste prático de PDF para JPG
* [x] Documentar resultados e finalização no Log de Manutenção

### Fase 6: Deploy e Monetização (Google Cloud Run + AdSense)
* [x] Criar arquivos Dockerfile multi-stage standalone e .dockerignore para API e Frontend
* [x] Gerar templates `.env.production` com as portas e URLs adequadas
* [x] Criar arquivo `ads.txt` do AdSense e `robots.txt` para indexação
* [x] Criar scripts de deploy automatizados em shell (`deploy.sh`) e PowerShell (`deploy.ps1`)
* [x] Corrigir erros de tipagem do TypeScript e testar compilação de produção local
* [x] Fazer o upload do repositório no GitHub (`main`) usando o token de acesso pessoal
* [ ] Executar script de deploy no Google Cloud Run (opcional, exige cartão/faturamento)

### Fase 7: Deploy Alternativo 100% Gratuito (Sem Cartão de Crédito)
* [x] Conectar Frontend Next.js na Vercel (grátis) apontando para o diretório `apps/web`
* [x] Conectar Backend Node.js na Render (grátis) apontando para o diretório `apps/api`
* [x] Configurar variáveis de ambiente na Vercel e na Render

### Fase 8: Refinamento de UI/UX e Visual Profissional
* [x] Criar componente de Logo SVG moderno e estilizado (`Logo.tsx`)
* [x] Unificar os componentes `Header.tsx` e `Footer.tsx` e aplicar em todas as páginas
* [x] Ajustar placeholders de publicidade (`AdUnit.tsx`) para um visual minimalista e profissional
* [x] Testar compilação Next.js localmente e realizar push para produção (deploy automático)




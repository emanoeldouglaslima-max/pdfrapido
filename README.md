# PDFRápido — Ferramentas de PDF Online Grátis

Site de ferramentas de PDF com SEO e monetização via Google AdSense.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Node.js 20 + Express + TypeScript |
| Fila de jobs | Bull + Redis |
| Processamento PDF | pdf-lib, pdf2pic, sharp, LibreOffice |
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Banco | Firebase Firestore (estatísticas) |
| Deploy API | Google Cloud Run |
| Deploy Web | Firebase Hosting |

## Estrutura

```
pdfrápido/
├── apps/
│   ├── api/          # Backend Express
│   └── web/          # Frontend Next.js
└── docker-compose.yml
```

## Rodar localmente

### Pré-requisitos
- Node.js 20+
- Docker e Docker Compose
- Redis (ou use o Docker Compose)

### Backend

```bash
cd apps/api
cp .env.example .env
# Edite o .env com suas credenciais

npm install
npm run dev
# API rodando em http://localhost:8080
```

### Frontend

```bash
cd apps/web
cp .env.local.example .env.local
# Edite com sua URL de API e chaves do AdSense

npm install
npm run dev
# Site rodando em http://localhost:3000
```

### Com Docker Compose (recomendado)

```bash
# Na raiz do projeto
docker-compose up
```

Isso sobe a API + Redis automaticamente.

## Deploy

### Backend — Google Cloud Run

```bash
cd apps/api

# Build e push da imagem
gcloud builds submit --tag gcr.io/SEU_PROJETO/pdfrápido-api

# Deploy no Cloud Run
gcloud run deploy pdfrápido-api \
  --image gcr.io/SEU_PROJETO/pdfrápido-api \
  --platform managed \
  --region southamerica-east1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,REDIS_URL=redis://... \
  --memory 1Gi \
  --concurrency 50
```

### Frontend — Firebase Hosting

```bash
cd apps/web

npm run build

# Instalar Firebase CLI se necessário
npm install -g firebase-tools

firebase login
firebase deploy --only hosting
```

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | /api/compress | Comprimir PDF |
| POST | /api/pdf-to-word | PDF → Word |
| POST | /api/pdf-to-jpg | PDF → JPG |
| POST | /api/word-to-pdf | Word → PDF |
| POST | /api/jpg-to-pdf | Imagens → PDF |
| POST | /api/merge | Juntar PDFs |
| POST | /api/split | Dividir PDF |
| GET | /api/status/:jobId | Status do job |
| GET | /api/download/:jobId | Baixar resultado |
| GET | /api/stats | Stats do dia |
| GET | /health | Health check |

## Testes

```bash
cd apps/api
npm test
```

## Páginas SEO

| URL | Keyword principal |
|-----|------------------|
| / | ferramentas pdf online grátis |
| /comprimir-pdf | comprimir pdf online grátis |
| /converter-pdf-para-word | converter pdf para word |
| /converter-pdf-para-jpg | converter pdf para jpg |
| /converter-word-para-pdf | converter word para pdf |
| /converter-jpg-para-pdf | imagem para pdf |
| /juntar-pdf | juntar pdf online |
| /dividir-pdf | dividir pdf online |

## Monetização AdSense

Cada página tem 3 slots de anúncio:
- **Above fold**: banner 728×90 acima da ferramenta
- **In-article**: anúncio fluido no meio do conteúdo
- **Footer**: anúncio responsivo no final

Configure os slots em `.env.local` após criar as unidades de anúncio no painel do AdSense.

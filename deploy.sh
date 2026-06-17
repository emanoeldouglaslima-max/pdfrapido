#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# PDFRápido — Script de Deploy para Google Cloud Run
# ═══════════════════════════════════════════════════════════════════════════════
#
# ANTES DE EXECUTAR:
# 1. Instale o Google Cloud CLI: https://cloud.google.com/sdk/docs/install
# 2. Faça login: gcloud auth login
# 3. Crie um projeto: gcloud projects create pdfrapido-prod
# 4. Configure o projeto: gcloud config set project pdfrapido-prod
# 5. Ative o billing: https://console.cloud.google.com/billing
# 6. Ative as APIs necessárias:
#    gcloud services enable cloudbuild.googleapis.com run.googleapis.com artifactregistry.googleapis.com
#
# USO:
#   chmod +x deploy.sh
#   ./deploy.sh              # Deploy de tudo (API + Frontend)
#   ./deploy.sh api          # Deploy apenas da API
#   ./deploy.sh web          # Deploy apenas do Frontend
#
# ═══════════════════════════════════════════════════════════════════════════════

set -e

# ─── Configurações ────────────────────────────────────────────────────────────
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)
REGION="southamerica-east1"  # São Paulo — menor latência para Brasil

# Nomes dos serviços
API_SERVICE="pdfrapido-api"
WEB_SERVICE="pdfrapido-web"

# Domínio de produção (altere para o seu domínio)
SITE_URL="https://pdfrapido.com.br"

echo "════════════════════════════════════════════════════"
echo "  PDFRápido — Deploy para Google Cloud Run"
echo "  Projeto: $PROJECT_ID"
echo "  Região:  $REGION"
echo "════════════════════════════════════════════════════"

# ─── Deploy da API ────────────────────────────────────────────────────────────
deploy_api() {
  echo ""
  echo "🚀 Fazendo deploy da API..."
  echo "──────────────────────────────────────────────────"

  cd apps/api

  gcloud run deploy $API_SERVICE \
    --source . \
    --port 8080 \
    --region $REGION \
    --allow-unauthenticated \
    --memory 1Gi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 5 \
    --timeout 120 \
    --concurrency 80 \
    --set-env-vars "NODE_ENV=production" \
    --set-env-vars "PORT=8080" \
    --set-env-vars "CORS_ORIGIN=$SITE_URL" \
    --set-env-vars "MAX_FILE_SIZE_MB=25" \
    --set-env-vars "RATE_LIMIT_PER_HOUR=50" \
    --set-env-vars "REDIS_URL="

  API_URL=$(gcloud run services describe $API_SERVICE --region $REGION --format='value(status.url)')

  echo ""
  echo "✅ API deployada com sucesso!"
  echo "   URL: $API_URL"

  cd ../..
}

# ─── Deploy do Frontend ──────────────────────────────────────────────────────
deploy_web() {
  # Pegar a URL da API já deployada
  API_URL=$(gcloud run services describe $API_SERVICE --region $REGION --format='value(status.url)' 2>/dev/null || echo "")

  if [ -z "$API_URL" ]; then
    echo "⚠️  API ainda não deployada. Deploy a API primeiro: ./deploy.sh api"
    exit 1
  fi

  echo ""
  echo "🚀 Fazendo deploy do Frontend..."
  echo "   API_URL: $API_URL"
  echo "──────────────────────────────────────────────────"

  cd apps/web

  # Build com as variáveis de ambiente injetadas via ARGs
  gcloud run deploy $WEB_SERVICE \
    --source . \
    --port 3000 \
    --region $REGION \
    --allow-unauthenticated \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --timeout 60 \
    --concurrency 200 \
    --set-env-vars "HOSTNAME=0.0.0.0" \
    --build-arg "NEXT_PUBLIC_API_URL=$API_URL" \
    --build-arg "NEXT_PUBLIC_SITE_URL=$SITE_URL" \
    --build-arg "NEXT_PUBLIC_ADSENSE_ID=${ADSENSE_ID:-}" \
    --build-arg "NEXT_PUBLIC_GSC_VERIFICATION=${GSC_VERIFICATION:-}"

  WEB_URL=$(gcloud run services describe $WEB_SERVICE --region $REGION --format='value(status.url)')

  echo ""
  echo "✅ Frontend deployado com sucesso!"
  echo "   URL: $WEB_URL"

  cd ../..
}

# ─── Executar ─────────────────────────────────────────────────────────────────
case "${1:-all}" in
  api)
    deploy_api
    ;;
  web)
    deploy_web
    ;;
  all)
    deploy_api
    deploy_web
    echo ""
    echo "════════════════════════════════════════════════════"
    echo "  🎉 Deploy completo!"
    echo ""
    echo "  Frontend: $(gcloud run services describe $WEB_SERVICE --region $REGION --format='value(status.url)')"
    echo "  API:      $(gcloud run services describe $API_SERVICE --region $REGION --format='value(status.url)')"
    echo ""
    echo "  PRÓXIMOS PASSOS:"
    echo "  1. Compre um domínio (ex: pdfrapido.com.br)"
    echo "  2. Aponte o domínio para o Cloud Run:"
    echo "     gcloud run domain-mappings create --service $WEB_SERVICE --domain pdfrapido.com.br --region $REGION"
    echo "  3. Cadastre-se no Google AdSense: https://adsense.google.com"
    echo "  4. Atualize o ads.txt com seu Publisher ID"
    echo "  5. Reconfigure o deploy do frontend com ADSENSE_ID:"
    echo "     ADSENSE_ID=ca-pub-XXXX ./deploy.sh web"
    echo "════════════════════════════════════════════════════"
    ;;
  *)
    echo "Uso: ./deploy.sh [api|web|all]"
    exit 1
    ;;
esac

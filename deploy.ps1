# ═══════════════════════════════════════════════════════════════════════════════
# PDFRápido — Script de Deploy para Google Cloud Run (PowerShell/Windows)
# ═══════════════════════════════════════════════════════════════════════════════
#
# ANTES DE EXECUTAR:
# 1. Instale o Google Cloud CLI: https://cloud.google.com/sdk/docs/install
# 2. Faça login: gcloud auth login
# 3. Crie um projeto: gcloud projects create pdfrapido-prod
# 4. Configure o projeto: gcloud config set project pdfrapido-prod
# 5. Ative o billing no Console do Google Cloud
# 6. Ative as APIs:
#    gcloud services enable cloudbuild.googleapis.com run.googleapis.com artifactregistry.googleapis.com
#
# USO:
#   .\deploy.ps1              # Deploy de tudo (API + Frontend)
#   .\deploy.ps1 -Target api  # Deploy apenas da API
#   .\deploy.ps1 -Target web  # Deploy apenas do Frontend
#
# ═══════════════════════════════════════════════════════════════════════════════

param(
    [ValidateSet("all", "api", "web")]
    [string]$Target = "all"
)

$ErrorActionPreference = "Stop"

# ─── Configurações ────────────────────────────────────────────────────────────
$PROJECT_ID = gcloud config get-value project 2>$null
$REGION = "southamerica-east1"  # São Paulo

$API_SERVICE = "pdfrapido-api"
$WEB_SERVICE = "pdfrapido-web"
$SITE_URL = "https://pdfrapido.com.br"

Write-Host "════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  PDFRápido — Deploy para Google Cloud Run" -ForegroundColor Cyan
Write-Host "  Projeto: $PROJECT_ID" -ForegroundColor Cyan
Write-Host "  Região:  $REGION" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════" -ForegroundColor Cyan

# ─── Deploy da API ────────────────────────────────────────────────────────────
function Deploy-Api {
    Write-Host "`n🚀 Fazendo deploy da API..." -ForegroundColor Yellow

    Push-Location "apps\api"

    gcloud run deploy $API_SERVICE `
        --source . `
        --port 8080 `
        --region $REGION `
        --allow-unauthenticated `
        --memory 1Gi `
        --cpu 1 `
        --min-instances 0 `
        --max-instances 5 `
        --timeout 120 `
        --concurrency 80 `
        --set-env-vars "NODE_ENV=production" `
        --set-env-vars "PORT=8080" `
        --set-env-vars "CORS_ORIGIN=$SITE_URL" `
        --set-env-vars "MAX_FILE_SIZE_MB=25" `
        --set-env-vars "RATE_LIMIT_PER_HOUR=50" `
        --set-env-vars "REDIS_URL="

    $script:API_URL = gcloud run services describe $API_SERVICE --region $REGION --format='value(status.url)'

    Write-Host "`n✅ API deployada com sucesso!" -ForegroundColor Green
    Write-Host "   URL: $script:API_URL" -ForegroundColor Green

    Pop-Location
}

# ─── Deploy do Frontend ──────────────────────────────────────────────────────
function Deploy-Web {
    $script:API_URL = gcloud run services describe $API_SERVICE --region $REGION --format='value(status.url)' 2>$null

    if (-not $script:API_URL) {
        Write-Host "⚠️  API ainda não deployada. Execute: .\deploy.ps1 -Target api" -ForegroundColor Red
        exit 1
    }

    Write-Host "`n🚀 Fazendo deploy do Frontend..." -ForegroundColor Yellow
    Write-Host "   API_URL: $script:API_URL" -ForegroundColor Yellow

    Push-Location "apps\web"

    $ADSENSE_ID = $env:ADSENSE_ID
    $GSC_VERIFICATION = $env:GSC_VERIFICATION

    gcloud run deploy $WEB_SERVICE `
        --source . `
        --port 3000 `
        --region $REGION `
        --allow-unauthenticated `
        --memory 512Mi `
        --cpu 1 `
        --min-instances 0 `
        --max-instances 10 `
        --timeout 60 `
        --concurrency 200 `
        --set-env-vars "HOSTNAME=0.0.0.0" `
        --build-arg "NEXT_PUBLIC_API_URL=$script:API_URL" `
        --build-arg "NEXT_PUBLIC_SITE_URL=$SITE_URL" `
        --build-arg "NEXT_PUBLIC_ADSENSE_ID=$ADSENSE_ID" `
        --build-arg "NEXT_PUBLIC_GSC_VERIFICATION=$GSC_VERIFICATION"

    $WEB_URL = gcloud run services describe $WEB_SERVICE --region $REGION --format='value(status.url)'

    Write-Host "`n✅ Frontend deployado com sucesso!" -ForegroundColor Green
    Write-Host "   URL: $WEB_URL" -ForegroundColor Green

    Pop-Location
}

# ─── Executar ─────────────────────────────────────────────────────────────────
switch ($Target) {
    "api" { Deploy-Api }
    "web" { Deploy-Web }
    "all" {
        Deploy-Api
        Deploy-Web

        $WEB_URL = gcloud run services describe $WEB_SERVICE --region $REGION --format='value(status.url)'

        Write-Host "`n════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host "  🎉 Deploy completo!" -ForegroundColor Green
        Write-Host ""
        Write-Host "  Frontend: $WEB_URL" -ForegroundColor Green
        Write-Host "  API:      $script:API_URL" -ForegroundColor Green
        Write-Host ""
        Write-Host "  PRÓXIMOS PASSOS:" -ForegroundColor Yellow
        Write-Host "  1. Compre um domínio (ex: pdfrapido.com.br)" -ForegroundColor White
        Write-Host "  2. Aponte o domínio para o Cloud Run:" -ForegroundColor White
        Write-Host "     gcloud run domain-mappings create --service $WEB_SERVICE --domain pdfrapido.com.br --region $REGION"
        Write-Host "  3. Cadastre-se no Google AdSense: https://adsense.google.com" -ForegroundColor White
        Write-Host "  4. Atualize o ads.txt com seu Publisher ID" -ForegroundColor White
        Write-Host "  5. Reconfigure o deploy do frontend com ADSENSE_ID:" -ForegroundColor White
        Write-Host '     $env:ADSENSE_ID="ca-pub-XXXX"; .\deploy.ps1 -Target web'
        Write-Host "════════════════════════════════════════════════════" -ForegroundColor Green
    }
}

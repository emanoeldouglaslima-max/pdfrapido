# ─── Build Stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY next.config.js tailwind.config.js postcss.config.js tsconfig.json ./
COPY app ./app
COPY components ./components
COPY public ./public

# Variáveis de build — serão substituídas no deploy
ARG NEXT_PUBLIC_API_URL=https://api.pdfrapido.com.br
ARG NEXT_PUBLIC_SITE_URL=https://pdfrapido.com.br
ARG NEXT_PUBLIC_ADSENSE_ID=
ARG NEXT_PUBLIC_GSC_VERIFICATION=

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_ADSENSE_ID=$NEXT_PUBLIC_ADSENSE_ID
ENV NEXT_PUBLIC_GSC_VERIFICATION=$NEXT_PUBLIC_GSC_VERIFICATION

RUN npm run build

# ─── Production Stage ─────────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Copiar output standalone do Next.js
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Usuário não-root
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup
USER appuser

# Cloud Run usa a variável PORT (padrão 3000)
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["node", "server.js"]

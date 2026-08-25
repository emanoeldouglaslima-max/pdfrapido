// apps/web/lib/analytics.ts
// Utilitário de telemetria e eventos para Google Analytics 4 (GA4)

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Envia um evento genérico para o Google Analytics
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
    } catch {
      // Silencioso em caso de bloqueio por adblockers
    }
  }
}

/**
 * Evento: Arquivo selecionado/enviado para upload
 */
export function trackFileUpload(toolSlug: string, fileCount: number = 1, totalSizeBytes?: number) {
  trackEvent('file_uploaded', {
    tool: toolSlug,
    file_count: fileCount,
    total_size_bytes: totalSizeBytes,
  });
}

/**
 * Evento: Início do processamento da ferramenta
 */
export function trackToolStart(toolSlug: string, options?: Record<string, unknown>) {
  trackEvent('tool_started', {
    tool: toolSlug,
    ...options,
  });
}

/**
 * Evento: Conclusão com sucesso do processamento da ferramenta
 */
export function trackToolComplete(toolSlug: string, durationMs?: number) {
  trackEvent('tool_completed', {
    tool: toolSlug,
    duration_ms: durationMs,
  });
}

/**
 * Evento: Download do arquivo final processado
 */
export function trackDownload(toolSlug: string, fileName?: string) {
  trackEvent('file_downloaded', {
    tool: toolSlug,
    file_name: fileName,
  });
}

/**
 * Evento: Clique em Call-to-Action (CTA) importante
 */
export function trackCtaClick(ctaName: string, destinationUrl?: string) {
  trackEvent('cta_clicked', {
    cta_name: ctaName,
    destination: destinationUrl,
  });
}

/**
 * Atualiza as permissões no Google Consent Mode v2
 */
export function trackConsentUpdate(analyticsGranted: boolean, marketingGranted: boolean) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('consent', 'update', {
        analytics_storage: analyticsGranted ? 'granted' : 'denied',
        ad_storage: marketingGranted ? 'granted' : 'denied',
        ad_user_data: marketingGranted ? 'granted' : 'denied',
        ad_personalization: marketingGranted ? 'granted' : 'denied',
      });
    } catch {
      // Silencioso
    }
  }
}

# PDFRápido — Constituição do Projeto

Constituição e diretrizes do projeto PDFRápido.com.br.

## Esquemas de Dados (Data Schemas)

### Payload de Entrada do Job (API - POST /api/jobs)
```json
{
  "type": "compress" | "pdf-to-word" | "pdf-to-jpg" | "word-to-pdf" | "jpg-to-pdf" | "merge" | "split",
  "files": [
    {
      "filename": "string",
      "path": "string"
    }
  ],
  "options": {
    "level": "baixo" | "medio" | "alto",
    "dpi": 150 | 300,
    "orientation": "portrait" | "landscape",
    "splitMode": "every" | "range" | "single",
    "splitPages": 1,
    "splitFrom": 1,
    "splitTo": 5,
    "splitPage": 1
  }
}
```

### Payload de Retorno do Job (API - GET /api/jobs/:id)
```json
{
  "id": "string",
  "type": "string",
  "status": "pending" | "processing" | "completed" | "failed",
  "progress": 0,
  "result": {
    "downloadUrl": "string",
    "filename": "string",
    "size": 123456
  },
  "error": "string"
}
```

## Regras Comportamentais do Sistema

1. **Sem Assinaturas / Paywalls**: O site deve ser 100% gratuito e direto ao ponto.
2. **Processamento sem Binários Externos**: A conversão e processamento devem funcionar sem requerer Ghostscript ou pdftotext externos no Windows local, usando apenas implementações baseadas em Node.js (`pdfjs-dist`, `canvas`, `pdf-lib`, `sharp`).
3. **Resiliência de Diretórios**: Usar `os.tmpdir()` em vez de `/tmp/` hardcoded para total compatibilidade com sistemas Windows e Unix.
4. **Resiliência do Firebase**: Se as credenciais do Firestore não forem configuradas no ambiente, o sistema de stats falhará graciosamente mantendo as operações principais ativas.
5. **Políticas de Retenção de Dados**: Arquivos temporários gerados durante o processamento devem ser deletados periodicamente (a cada 30 minutos via cron e no bootstrap do app).

## Invariantes Arquiteturais

* **Frontend**: Next.js + React. Aponta para a API em `PORT` (8080) a partir de variáveis de ambiente.
* **Backend**: Express + Bull/Redis. Fila local para orquestrar tarefas sem trancar o event-loop do Node.
* **Redis**: Canal de comunicação para Bull. Deve estar ativo na porta `6379`.

## Log de Manutenção

* **2026-06-17**: Inicialização e reconfiguração das dependências de conversão de imagens e extração de texto para usar `pdfjs-dist` e `canvas` (eliminação de dependência de Ghostscript e pdftotext locais no Windows).
* **2026-06-17**: Correção de todos os caminhos temporários (`/tmp/` -> `os.tmpdir()`).
* **2026-06-17**: Correção de imports de hooks no frontend.
* **2026-06-17**: Criação de `postcss.config.js` na raiz do frontend (`apps/web`) corrigindo a renderização do Tailwind CSS.
* **2026-06-17**: Implementação de teste de ping com timeout de 2s e chaveamento transparente/dinâmico para modo in-memory em `jobQueue.ts` quando o Redis local falhar ou estiver indisponível.
* **2026-06-17**: Realização de testes de integração de ponta a ponta com sucesso nos endpoints de Compressão, PDF para Word e PDF para JPG.
* **2026-06-17**: Criação da infraestrutura de Deploy no Google Cloud Run, com Dockerfiles otimizados multi-stage para a API e o Frontend standalone.
* **2026-06-17**: Configuração inicial de SEO e monetização, com a inclusão do `ads.txt` (Google AdSense) e `robots.txt` no frontend, além de variáveis de ambiente de produção.
* **2026-06-17**: Correção de erros de tipagem e imports do TypeScript no Frontend que impediam a geração do build estático (`sitemap.ts`, `[tool]/page.tsx` e `ProgressBar.tsx`), garantindo um build de produção standalone gerado sem erros.
* **2026-06-17**: Criação dos scripts automatizados de deploy `deploy.sh` (Unix) e `deploy.ps1` (PowerShell/Windows) facilitando o deploy final para o usuário.

import request from 'supertest';
import app from '../src/server';
import path from 'path';
import fs from 'fs';

// PDF de teste mínimo válido (1 página em branco)
const MINIMAL_PDF = Buffer.from(
  '%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n' +
  '2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n' +
  '3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R>>endobj\n' +
  'xref\n0 4\n0000000000 65535 f\n0000000009 00000 n\n' +
  '0000000058 00000 n\n0000000115 00000 n\n' +
  'trailer<</Size 4/Root 1 0 R>>\nstartxref\n190\n%%EOF'
);

// ── Compress ──────────────────────────────────────────────────────────────────
describe('POST /api/compress', () => {
  it('deve retornar jobId ao receber PDF válido', async () => {
    const res = await request(app)
      .post('/api/compress')
      .attach('file', MINIMAL_PDF, { filename: 'teste.pdf', contentType: 'application/pdf' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('jobId');
    expect(res.body).toHaveProperty('status', 'queued');
    expect(res.body).toHaveProperty('pollUrl');
  });

  it('deve retornar 400 ao receber arquivo não-PDF', async () => {
    const fakeFile = Buffer.from('isto nao eh um pdf');
    const res = await request(app)
      .post('/api/compress')
      .attach('file', fakeFile, { filename: 'fake.pdf', contentType: 'application/pdf' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('FILE_INVALID');
  });

  it('deve retornar 400 quando nenhum arquivo é enviado', async () => {
    const res = await request(app).post('/api/compress');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('FILE_MISSING');
  });

  it('deve retornar 413 para arquivo maior que 25MB', async () => {
    const bigFile = Buffer.alloc(26 * 1024 * 1024, 0);
    const res = await request(app)
      .post('/api/compress')
      .attach('file', bigFile, { filename: 'grande.pdf', contentType: 'application/pdf' });

    expect(res.status).toBe(413);
  });
});

// ── Status ────────────────────────────────────────────────────────────────────
describe('GET /api/status/:jobId', () => {
  it('deve retornar 404 para jobId inexistente', async () => {
    const res = await request(app).get('/api/status/job-que-nao-existe');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('JOB_NOT_FOUND');
  });

  it('deve retornar status válido para jobId existente', async () => {
    // Primeiro criar um job
    const uploadRes = await request(app)
      .post('/api/compress')
      .attach('file', MINIMAL_PDF, { filename: 'teste.pdf', contentType: 'application/pdf' });

    const { jobId } = uploadRes.body;

    const statusRes = await request(app).get(`/api/status/${jobId}`);
    expect(statusRes.status).toBe(200);
    expect(['queued', 'processing', 'done', 'failed']).toContain(statusRes.body.status);
  });
});

// ── Rate Limit ────────────────────────────────────────────────────────────────
describe('Rate Limiting', () => {
  it('deve retornar 429 após exceder o limite', async () => {
    const MAX = Number(process.env.RATE_LIMIT_PER_HOUR) || 10;

    // Fazer MAX + 1 requisições
    const requests = Array.from({ length: MAX + 1 }, () =>
      request(app)
        .post('/api/compress')
        .attach('file', MINIMAL_PDF, { filename: 'teste.pdf', contentType: 'application/pdf' })
    );

    const results = await Promise.all(requests);
    const tooMany = results.filter((r) => r.status === 429);
    expect(tooMany.length).toBeGreaterThan(0);
    expect(tooMany[0].body.error).toBe('RATE_LIMIT');
  });
});

// ── Health ────────────────────────────────────────────────────────────────────
describe('GET /health', () => {
  it('deve retornar 200 com status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

// ── Merge ─────────────────────────────────────────────────────────────────────
describe('POST /api/merge', () => {
  it('deve retornar 400 se apenas 1 arquivo for enviado', async () => {
    const res = await request(app)
      .post('/api/merge')
      .attach('files', MINIMAL_PDF, { filename: 'a.pdf', contentType: 'application/pdf' });

    expect(res.status).toBe(400);
  });

  it('deve aceitar 2 PDFs e retornar jobId', async () => {
    const res = await request(app)
      .post('/api/merge')
      .attach('files', MINIMAL_PDF, { filename: 'a.pdf', contentType: 'application/pdf' })
      .attach('files', MINIMAL_PDF, { filename: 'b.pdf', contentType: 'application/pdf' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('jobId');
  });
});

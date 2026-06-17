export const ErrorCodes = {
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  FILE_INVALID: 'FILE_INVALID',
  FILE_MISSING: 'FILE_MISSING',
  PROCESSING_FAILED: 'PROCESSING_FAILED',
  RATE_LIMIT: 'RATE_LIMIT',
  JOB_NOT_FOUND: 'JOB_NOT_FOUND',
  JOB_EXPIRED: 'JOB_EXPIRED',
  JOB_FAILED: 'JOB_FAILED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export const ErrorMessages: Record<ErrorCode, string> = {
  FILE_TOO_LARGE: 'O arquivo é muito grande. O limite é 25MB.',
  FILE_INVALID: 'Tipo de arquivo inválido ou arquivo corrompido.',
  FILE_MISSING: 'Nenhum arquivo foi enviado.',
  PROCESSING_FAILED: 'Erro ao processar o arquivo. Tente novamente.',
  RATE_LIMIT: 'Limite de requisições atingido. Tente novamente em 1 hora.',
  JOB_NOT_FOUND: 'Tarefa não encontrada. O link pode ter expirado.',
  JOB_EXPIRED: 'O arquivo expirou. Os arquivos ficam disponíveis por 30 minutos.',
  JOB_FAILED: 'O processamento falhou. Verifique se o arquivo não está corrompido.',
  INTERNAL_ERROR: 'Erro interno do servidor. Tente novamente em instantes.',
};

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: string;

  constructor(code: ErrorCode, statusCode = 500, details?: string) {
    super(ErrorMessages[code]);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'AppError';
  }
}

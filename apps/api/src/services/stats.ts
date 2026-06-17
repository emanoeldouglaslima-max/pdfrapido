import { logger } from '../middleware/logger';
import { JobType } from './jobQueue';

let firestoreDb: any = null;

export function initFirebase(): void {
  try {
    const admin = require('firebase-admin');

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
    }

    firestoreDb = admin.firestore();
    logger.info('Firebase Admin inicializado');
  } catch (err) {
    logger.warn('Firebase não configurado — stats desabilitadas', {
      error: (err as Error).message,
    });
    firestoreDb = null;
  }
}

// Registra uma conversão bem-sucedida no Firestore
export async function recordConversion(
  type: JobType,
  fileSizeMB: number
): Promise<void> {
  if (!firestoreDb) return;

  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const docRef = firestoreDb.collection('tool_stats').doc(`daily_${today}`);

    const fieldMap: Record<JobType, string> = {
      'compress': 'compress_count',
      'pdf-to-word': 'pdf_to_word_count',
      'pdf-to-jpg': 'pdf_to_jpg_count',
      'word-to-pdf': 'word_to_pdf_count',
      'jpg-to-pdf': 'jpg_to_pdf_count',
      'merge': 'merge_count',
      'split': 'split_count',
    };

    const admin = require('firebase-admin');
    const FieldValue = admin.firestore.FieldValue;

    await docRef.set(
      {
        [fieldMap[type]]: FieldValue.increment(1),
        total_files_processed: FieldValue.increment(1),
        total_mb_processed: FieldValue.increment(fileSizeMB),
        updated_at: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    // Não deixar erro de stats quebrar o fluxo principal
    logger.error('Erro ao registrar stats no Firestore', {
      error: (err as Error).message,
    });
  }
}

// Busca as stats do dia atual (usado pela homepage)
export async function getTodayStats(): Promise<Record<string, number>> {
  if (!firestoreDb) {
    return { total_files_processed: 0, total_mb_processed: 0 };
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const doc = await firestoreDb
      .collection('tool_stats')
      .doc(`daily_${today}`)
      .get();

    if (!doc.exists) return { total_files_processed: 0 };
    return doc.data() as Record<string, number>;
  } catch (err) {
    logger.error('Erro ao buscar stats', { error: (err as Error).message });
    return { total_files_processed: 0 };
  }
}

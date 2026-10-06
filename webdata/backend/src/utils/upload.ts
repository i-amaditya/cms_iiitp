/**
 * src/utils/upload.ts
 *
 * Multer & Sharp File Upload Utility (Section 5.6 & FIX #6)
 *
 * Rules:
 *   1. Allowed MIME types:
 *      - Images: image/jpeg, image/png, image/webp (Max 5MB) -> Auto-converted to WebP via Sharp
 *      - Documents: application/pdf (Max 20MB) -> Saved directly with is_pdf = true [FIX #6]
 *   2. File naming: sanitized crypto random prefix + original base name
 *   3. Storage path: local VPS disk in env.UPLOAD_DIR (Hostinger Cloud constraint)
 */

import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { env } from '../config/env';
import { logger } from './logger';

// Ensure upload directories exist
export const uploadRootDir = path.resolve(process.cwd(), env.UPLOAD_DIR);
export const imagesDir = path.join(uploadRootDir, 'images');
export const docsDir = path.join(uploadRootDir, 'documents');

if (!fs.existsSync(uploadRootDir)) fs.mkdirSync(uploadRootDir, { recursive: true });
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

// Multer memory storage (allows Sharp to process images before writing to disk)
const storage = multer.memoryStorage();

// File filter: accept only Images and PDFs
const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed types: JPEG, PNG, WebP, PDF.`));
  }
};

// Max size: 20MB (individual 5MB image check is enforced in processUploadedFile)
export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
    files: 1,
  },
});

export interface ProcessedFileResult {
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  storagePath: string;
  isPdf: boolean;
}

/**
 * Processes the uploaded file from multer's memory buffer:
 *   - If Image: Compresses & converts to WebP with Sharp (max width 2048px, quality 80), enforces 5MB limit.
 *   - If PDF: Writes to documents/ directory, sets is_pdf = true.
 */
export async function processUploadedFile(
  file: Express.Multer.File,
  context?: string
): Promise<ProcessedFileResult> {
  const isPdf = file.mimetype === 'application/pdf';
  const randomPrefix = crypto.randomBytes(8).toString('hex');
  const sanitizedOriginal = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
  const baseName = path.parse(sanitizedOriginal).name;

  if (isPdf) {
    // PDF validation: Max 20MB
    if (file.size > 20 * 1024 * 1024) {
      throw new Error('PDF file size exceeds the 20MB limit.');
    }

    const filename = `${randomPrefix}_${sanitizedOriginal}`;
    const storagePath = path.join(docsDir, filename);

    await fs.promises.writeFile(storagePath, file.buffer);

    const relativeUrl = `/uploads/documents/${filename}`;
    const fullUrl = `${env.UPLOAD_BASE_URL.replace(/\/uploads\/?$/, '')}${relativeUrl}`;

    logger.info('PDF uploaded and stored on disk', { filename, size: file.size, context });

    return {
      filename,
      originalName: file.originalname,
      mimeType: 'application/pdf',
      sizeBytes: file.size,
      url: fullUrl,
      storagePath,
      isPdf: true,
    };
  }

  // Image validation: Max 5MB raw
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Image file size exceeds the 5MB limit.');
  }

  // Optimize Image via Sharp -> Output WebP
  const outputFilename = `${randomPrefix}_${baseName}.webp`;
  const storagePath = path.join(imagesDir, outputFilename);

  const webpBuffer = await sharp(file.buffer)
    .resize({ width: 2048, withoutEnlargement: true }) // standard max resolution
    .webp({ quality: 80 })
    .toBuffer();

  await fs.promises.writeFile(storagePath, webpBuffer);

  const relativeUrl = `/uploads/images/${outputFilename}`;
  const fullUrl = `${env.UPLOAD_BASE_URL.replace(/\/uploads\/?$/, '')}${relativeUrl}`;

  logger.info('Image uploaded, optimized to WebP, and stored on disk', {
    originalFilename: file.originalname,
    outputFilename,
    originalSize: file.size,
    compressedSize: webpBuffer.length,
    context,
  });

  return {
    filename: outputFilename,
    originalName: file.originalname,
    mimeType: 'image/webp',
    sizeBytes: webpBuffer.length,
    url: fullUrl,
    storagePath,
    isPdf: false,
  };
}

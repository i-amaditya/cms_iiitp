import React, { useRef, useState } from 'react';
import { Upload, Check, Loader2, AlertCircle } from 'lucide-react';
import { uploadMedia } from '../api/media';

interface FileUploadInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  context?: string;
  helperText?: string;
  accept?: string;
}

export const FileUploadInput: React.FC<FileUploadInputProps> = ({
  value,
  onChange,
  label = 'File Attachment (URL or Upload)',
  placeholder = '/uploads/document.pdf or https://...',
  context,
  helperText = 'Upload a PDF (max 20MB) or Image (max 5MB), or enter an existing URL.',
  accept = '.pdf,image/*',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadError(null);
      setUploadSuccess(false);

      const res = await uploadMedia(file, context);
      onChange(res.file.url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'File upload failed';
      setUploadError(msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="form-group full-width">
      <label className="form-label">{label}</label>
      <div className="file-input-wrapper">
        <input
          type="text"
          className="form-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          className="upload-trigger-btn"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="spin-icon" />
              <span>Uploading...</span>
            </>
          ) : uploadSuccess ? (
            <>
              <Check size={16} color="#10b981" />
              <span>Uploaded!</span>
            </>
          ) : (
            <>
              <Upload size={16} />
              <span>Upload</span>
            </>
          )}
        </button>
      </div>

      {uploadError && (
        <div className="field-error">
          <AlertCircle size={14} />
          <span>{uploadError}</span>
        </div>
      )}

      {helperText && !uploadError && (
        <span className="field-helper">{helperText}</span>
      )}
    </div>
  );
};

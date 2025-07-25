import React, { useState, useRef } from "react";
import { X, Upload, File, AlertCircle } from "lucide-react";
import Button from "@/components/pure-components/Button";
import { useDocumentUpload } from "@/hooks/documents";
import { DocumentUploadRequest } from "@/types/documents";
import styles from "./DocumentUploadModal.module.scss";

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploading, uploadProgress, error, upload, setError } =
    useDocumentUpload();

  const handleFileSelect = (file: File) => {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const request: DocumentUploadRequest = {
        file: selectedFile,
        description: description.trim() || undefined,
      };

      await upload(request);

      // Reset form and close modal
      setSelectedFile(null);
      setDescription("");
      onUploadSuccess();
      onClose();
    } catch (err) {
      // Error is handled by the hook
      console.error("Upload failed:", err);
    }
  };

  const handleClose = () => {
    if (!uploading) {
      setSelectedFile(null);
      setDescription("");
      setError(null);
      onClose();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Upload Document</h3>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            disabled={uploading}
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {/* File Drop Zone */}
          <div
            className={`${styles.dropZone} ${
              dragActive ? styles.dragActive : ""
            } ${selectedFile ? styles.hasFile : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              className={styles.hiddenInput}
              onChange={handleFileInputChange}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.ppt,.pptx,.xls,.xlsx"
              disabled={uploading}
            />

            {selectedFile ? (
              <div className={styles.selectedFile}>
                <File size={32} className={styles.fileIcon} />
                <div className={styles.fileInfo}>
                  <div className={styles.fileName}>{selectedFile.name}</div>
                  <div className={styles.fileSize}>
                    {formatFileSize(selectedFile.size)}
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.dropZoneContent}>
                <Upload size={32} className={styles.uploadIcon} />
                <div className={styles.dropText}>
                  Drag and drop a file here or click to browse
                </div>
                <div className={styles.supportedTypes}>
                  Supported: PDF, DOC, DOCX, TXT, Images, Videos, Presentations
                </div>
                <div className={styles.maxSize}>Max size: 10MB</div>
              </div>
            )}
          </div>

          {/* Description Input */}
          <div className={styles.descriptionSection}>
            <label className={styles.label}>Description (optional)</label>
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for this document..."
              rows={3}
              disabled={uploading}
            />
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className={styles.progressSection}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <div className={styles.progressText}>
                Uploading... {uploadProgress}%
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className={styles.errorMessage}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadModal;

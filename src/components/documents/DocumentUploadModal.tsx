import React, { useState, useRef } from "react";
import { Upload, File, AlertCircle } from "lucide-react";
import { Modal, Button as BootstrapButton } from "react-bootstrap";
import Button from "@/components/pure-components/Button";
import { useDocumentUpload } from "@/hooks/documents";
import { DocumentUploadRequest } from "@/types/documents";
import classNames from "classnames";

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

  return (
    <Modal show={isOpen} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Upload Document</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* File Drop Zone */}
        <div
          className={classNames(
            "app-file-upload-dropzone p-4 text-center mb-3",
            {
              "border-primary": dragActive,
              "bg-light": selectedFile,
            }
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="visually-hidden"
            onChange={handleFileInputChange}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.ppt,.pptx,.xls,.xlsx"
            disabled={uploading}
          />

          {selectedFile ? (
            <div className="d-flex align-items-center gap-3">
              <File size={32} />
              <div>
                <div className="fw-medium">{selectedFile.name}</div>
                <div className="fs-sm text-muted">
                  {formatFileSize(selectedFile.size)}
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center gap-2">
              <Upload size={32} />
              <div className="fw-medium">
                Drag and drop a file here or click to browse
              </div>
              <div className="fs-sm text-muted">
                Supported: PDF, DOC, DOCX, TXT, Images, Videos, Presentations
              </div>
              <div className="fs-sm text-muted">Max size: 10MB</div>
            </div>
          )}
        </div>

        {/* Description Input */}
        <div className="mb-3">
          <label className="form-label fw-medium">Description (optional)</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description for this document..."
            rows={3}
            disabled={uploading}
          />
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mb-3">
            <div className="app-file-upload-progress">
              <div
                className="app-file-upload-progress-fill"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className="text-center mt-2 fs-sm">
              Uploading... {uploadProgress}%
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <BootstrapButton
          variant="outline-secondary"
          onClick={handleClose}
          disabled={uploading}
        >
          Cancel
        </BootstrapButton>
        <BootstrapButton
          variant="primary"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </BootstrapButton>
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentUploadModal;

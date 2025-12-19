import React, { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../Button";
import Typography from "../Typography";
import LoadingSpinner from "../LoadingSpinner";
import classNames from "classnames";

interface FileUploadProps {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFileSelect?: (files: File[]) => void;
  onFileUpload?: (files: File[]) => Promise<void>;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

interface FileUploadFormData {
  files: File[];
}

export const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label = "Upload Files",
  accept = "*/*",
  multiple = false,
  maxSize = 10, // 10MB default
  onFileSelect,
  onFileUpload,
  disabled = false,
  required = false,
  error,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<FileUploadFormData>();

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type if accept is specified
    if (accept !== "*/*") {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const fileExtension = `.${file.name.split(".").pop()}`;
      const fileType = file.type;

      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileExtension.toLowerCase() === type.toLowerCase();
        }
        return fileType.startsWith(type);
      });

      if (!isAccepted) {
        return `File type not allowed. Accepted types: ${accept}`;
      }
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert(`Validation errors:\n${errors.join("\n")}`);
      return;
    }

    setSelectedFiles(validFiles);
    setValue(name as keyof FileUploadFormData, validFiles);

    if (onFileSelect) {
      onFileSelect(validFiles);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to upload");
      return;
    }

    if (!onFileUpload) {
      console.warn("No upload handler provided");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      await onFileUpload(selectedFiles);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Reset form after successful upload
      setTimeout(() => {
        setSelectedFiles([]);
        setValue(name as keyof FileUploadFormData, []);
        setUploadProgress(0);
        setIsUploading(false);
      }, 1000);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      const validationError = validateFile(file);
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert(`Validation errors:\n${errors.join("\n")}`);
      return;
    }

    setSelectedFiles(validFiles);
    setValue(name as keyof FileUploadFormData, validFiles);

    if (onFileSelect) {
      onFileSelect(validFiles);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setValue(name as keyof FileUploadFormData, newFiles);

    if (onFileSelect) {
      onFileSelect(newFiles);
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
    <div>
      <Controller
        name={name as keyof FileUploadFormData}
        control={control}
        rules={{ required: required ? "This field is required" : false }}
        render={({ field }) => (
          <div>
            {label && (
              <Typography variant="p" className="fw-medium mb-2">
                {label}
                {required && <span className="text-danger ms-1">*</span>}
              </Typography>
            )}

            <div
              className={classNames(
                "app-file-upload-dropzone p-4 text-center",
                { "disabled": disabled }
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => !disabled && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileSelect}
                className="visually-hidden"
                disabled={disabled}
              />

              <div className="d-flex flex-column align-items-center gap-2">
                <div className="fs-1">📁</div>
                <Typography variant="p" className="mb-0">
                  Drag and drop files here or click to browse
                </Typography>
                <Typography variant="span" className="fs-sm text-muted">
                  Accepted types: {accept === "*/*" ? "All files" : accept}
                </Typography>
                <Typography variant="span" className="fs-sm text-muted">
                  Max size: {maxSize}MB
                </Typography>
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-3">
                <Typography variant="p" className="fw-medium mb-2">
                  Selected Files ({selectedFiles.length}):
                </Typography>
                {selectedFiles.map((file, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center p-2 mb-2 border rounded">
                    <div>
                      <Typography variant="p" className="mb-0 fw-medium">
                        {file.name}
                      </Typography>
                      <Typography variant="span" className="fs-sm text-muted">
                        {formatFileSize(file.size)}
                      </Typography>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={disabled}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {onFileUpload && selectedFiles.length > 0 && (
              <div className="mt-3">
                <Button
                  variant="primary"
                  onClick={handleUpload}
                  disabled={disabled || isUploading}
                  className="w-100"
                >
                  {isUploading ? (
                    <>
                      <LoadingSpinner />
                      Uploading... {uploadProgress}%
                    </>
                  ) : (
                    "Upload Files"
                  )}
                </Button>

                {isUploading && (
                  <div className="app-file-upload-progress mt-2">
                    <div
                      className="app-file-upload-progress-fill"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            )}

            {(error || errors[name as keyof FileUploadFormData]) && (
              <Typography variant="span" className="text-danger fs-sm d-block mt-2">
                {error || errors[name as keyof FileUploadFormData]?.message}
              </Typography>
            )}
          </div>
        )}
      />
    </div>
  );
};

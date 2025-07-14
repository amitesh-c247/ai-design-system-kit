export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  description?: string;
  fileName: string; // File name in storage
}

export interface DocumentUploadRequest {
  file: File;
  description?: string;
}

export interface DocumentsResponse {
  documents: Document[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DocumentUploadResponse {
  success: boolean;
  document: Document;
  message: string;
}

export interface DocumentDeleteResponse {
  success: boolean;
  message: string;
}

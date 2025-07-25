import { useState } from "react";
import { documentService } from "@/services/documents";
import { Document, DocumentUploadRequest } from "@/types/documents";

export const useDocuments = (
  page: number = 1,
  pageSize: number = 10,
  search?: string
) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await documentService.getDocuments(
        page,
        pageSize,
        search
      );
      setDocuments(response.documents);
      setTotal(response.total);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch documents"
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (request: DocumentUploadRequest) => {
    try {
      setLoading(true);
      const response = await documentService.uploadDocument(request);
      // Refresh documents after upload
      await fetchDocuments();
      return response;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload document"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      setLoading(true);
      const response = await documentService.deleteDocument(documentId);
      // Refresh documents after delete
      await fetchDocuments();
      return response;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete document"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const downloadDocument = async (documentId: string) => {
    try {
      await documentService.downloadDocument(documentId);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to download document"
      );
      throw err;
    }
  };

  return {
    documents,
    loading,
    error,
    total,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
    downloadDocument,
    setError,
  };
};

export const useDocumentUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = async (request: DocumentUploadRequest) => {
    try {
      setUploading(true);
      setError(null);
      setUploadProgress(0);

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

      const response = await documentService.uploadDocument(request);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Reset progress after a delay
      setTimeout(() => {
        setUploadProgress(0);
      }, 1000);

      return response;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to upload document"
      );
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    uploadProgress,
    error,
    upload,
    setError,
  };
};

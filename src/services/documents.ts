import {
  Document,
  DocumentUploadRequest,
  DocumentsResponse,
  DocumentUploadResponse,
  DocumentDeleteResponse,
} from "@/types/documents";

class DocumentService {
  private baseUrl = "/api/documents"; // Local API endpoint

  async getDocuments(
    page: number = 1,
    pageSize: number = 10,
    search?: string
  ): Promise<DocumentsResponse> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (search) {
        params.append("search", search);
      }

      const response = await fetch(`${this.baseUrl}?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error;
    }
  }

  async uploadDocument(
    request: DocumentUploadRequest
  ): Promise<DocumentUploadResponse> {
    try {
      const formData = new FormData();
      formData.append("file", request.file);
      formData.append("description", request.description || "");

      const response = await fetch(this.baseUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload document");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error uploading document:", error);
      throw error;
    }
  }

  async deleteDocument(documentId: string): Promise<DocumentDeleteResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${documentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  }

  async downloadDocument(documentId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${documentId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to download document");
      }

      // Get filename from Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `document_${documentId}`;

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement("a");
      a.href = url;
      a.download = filename;
      window.document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      window.document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading document:", error);
      throw error;
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  getFileIcon(type: string): string {
    if (type.includes("pdf")) return "📄";
    if (type.includes("word") || type.includes("document")) return "📝";
    if (type.includes("presentation")) return "📊";
    if (type.includes("spreadsheet") || type.includes("excel")) return "📈";
    if (type.includes("image")) return "🖼️";
    if (type.includes("video")) return "🎥";
    if (type.includes("audio")) return "🎵";
    return "📁";
  }
}

export const documentService = new DocumentService();

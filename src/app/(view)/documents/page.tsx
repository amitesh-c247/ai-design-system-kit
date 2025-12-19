"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import CardWrapper from "@/components/pure-components/CardWrapper";
import Button from "@/components/pure-components/Button";
import LoadingSpinner from "@/components/pure-components/LoadingSpinner";
import {
  FileText,
  Upload,
  Download,
  Search,
  Trash2,
  Calendar,
  FileIcon,
} from "lucide-react";
import { useDocuments } from "@/hooks/documents";
import { documentService } from "@/services/documents";
import DocumentUploadModal from "@/components/documents/DocumentUploadModal";
import { Document } from "@/types/documents";
import { confirmDialog } from "@/types/utils/swal";
import classNames from "classnames";

const DocumentsPage = () => {
  const t = useTranslations("common");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const {
    documents,
    loading,
    error,
    total,
    fetchDocuments,
    deleteDocument,
    downloadDocument,
    setError,
  } = useDocuments(currentPage, 10, searchTerm);

  // Fetch documents on component mount and when dependencies change
  useEffect(() => {
    fetchDocuments();
  }, [currentPage, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleUploadSuccess = () => {
    setToast({
      show: true,
      message: "Document uploaded successfully!",
      type: "success",
    });
    fetchDocuments(); // Refresh the documents list
  };

  const handleDelete = async (documentId: string, documentName: string) => {
    const confirmed = await confirmDialog({
      title: "Delete Document?",
      text: `Are you sure you want to delete "${documentName}"? This action cannot be undone.`,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      icon: "warning",
      confirmButtonColor: "#dc3545",
    });

    if (!confirmed) return;

    try {
      await deleteDocument(documentId);
      setToast({
        show: true,
        message: "Document deleted successfully!",
        type: "success",
      });
    } catch (err) {
      setToast({
        show: true,
        message: "Failed to delete document",
        type: "error",
      });
    }
  };

  const handleDownload = async (documentId: string) => {
    try {
      await downloadDocument(documentId);
      setToast({
        show: true,
        message: "Download started!",
        type: "success",
      });
    } catch (err) {
      setToast({
        show: true,
        message: "Failed to download document",
        type: "error",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  return (
    <div>
      <CardWrapper title="Documents">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex gap-2 align-items-center">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Upload size={16} className="me-2" />
              Upload Document
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="position-relative" style={{ maxWidth: "400px" }}>
            <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" style={{ zIndex: 1 }} />
            <input
              type="text"
              placeholder="Search documents..."
              className="form-control ps-5"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="alert alert-danger text-center mb-3">
            <p className="mb-2 fw-medium">Error: {error}</p>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={fetchDocuments}
            >
              Retry
            </Button>
          </div>
        )}

        {!loading && !error && (
          <>
            {documents.length === 0 ? (
              <div className="app-documents-grid d-flex align-items-center justify-content-center">
                <div className="text-center p-5 text-muted">
                  <FileText size={48} className="text-muted mb-3" />
                  <h3 className="fs-5 fw-semibold mb-2">
                    {searchTerm ? "No documents found" : "No documents yet"}
                  </h3>
                  <p className="mb-4">
                    {searchTerm
                      ? "Try adjusting your search terms."
                      : "Upload your first document to get started."}
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setIsUploadModalOpen(true)}
                  >
                    <Upload size={16} className="me-2" />
                    Upload Document
                  </Button>
                </div>
              </div>
            ) : (
              <div className="app-documents-list">
                {documents.map((document: Document) => (
                  <div key={document.id} className="app-document-card card shadow-sm">
                    <div className="card-body">
                      <div className="mb-3">
                        <span className="fs-2 d-block">
                          {documentService.getFileIcon(document.type)}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="fs-6 fw-semibold mb-2">
                          {document.name}
                        </div>

                        {document.description && (
                          <div className="app-document-description text-muted fs-sm mb-2">
                            {document.description}
                          </div>
                        )}

                        <div className="d-flex flex-column gap-1 fs-xs text-muted">
                          <span className="fw-medium">
                            {documentService.formatFileSize(document.size)}
                          </span>
                          <span className="d-flex align-items-center">
                            <Calendar size={12} className="me-1" />
                            {formatDate(document.uploadedAt)}
                          </span>
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="flex-grow-1"
                          onClick={() => handleDownload(document.id)}
                        >
                          <Download size={14} className="me-1" />
                          Download
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="flex-grow-1"
                          onClick={() => handleDelete(document.id, document.name)}
                        >
                          <Trash2 size={14} className="me-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {total > 10 && (
              <div className="d-flex justify-content-center align-items-center gap-3 mt-4 pt-4 border-top">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <span className="fs-sm text-muted fw-medium">
                  Page {currentPage} of {Math.ceil(total / 10)}
                </span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  disabled={currentPage >= Math.ceil(total / 10)}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {/* Toast Notification */}
        {toast.show && (
          <div className={classNames(
            "app-toast-notification alert",
            toast.type === "success" ? "alert-success" : "alert-danger"
          )}>
            {toast.message}
          </div>
        )}
      </CardWrapper>

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default DocumentsPage;

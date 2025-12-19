"use client";

import { useState } from "react";
import { Download, Upload, AlertCircle, CheckCircle, X } from "lucide-react";
import * as XLSX from "xlsx";
import Card from "@/components/pure-components/Card";
import Button from "@/components/pure-components/Button";
import Alert from "@/components/pure-components/Alert";
import Modal from "@/components/pure-components/Modal";
import Table from "@/components/pure-components/Table";
import classNames from "classnames";

export interface ValidationError {
  row: number;
  field: string;
  message: string;
  value: any;
}

export interface ImportResult {
  success: number;
  failed: number;
  errors: Array<{ row: number; error: string }>;
}

export interface BulkImportColumn {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: any, record?: any, index?: number) => React.ReactNode;
}

export interface BulkImportConfig<T> {
  templateData: T[];
  templateFileName: string;
  acceptedFileTypes: string;
  columns: BulkImportColumn[];
  validateData: (data: any[]) => { errors: ValidationError[]; valid: T[] };
  importData: (data: T[]) => Promise<ImportResult>;
}

interface BulkImportTemplateProps<T> {
  config: BulkImportConfig<T>;
}

const BulkImportTemplate = <T,>({ config }: BulkImportTemplateProps<T>) => {
  const [file, setFile] = useState<File | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [validData, setValidData] = useState<T[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet(config.templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, config.templateFileName);
  };

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setValidationErrors([]);
    setValidData([]);
    setImportResult(null);

    if (!uploadedFile.name.match(/\.(xlsx|xls|csv)$/)) {
      setValidationErrors([
        {
          row: 0,
          field: "file",
          message: "Please upload a valid Excel (.xlsx, .xls) or CSV file",
          value: uploadedFile.name,
        },
      ]);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          setValidationErrors([
            {
              row: 0,
              field: "file",
              message: "The file is empty or has no data",
              value: "Empty file",
            },
          ]);
          return;
        }

        const { errors, valid } = config.validateData(jsonData);
        setValidationErrors(errors);
        setValidData(valid);
      } catch (error) {
        setValidationErrors([
          {
            row: 0,
            field: "file",
            message:
              "Error reading file. Please ensure it's a valid Excel or CSV file.",
            value: "File read error",
          },
        ]);
      }
    };
    reader.readAsBinaryString(uploadedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleImport = async () => {
    if (validData.length === 0) return;

    setIsImporting(true);
    const result = await config.importData(validData);
    setImportResult(result);
    setIsImporting(false);
    setShowPreview(false);

    // Reset form if all imports were successful
    if (result.failed === 0) {
      setFile(null);
      setValidData([]);
      setValidationErrors([]);
    }
  };

  const errorColumns = [
    { title: "Row", dataIndex: "row", key: "row" },
    { title: "Field", dataIndex: "field", key: "field" },
    { title: "Message", dataIndex: "message", key: "message" },
    { title: "Value", dataIndex: "value", key: "value" },
  ];

  // Add this derived array for Table row keys
  const validationErrorsWithId = validationErrors.map((err) => ({
    ...err,
    id: `${err.row}-${err.field}`,
  }));

  // Add this derived array for preview Table row keys
  const validDataWithId = validData.map((item, index) => ({
    ...item,
    id: `preview-${index}`,
  }));

  return (
    <>
      <div className="app-bulk-import-content">
        {/* Template Download */}
        <Card>
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div className="flex-grow-1">
              <h2 className="h4 mb-2">Step 1: Download Template</h2>
              <p className="text-muted mb-0">
                Download the Excel template to ensure your data is in the
                correct format.
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={downloadTemplate}
              className="d-flex align-items-center gap-2"
            >
              <Download size={20} />
              Download Template
            </Button>
          </div>
        </Card>

        {/* File Upload */}
        <Card>
          <div className="mb-3">
            <h2 className="h4 mb-2">Step 2: Upload File</h2>
            <p className="text-muted mb-0">Upload your Excel or CSV file with data.</p>
          </div>

          <div
            className={classNames("app-bulk-import-upload-area", {
              "drag-active": dragActive,
            })}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload size={48} className="mb-3" />
            <h3 className="h5 mb-2">Drag & Drop your file here</h3>
            <p className="mb-3">or</p>
            <input
              type="file"
              accept={config.acceptedFileTypes}
              onChange={(e) =>
                e.target.files?.[0] && handleFileUpload(e.target.files[0])
              }
              className="visually-hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="btn btn-primary">
              Choose File
            </label>
          </div>

          {file && (
            <div className="app-bulk-import-file-info mt-3">
              <p className="mb-1">
                <strong>Selected file:</strong> {file.name}
              </p>
              <p className="mb-0">
                <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}
        </Card>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Card className="border-danger">
            <div className="mb-3">
              <h2 className="h5 text-danger d-flex align-items-center gap-2 mb-2">
                <AlertCircle size={20} />
                Validation Errors ({validationErrors.length})
              </h2>
              <p className="text-muted mb-0">Please fix the following errors before importing:</p>
            </div>
            <Table
              columns={errorColumns}
              dataSource={validationErrorsWithId}
              rowKey="id"
            />
          </Card>
        )}

        {/* Valid Data Preview */}
        {validData.length > 0 && (
          <Card className="border-success">
            <div className="mb-3">
              <h2 className="h5 text-success d-flex align-items-center gap-2 mb-2">
                <CheckCircle size={20} />
                Valid Data ({validData.length} records)
              </h2>
              <p className="text-muted mb-0">The following data is ready for import:</p>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="primary"
                onClick={() => setShowPreview(true)}
              >
                Preview Data
              </Button>
              <Button
                variant="success"
                onClick={handleImport}
                disabled={isImporting}
              >
                {isImporting ? "Importing..." : "Import Now"}
              </Button>
            </div>
          </Card>
        )}

        {/* Import Results */}
        {importResult && (
          <Card className="border-success">
            <div className="mb-3">
              <h2 className="h5 mb-0">Import Results</h2>
            </div>
            <div className="app-bulk-import-result-stats mb-3">
              <div className="text-success">
                <CheckCircle size={20} />
                <span>Successfully imported: {importResult.success}</span>
              </div>
              {importResult.failed > 0 && (
                <div className="text-danger">
                  <AlertCircle size={20} />
                  <span>Failed: {importResult.failed}</span>
                </div>
              )}
            </div>

            {importResult.errors.length > 0 && (
              <div className="app-bulk-import-error-details">
                <h3 className="h6 mb-2">Error Details:</h3>
                <ul className="mb-0">
                  {importResult.errors.map((error, index) => (
                    <li key={index}>
                      Row {error.row}: {error.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {importResult.success > 0 && (
              <Alert type="success" className="mt-3">
                Successfully imported {importResult.success} record(s)!
              </Alert>
            )}
          </Card>
        )}
      </div>

      {/* Preview Modal */}
      <Modal
        show={showPreview}
        onClose={() => setShowPreview(false)}
        size="lg"
        title="Preview Import Data"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowPreview(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleImport}
              disabled={isImporting}
            >
              {isImporting ? "Importing..." : "Import Data"}
            </Button>
          </>
        }
      >
        <p className="text-muted mb-3">
          Review the data before importing ({validData.length} records):
        </p>
        <div className="app-bulk-import-preview-table">
          <Table
            columns={config.columns}
            dataSource={validDataWithId}
            rowKey="id"
          />
        </div>
      </Modal>
    </>
  );
};

export default BulkImportTemplate;

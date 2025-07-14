"use client";

import { useState } from "react";
import {
  Upload,
  Download,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Button from "@/components/pure-components/Button";
import Card from "@/components/pure-components/Card";
import Alert from "@/components/pure-components/Alert";
import Modal from "@/components/pure-components/Modal";
import Table from "@/components/pure-components/Table";
import { useCreateFaqMutation } from "@/hooks/faq";
import * as XLSX from "xlsx";
import styles from "./styles.module.scss";

interface ImportError {
  row: number;
  field: string;
  message: string;
  value: any;
}

interface ImportData {
  title: string;
  description: string;
}

const BulkImportPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ImportError[]>([]);
  const [validData, setValidData] = useState<ImportData[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    success: number;
    failed: number;
  } | null>(null);

  const { mutate: createFaq } = useCreateFaqMutation();

  const downloadTemplate = () => {
    // Create template data
    const templateData = [
      {
        title: "What is your return policy?",
        description:
          "We offer a 30-day return policy for all items in original condition.",
      },
      {
        title: "How long does shipping take?",
        description: "Standard shipping takes 3-5 business days.",
      },
      {
        title: "What payment methods do you accept?",
        description:
          "We accept all major credit cards, PayPal, and bank transfers.",
      },
    ];

    // Create Excel workbook
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FAQ Template");

    // Set column widths
    const colWidths = [
      { wch: 50 }, // title
      { wch: 80 }, // description
    ];
    worksheet["!cols"] = colWidths;

    // Generate Excel file and download
    XLSX.writeFile(workbook, "faq_import_template.xlsx");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      console.log(
        "File uploaded:",
        uploadedFile.name,
        uploadedFile.type,
        uploadedFile.size
      );
      setFile(uploadedFile);
      setValidationErrors([]);
      setValidData([]);
      setShowPreview(false);
      setImportResult(null);
    }
  };

  const validateFile = async () => {
    if (!file) return;

    setIsValidating(true);
    setValidationErrors([]);
    setValidData([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      // Get first worksheet
      const firstSheetName = workbook.SheetNames[0];
      if (!firstSheetName) {
        setValidationErrors([
          {
            row: 0,
            field: "file",
            message: "No worksheets found in the file",
            value: "",
          },
        ]);
        setIsValidating(false);
        return;
      }

      const worksheet = workbook.Sheets[firstSheetName];
      if (!worksheet) {
        setValidationErrors([
          {
            row: 0,
            field: "file",
            message: "Unable to read worksheet data",
            value: "",
          },
        ]);
        setIsValidating(false);
        return;
      }

      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length < 2) {
        setValidationErrors([
          {
            row: 0,
            field: "file",
            message: "File must contain at least a header row and one data row",
            value: "",
          },
        ]);
        setIsValidating(false);
        return;
      }

      const headers = (jsonData[0] as string[]).map((h) =>
        h?.toString().trim()
      );
      const expectedHeaders = ["title", "description"];

      // Validate headers
      const missingHeaders = expectedHeaders.filter(
        (h) => !headers.includes(h)
      );
      if (missingHeaders.length > 0) {
        setValidationErrors([
          {
            row: 0,
            field: "headers",
            message: `Missing required columns: ${missingHeaders.join(", ")}`,
            value: headers.join(", "),
          },
        ]);
        setIsValidating(false);
        return;
      }

      const errors: ImportError[] = [];
      const data: ImportData[] = [];

      // Process data rows
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i] as any[];
        const rowData: any = {};

        headers.forEach((header, index) => {
          rowData[header] = row[index]?.toString().trim() || "";
        });

        // Skip empty rows
        if (!rowData.title && !rowData.description) {
          continue;
        }

        // Validate required fields
        if (!rowData.title?.trim()) {
          errors.push({
            row: i + 1,
            field: "title",
            message: "Title is required",
            value: rowData.title,
          });
        }
        if (!rowData.description?.trim()) {
          errors.push({
            row: i + 1,
            field: "description",
            message: "Description is required",
            value: rowData.description,
          });
        }

        if (errors.filter((e) => e.row === i + 1).length === 0) {
          data.push({
            title: rowData.title.trim(),
            description: rowData.description.trim(),
          });
        }
      }

      setValidationErrors(errors);
      setValidData(data);

      if (errors.length === 0) {
        setShowPreview(true);
      }
    } catch (error) {
      console.error("File validation error:", error);
      setValidationErrors([
        {
          row: 0,
          field: "file",
          message: `Error reading file: ${
            error instanceof Error ? error.message : "Unknown error"
          }. Please ensure it is a valid Excel or CSV file.`,
          value: "",
        },
      ]);
    }

    setIsValidating(false);
  };

  const handleImport = async () => {
    if (validData.length === 0) return;

    setIsImporting(true);
    let successCount = 0;
    let failedCount = 0;

    for (const item of validData) {
      try {
        await new Promise((resolve, reject) => {
          createFaq(item, {
            onSuccess: () => {
              successCount++;
              resolve(true);
            },
            onError: () => {
              failedCount++;
              reject();
            },
          });
        });
      } catch (error) {
        failedCount++;
      }
    }

    setImportResult({ success: successCount, failed: failedCount });
    setIsImporting(false);
    setShowPreview(false);

    if (successCount > 0) {
      setFile(null);
      setValidData([]);
    }
  };

  const errorColumns = [
    { key: "row", title: "Row", dataIndex: "row" },
    { key: "field", title: "Field", dataIndex: "field" },
    { key: "message", title: "Error Message", dataIndex: "message" },
    { key: "value", title: "Value", dataIndex: "value" },
  ];

  const previewColumns = [
    { key: "title", title: "Title", dataIndex: "title" },
    { key: "description", title: "Description", dataIndex: "description" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Bulk Import FAQ</h1>
        <p>Upload an Excel/CSV file to import multiple FAQ entries at once</p>
      </div>

      <div className={styles.content}>
        {/* Template Download */}
        <Card className={styles.templateCard}>
          <div className={styles.templateContent}>
            <FileSpreadsheet size={48} className={styles.templateIcon} />
            <div>
              <h3>Download Template</h3>
              <p>
                Download the template file to see the required format and
                columns
              </p>
            </div>
            <Button
              variant="outline"
              onClick={downloadTemplate}
              className={styles.downloadBtn}
            >
              <Download size={16} />
              Download Template
            </Button>
          </div>
        </Card>

        {/* File Upload */}
        <Card className={styles.uploadCard}>
          <div className={styles.uploadContent}>
            <div className={styles.uploadArea}>
              <Upload size={48} className={styles.uploadIcon} />
              <h3>Upload File</h3>
              <p>
                Select an Excel (.xlsx) or CSV file with title and description
                columns
              </p>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className={styles.fileInput}
                id="file-upload"
              />
              <label htmlFor="file-upload" className={styles.fileLabel}>
                Choose File
              </label>
              {file && (
                <div className={styles.fileInfo}>
                  <p>Selected: {file.name}</p>
                  <Button
                    onClick={validateFile}
                    disabled={isValidating}
                    className={styles.validateBtn}
                  >
                    {isValidating ? "Validating..." : "Validate File"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Validation Results */}
        {validationErrors.length > 0 && (
          <Card className={styles.errorCard}>
            <Alert type="error" className={styles.errorAlert}>
              <div className={styles.alertContent}>
                <AlertCircle size={20} />
                <div>
                  <h4>Validation Errors Found</h4>
                  <p>Please fix the following errors and try again:</p>
                </div>
              </div>
            </Alert>
            <Table
              columns={errorColumns}
              dataSource={validationErrors}
              rowKey={(record) => `${record.row}-${record.field}`}
              className={styles.errorTable}
            />
          </Card>
        )}

        {/* Success Message */}
        {validData.length > 0 &&
          validationErrors.length === 0 &&
          !showPreview && (
            <Card className={styles.successCard}>
              <Alert type="success" className={styles.successAlert}>
                <div className={styles.alertContent}>
                  <CheckCircle size={20} />
                  <div>
                    <h4>File Validated Successfully</h4>
                    <p>{validData.length} records are ready to import</p>
                  </div>
                  <Button onClick={() => setShowPreview(true)}>
                    Preview Data
                  </Button>
                </div>
              </Alert>
            </Card>
          )}

        {/* Import Result */}
        {importResult && (
          <Card className={styles.resultCard}>
            <Alert type={importResult.failed > 0 ? "warning" : "success"}>
              <div>
                <h4>Import Completed</h4>
                <p>
                  Successfully imported: {importResult.success} records
                  {importResult.failed > 0 &&
                    `, Failed: ${importResult.failed} records`}
                </p>
              </div>
            </Alert>
          </Card>
        )}
      </div>

      {/* Preview Modal */}
      <Modal
        show={showPreview}
        onClose={() => setShowPreview(false)}
        title="Preview Import Data"
        size="lg"
      >
        <div className={styles.previewContent}>
          <p>Review the data below before importing:</p>
          <Table
            columns={previewColumns}
            dataSource={validData}
            rowKey="title"
            className={styles.previewTable}
          />
          <div className={styles.previewActions}>
            <Button variant="secondary" onClick={() => setShowPreview(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={isImporting}
              className={styles.importBtn}
            >
              {isImporting
                ? "Importing..."
                : `Import ${validData.length} Records`}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BulkImportPage;

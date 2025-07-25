"use client";

import { useCreateFaqMutation } from "@/hooks/faq";
import {
  BulkImportTemplate,
  BulkImportConfig,
  ValidationError,
  ImportResult,
} from "@/components/bulk-import";
import CardWrapper from "@/components/pure-components/CardWrapper";

interface FaqImportData {
  title: string;
  description: string;
}

const BulkImportFaqPage = () => {
  const createFaqMutation = useCreateFaqMutation();

  const validateFaqData = (
    data: any[]
  ): { errors: ValidationError[]; valid: FaqImportData[] } => {
    const errors: ValidationError[] = [];
    const valid: FaqImportData[] = [];

    data.forEach((row, index) => {
      const rowNumber = index + 2; // +2 because Excel rows start at 1 and we have headers
      const validRow: Partial<FaqImportData> = {};

      // Validate title
      if (
        !row.title ||
        typeof row.title !== "string" ||
        row.title.trim().length === 0
      ) {
        errors.push({
          row: rowNumber,
          field: "title",
          message: "Title is required and must be a non-empty string",
          value: row.title,
        });
      } else if (row.title.trim().length < 5) {
        errors.push({
          row: rowNumber,
          field: "title",
          message: "Title must be at least 5 characters long",
          value: row.title,
        });
      } else {
        validRow.title = row.title.trim();
      }

      // Validate description
      if (
        !row.description ||
        typeof row.description !== "string" ||
        row.description.trim().length === 0
      ) {
        errors.push({
          row: rowNumber,
          field: "description",
          message: "Description is required and must be a non-empty string",
          value: row.description,
        });
      } else if (row.description.trim().length < 10) {
        errors.push({
          row: rowNumber,
          field: "description",
          message: "Description must be at least 10 characters long",
          value: row.description,
        });
      } else {
        validRow.description = row.description.trim();
      }

      // If all fields are valid, add to valid data
      if (validRow.title && validRow.description) {
        valid.push(validRow as FaqImportData);
      }
    });

    return { errors, valid };
  };

  const importFaqData = async (
    data: FaqImportData[]
  ): Promise<ImportResult> => {
    const results: ImportResult = {
      success: 0,
      failed: 0,
      errors: [],
    };

    for (let i = 0; i < data.length; i++) {
      try {
        await createFaqMutation.mutateAsync(data[i]);
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          row: i + 2,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    }

    return results;
  };

  const config: BulkImportConfig<FaqImportData> = {
    templateData: [
      {
        title: "What is your return policy?",
        description:
          "We offer a 30-day return policy for all unused items in original packaging.",
      },
      {
        title: "How do I track my order?",
        description:
          "You can track your order using the tracking number sent to your email after purchase.",
      },
      {
        title: "Do you offer international shipping?",
        description:
          "Yes, we ship internationally to most countries. Shipping costs vary by location.",
      },
    ],
    templateFileName: "faq_template.xlsx",
    acceptedFileTypes: ".xlsx,.xls,.csv",
    columns: [
      { title: "Title", dataIndex: "title", key: "title" },
      { title: "Description", dataIndex: "description", key: "description" },
    ],
    validateData: validateFaqData,
    importData: importFaqData,
  };

  return (
    <CardWrapper title="Bulk Import FAQ">
      <BulkImportTemplate config={config} />
    </CardWrapper>
  );
};

export default BulkImportFaqPage;

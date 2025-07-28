"use client";

import { useCreateUserMutation } from "@/hooks/user";
import {
  BulkImportTemplate,
  BulkImportConfig,
  ValidationError,
  ImportResult,
} from "@/components/bulk-import";
import CardWrapper from "@/components/pure-components/CardWrapper";

interface UserImportData {
  name: string;
  email: string;
  status: number; // 0 = Active, 1 = Inactive
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}

const BulkImportUsersPage = () => {
  const createUserMutation = useCreateUserMutation();

  const validateUserData = (
    data: any[]
  ): { errors: ValidationError[]; valid: UserImportData[] } => {
    const errors: ValidationError[] = [];
    const valid: UserImportData[] = [];

    data.forEach((row, index) => {
      const rowNumber = index + 2;
      const validRow: Partial<UserImportData> = {};

      if (
        !row.name ||
        typeof row.name !== "string" ||
        row.name.trim().length === 0
      ) {
        errors.push({
          row: rowNumber,
          field: "name",
          message: "Name is required",
          value: row.name,
        });
      } else {
        validRow.name = row.name.trim();
      }

      if (
        !row.email ||
        typeof row.email !== "string" ||
        !/^[^@]+@[^@]+\.[^@]+$/.test(row.email)
      ) {
        errors.push({
          row: rowNumber,
          field: "email",
          message: "Valid email is required",
          value: row.email,
        });
      } else {
        validRow.email = row.email.trim();
      }

      if (row.status !== 0 && row.status !== 1) {
        errors.push({
          row: rowNumber,
          field: "status",
          message: "Status must be 0 (Active) or 1 (Inactive)",
          value: row.status,
        });
      } else {
        validRow.status = Number(row.status);
      }

      if (
        validRow.name &&
        validRow.email &&
        typeof validRow.status === "number"
      ) {
        valid.push(validRow as UserImportData);
      }
    });

    return { errors, valid };
  };

  const importUserData = async (
    data: UserImportData[]
  ): Promise<ImportResult> => {
    const results: ImportResult = {
      success: 0,
      failed: 0,
      errors: [],
    };

    for (let i = 0; i < data.length; i++) {
      try {
        await createUserMutation.mutateAsync(data[i]);
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

  const config: BulkImportConfig<UserImportData> = {
    templateData: [
      { name: "Strong Man", email: "user4@yopmail.com", status: 0 },
      { name: "Jane Doe", email: "jane@example.com", status: 1 },
    ],
    templateFileName: "users_template.xlsx",
    acceptedFileTypes: ".xlsx,.xls,.csv",
    columns: [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Email", dataIndex: "email", key: "email" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: number) => (status === 0 ? "Active" : "Inactive"),
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date: string) => (date ? date : "-"),
      },
      {
        title: "Updated At",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (date: string) => (date ? date : "-"),
      },
    ],
    validateData: validateUserData,
    importData: importUserData,
  };

  return (
    <CardWrapper title="Bulk Import Users">
      <BulkImportTemplate config={config} />
    </CardWrapper>
  );
};

export default BulkImportUsersPage;

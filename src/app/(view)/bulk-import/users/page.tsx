"use client";

import { useCreateUserMutation } from "@/hooks/user";
import {
  BulkImportTemplate,
  BulkImportConfig,
  ValidationError,
  ImportResult,
} from "@/components/bulk-import";
import CardWrapper from "@/components/pure-components/CardWrapper";

interface VehicleMakeImportData {
  make: string;
  short_code: string;
  status: "ACTIVE" | "DISABLED";
}

const BulkImportUsersPage = () => {
  const createUserMutation = useCreateUserMutation();

  const validateVehicleMakeData = (
    data: any[]
  ): { errors: ValidationError[]; valid: VehicleMakeImportData[] } => {
    const errors: ValidationError[] = [];
    const valid: VehicleMakeImportData[] = [];

    data.forEach((row, index) => {
      const rowNumber = index + 2; // +2 because Excel rows start at 1 and we have headers
      const validRow: Partial<VehicleMakeImportData> = {};

      // Validate make
      if (
        !row.make ||
        typeof row.make !== "string" ||
        row.make.trim().length === 0
      ) {
        errors.push({
          row: rowNumber,
          field: "make",
          message: "Make is required and must be a non-empty string",
          value: row.make,
        });
      } else if (row.make.trim().length < 2) {
        errors.push({
          row: rowNumber,
          field: "make",
          message: "Make must be at least 2 characters long",
          value: row.make,
        });
      } else {
        validRow.make = row.make.trim();
      }

      // Validate short_code
      if (
        !row.short_code ||
        typeof row.short_code !== "string" ||
        row.short_code.trim().length === 0
      ) {
        errors.push({
          row: rowNumber,
          field: "short_code",
          message: "Short code is required and must be a non-empty string",
          value: row.short_code,
        });
      } else if (
        row.short_code.trim().length < 2 ||
        row.short_code.trim().length > 10
      ) {
        errors.push({
          row: rowNumber,
          field: "short_code",
          message: "Short code must be between 2 and 10 characters",
          value: row.short_code,
        });
      } else {
        validRow.short_code = row.short_code.trim().toUpperCase();
      }

      // Validate status
      if (!row.status || !["ACTIVE", "DISABLED"].includes(row.status)) {
        errors.push({
          row: rowNumber,
          field: "status",
          message: 'Status must be either "ACTIVE" or "DISABLED"',
          value: row.status,
        });
      } else {
        validRow.status = row.status as "ACTIVE" | "DISABLED";
      }

      // If all fields are valid, add to valid data
      if (validRow.make && validRow.short_code && validRow.status) {
        valid.push(validRow as VehicleMakeImportData);
      }
    });

    return { errors, valid };
  };

  const importVehicleMakeData = async (
    data: VehicleMakeImportData[]
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

  const config: BulkImportConfig<VehicleMakeImportData> = {
    templateData: [
      {
        make: "Toyota",
        short_code: "TYT",
        status: "ACTIVE",
      },
      {
        make: "Honda",
        short_code: "HND",
        status: "ACTIVE",
      },
      {
        make: "Ford",
        short_code: "FRD",
        status: "DISABLED",
      },
    ],
    templateFileName: "vehicle_makes_template.xlsx",
    acceptedFileTypes: ".xlsx,.xls,.csv",
    columns: [
      { title: "Make", dataIndex: "make", key: "make" },
      { title: "Short Code", dataIndex: "short_code", key: "short_code" },
      { title: "Status", dataIndex: "status", key: "status" },
    ],
    validateData: validateVehicleMakeData,
    importData: importVehicleMakeData,
  };

  return (
    <CardWrapper title="Bulk Import Vehicle Makes">
      <BulkImportTemplate config={config} />
    </CardWrapper>
  );
};

export default BulkImportUsersPage;

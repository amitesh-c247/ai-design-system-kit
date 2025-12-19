import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FileUpload } from "./FileUpload";
import Button from "../Button";
import Typography from "../Typography";

interface FormData {
  documents: File[];
  images: File[];
  singleFile: File[];
}

export const FileUploadExample: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      documents: [],
      images: [],
      singleFile: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Form submitted successfully!");
    reset();
  };

  const handleFileUpload = async (files: File[]) => {
    // Simulate file upload to server
    console.log("Uploading files:", files);

    // Here you would typically upload to your server
    // import axios from 'axios';
    // const formData = new FormData();
    // files.forEach(file => formData.append('files', file));
    // await axios.post('/api/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Files uploaded successfully!");
  };

  return (
    <div className="container py-4">
      <Typography variant="h4" className="mb-3">
        File Upload Form Example
      </Typography>

      <Typography variant="p" className="text-muted mb-4">
        This example demonstrates how to use the FileUpload component with React
        Hook Form.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Typography variant="h6" className="mb-3">
            Single File Upload
          </Typography>
          <Controller
            name="singleFile"
            control={control}
            rules={{ required: "Please select a file" }}
            render={({ field }) => (
              <FileUpload
                name="singleFile"
                label="Upload Single File"
                accept=".pdf,.doc,.docx"
                multiple={false}
                maxSize={5}
                required
                error={errors.singleFile?.message}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <Typography variant="h6" className="mb-3">
            Multiple Documents
          </Typography>
          <Controller
            name="documents"
            control={control}
            render={({ field }) => (
              <FileUpload
                name="documents"
                label="Upload Documents"
                accept=".pdf,.doc,.docx,.txt"
                multiple={true}
                maxSize={10}
                onFileSelect={(files) =>
                  console.log("Documents selected:", files)
                }
                onFileUpload={handleFileUpload}
              />
            )}
          />
        </div>

        <div className="mb-4">
          <Typography variant="h6" className="mb-3">
            Image Gallery
          </Typography>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <FileUpload
                name="images"
                label="Upload Images"
                accept="image/*"
                multiple={true}
                maxSize={2}
                onFileSelect={(files) => console.log("Images selected:", files)}
                onFileUpload={handleFileUpload}
              />
            )}
          />
        </div>

        <div className="d-flex gap-2 mb-4">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => reset()}
          >
            Reset Form
          </Button>
        </div>
      </form>

      <div className="mt-5">
        <Typography variant="h6" className="mb-3">
          Usage Code Example:
        </Typography>
        <pre className="bg-light p-3 rounded border">
          {`import { useForm, Controller } from 'react-hook-form';
import { FileUpload } from './FileUpload';

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="files"
        control={control}
        rules={{ required: 'Please select files' }}
        render={({ field }) => (
          <FileUpload
            name="files"
            label="Upload Files"
            accept="*/*"
            multiple={true}
            maxSize={10}
            required
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
};`}
        </pre>
      </div>
    </div>
  );
};

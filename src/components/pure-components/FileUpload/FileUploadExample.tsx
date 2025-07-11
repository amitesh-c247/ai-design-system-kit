import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FileUpload } from "./FileUpload";
import Button from "../Button";
import Typography from "../Typography";
import styles from "./styles.module.scss";

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
    // const formData = new FormData();
    // files.forEach(file => formData.append('files', file));
    // await fetch('/api/upload', { method: 'POST', body: formData });

    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Files uploaded successfully!");
  };

  return (
    <div className={styles.exampleContainer}>
      <Typography variant="h4" className={styles.exampleTitle}>
        File Upload Form Example
      </Typography>

      <Typography variant="p" className={styles.exampleDescription}>
        This example demonstrates how to use the FileUpload component with React
        Hook Form.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formSection}>
          <Typography variant="h6" className={styles.sectionTitle}>
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

        <div className={styles.formSection}>
          <Typography variant="h6" className={styles.sectionTitle}>
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

        <div className={styles.formSection}>
          <Typography variant="h6" className={styles.sectionTitle}>
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

        <div className={styles.formActions}>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => reset()}
            className={styles.resetButton}
          >
            Reset Form
          </Button>
        </div>
      </form>

      <div className={styles.codeExample}>
        <Typography variant="h6" className={styles.codeTitle}>
          Usage Code Example:
        </Typography>
        <pre className={styles.codeBlock}>
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

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import Input from "@/components/pure-components/Form/Input";
import { useTranslations } from "next-intl";

export interface UserFormValues {
  name: string;
  email: string;
  status: number;
}

interface UserFormProps {
  defaultValues?: Partial<UserFormValues>;
  onSubmit: SubmitHandler<UserFormValues>;
  onCancel?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
}) => {
  const t = useTranslations("users");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    defaultValues: defaultValues || {
      name: "",
      email: "",
      status: 0,
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>{t("name")}</Form.Label>
        <Input
          {...register("name", { required: t("form.nameRequired") })}
          isInvalid={!!errors.name}
          feedback={errors.name?.message}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t("email")}</Form.Label>
        <Input
          {...register("email", { required: t("form.emailRequired") })}
          isInvalid={!!errors.email}
          feedback={errors.email?.message}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t("status")}</Form.Label>
        <Form.Select
          {...register("status", {
            required: t("form.statusRequired"),
            valueAsNumber: true,
          })}
          isInvalid={!!errors.status}
        >
          <option value={0}>{t("statusOptions.active")}</option>
          <option value={1}>{t("statusOptions.inactive")}</option>
        </Form.Select>
        {errors.status && (
          <div className="invalid-feedback d-block">
            {errors.status.message}
          </div>
        )}
      </Form.Group>
      <div className="d-flex justify-content-end gap-2 mt-4">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} type="button">
            {t("cancel")}
          </Button>
        )}
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {t("save")}
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;

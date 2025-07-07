import React, { createContext, useContext, HTMLAttributes } from "react";
import { Form as BootstrapForm, Row, Col, Button } from "react-bootstrap";
import classnames from "classnames";
import styles from "./styles.module.scss";

export const FORM_ITEM_SIZE = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
} as const;

type FormItemSize = 4 | 6 | 8 | 12;

export interface FormItemProps {
  size?: keyof typeof FORM_ITEM_SIZE;
  dense?: boolean;
  label?: React.ReactNode;
  name?: string;
  required?: boolean;
  children: React.ReactElement<HTMLAttributes<HTMLElement>>;
  className?: string;
  help?: React.ReactNode;
  validateStatus?: "success" | "error" | "warning" | "validating";
  feedback?: React.ReactNode;
  isInvalid?: boolean;
  isValid?: boolean;
}

const ModalContext = createContext<{ size?: "sm" | "lg" | "xl" } | null>(null);

const Item: React.FC<FormItemProps> = ({
  size,
  dense,
  label,
  name,
  required,
  children,
  className = "",
  help,
  validateStatus,
  feedback,
  isInvalid,
  isValid,
}) => {
  const parentModal = useContext(ModalContext);
  const modalSize = parentModal?.size;

  const itemBasedOnModalSize: Record<string, FormItemSize> = {
    sm: FORM_ITEM_SIZE.xl,
    lg: FORM_ITEM_SIZE.lg,
    xl: FORM_ITEM_SIZE.md,
  };

  // default item span
  let itemSpan: FormItemSize = FORM_ITEM_SIZE["sm"];
  // if `size` prop passed, overrides default size
  if (size) itemSpan = FORM_ITEM_SIZE[size];
  // else if formItem is inside a modal, apply size based on Modal's size
  else if (modalSize && itemBasedOnModalSize[modalSize]) {
    itemSpan = itemBasedOnModalSize[modalSize];
  }

  const getValidationClass = () => {
    if (isInvalid) return "is-invalid";
    if (isValid) return "is-valid";
    if (validateStatus === "error") return "is-invalid";
    if (validateStatus === "success") return "is-valid";
    return "";
  };

  return (
    <Col
      xs={itemSpan}
      className={classnames(dense ? "mb-2" : "mb-3", className)}
    >
      <BootstrapForm.Group
        className={classnames(styles.formGroup, { [styles.dense]: dense })}
      >
        {label && (
          <BootstrapForm.Label className={styles.formLabel}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </BootstrapForm.Label>
        )}
        {React.isValidElement(children) &&
          React.cloneElement(children, {
            className: classnames(
              children.props.className,
              getValidationClass()
            ),
          })}
        {feedback && (
          <BootstrapForm.Control.Feedback
            type={isInvalid ? "invalid" : "valid"}
          >
            {feedback}
          </BootstrapForm.Control.Feedback>
        )}
        {help && (
          <BootstrapForm.Text
            className={classnames(styles.formText, {
              [styles.error]: validateStatus === "error",
            })}
          >
            {help}
          </BootstrapForm.Text>
        )}
      </BootstrapForm.Group>
    </Col>
  );
};

interface FormListProps {
  name: string;
  children: (
    fields: Array<{ key: number }>,
    actions: { add: () => void; remove: (index: number) => void }
  ) => React.ReactNode;
  addButtonText?: string;
  removeButtonText?: string;
}

const List: React.FC<FormListProps> = ({
  name,
  children,
  addButtonText = "Add Item",
  removeButtonText = "Remove",
}) => {
  const [fields, setFields] = React.useState<Array<{ key: number }>>([
    { key: 0 },
  ]);

  const add = () => {
    setFields([...fields, { key: fields.length }]);
  };

  const remove = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.formList}>
      {children(fields, { add, remove })}
      <Button
        variant="outline-primary"
        onClick={add}
        className="mt-2"
        aria-label={addButtonText}
      >
        {addButtonText}
      </Button>
    </div>
  );
};

interface FormProps {
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
  validated?: boolean;
}

export const Form: React.FC<React.PropsWithChildren<FormProps>> = ({
  children,
  ...props
}) => {
  return (
    <BootstrapForm className={styles.form} {...props}>
      <Row>{children}</Row>
    </BootstrapForm>
  );
};

interface FormGroupProps {
  className?: string;
}

export const FormGroup: React.FC<React.PropsWithChildren<FormGroupProps>> = ({
  children,
  ...props
}) => {
  return (
    <BootstrapForm.Group className={styles.formGroup} {...props}>
      {children}
    </BootstrapForm.Group>
  );
};

interface FormLabelProps {
  className?: string;
}

export const FormLabel: React.FC<React.PropsWithChildren<FormLabelProps>> = ({
  children,
  ...props
}) => {
  return (
    <BootstrapForm.Label className={styles.formLabel} {...props}>
      {children}
    </BootstrapForm.Label>
  );
};

interface FormControlProps {
  type?: string;
  className?: string;
  [key: string]: any;
}

export const FormControl: React.FC<FormControlProps> = ({
  type = "text",
  ...props
}) => {
  return (
    <BootstrapForm.Control
      type={type}
      className={styles.formControl}
      {...props}
    />
  );
};

interface FormSelectProps {
  className?: string;
  [key: string]: any;
}

export const FormSelect: React.FC<React.PropsWithChildren<FormSelectProps>> = ({
  children,
  ...props
}) => {
  return (
    <BootstrapForm.Select className={styles.formSelect} {...props}>
      {children}
    </BootstrapForm.Select>
  );
};

interface FormCheckProps {
  className?: string;
  [key: string]: any;
}

export const FormCheck: React.FC<React.PropsWithChildren<FormCheckProps>> = ({
  children,
  ...props
}) => {
  return (
    <BootstrapForm.Check className={styles.formCheck} {...props}>
      {children}
    </BootstrapForm.Check>
  );
};

interface FormTextProps {
  className?: string;
}

export const FormText: React.FC<React.PropsWithChildren<FormTextProps>> = ({
  children,
  ...props
}) => {
  return (
    <BootstrapForm.Text className={styles.formText} {...props}>
      {children}
    </BootstrapForm.Text>
  );
};

interface HorizontalFormGroupProps extends FormGroupProps {
  label: React.ReactNode;
  control: React.ReactNode;
}

export const HorizontalFormGroup: React.FC<HorizontalFormGroupProps> = ({
  label,
  control,
  ...props
}) => {
  return (
    <FormGroup className={styles.horizontal} {...props}>
      <FormLabel className={styles.horizontalLabel}>{label}</FormLabel>
      <div className={styles.horizontalControl}>{control}</div>
    </FormGroup>
  );
};

export const FormItem = Item;

export { ModalContext };

// Main Form component with attached sub-components
const FormWithComponents = Object.assign(Form, {
  Item,
  List,
  Group: FormGroup,
  Label: FormLabel,
  Control: FormControl,
  Select: FormSelect,
  Check: FormCheck,
  Text: FormText,
  HorizontalGroup: HorizontalFormGroup,
});

export default FormWithComponents;

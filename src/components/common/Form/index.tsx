import React, { createContext, useContext, HTMLAttributes } from 'react';
import { Form as BootstrapForm, Row, Col, Button } from 'react-bootstrap';
import classnames from 'classnames';
import styles from './styles.module.scss';

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
  validateStatus?: 'success' | 'error' | 'warning' | 'validating';
  feedback?: React.ReactNode;
  isInvalid?: boolean;
  isValid?: boolean;
}

const ModalContext = createContext<{ size?: 'sm' | 'lg' | 'xl' } | null>(null);

const Item: React.FC<FormItemProps> = ({
  size,
  dense,
  label,
  name,
  required,
  children,
  className = '',
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
  let itemSpan: FormItemSize = FORM_ITEM_SIZE['sm'];
  // if `size` prop passed, overrides default size
  if (size) itemSpan = FORM_ITEM_SIZE[size];
  // else if formItem is inside a modal, apply size based on Modal's size
  else if (modalSize && itemBasedOnModalSize[modalSize]) {
    itemSpan = itemBasedOnModalSize[modalSize];
  }

  const getValidationClass = () => {
    if (isInvalid) return 'is-invalid';
    if (isValid) return 'is-valid';
    if (validateStatus === 'error') return 'is-invalid';
    if (validateStatus === 'success') return 'is-valid';
    return '';
  };

  return (
    <Col xs={itemSpan} className={classnames(dense ? 'mb-2' : 'mb-3', className)}>
      <BootstrapForm.Group className={classnames(styles.formGroup, { [styles.dense]: dense })}>
        {label && (
          <BootstrapForm.Label className={styles.formLabel}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </BootstrapForm.Label>
        )}
        {React.cloneElement(children, {
          className: classnames(children.props.className, getValidationClass()),
        })}
        {feedback && (
          <BootstrapForm.Control.Feedback type={isInvalid ? 'invalid' : 'valid'}>
            {feedback}
          </BootstrapForm.Control.Feedback>
        )}
        {help && (
          <BootstrapForm.Text className={classnames(styles.formText, { [styles.error]: validateStatus === 'error' })}>
            {help}
          </BootstrapForm.Text>
        )}
      </BootstrapForm.Group>
    </Col>
  );
};

interface FormListProps {
  name: string;
  children: (fields: Array<{ key: number }>, actions: { add: () => void; remove: (index: number) => void }) => React.ReactNode;
  addButtonText?: string;
  removeButtonText?: string;
}

const List: React.FC<FormListProps> = ({
  name,
  children,
  addButtonText = 'Add Item',
  removeButtonText = 'Remove',
}) => {
  const [fields, setFields] = React.useState<Array<{ key: number }>>([{ key: 0 }]);

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
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
  layout?: 'horizontal' | 'vertical';
  validated?: boolean;
}

const Form: React.FC<FormProps> & {
  Item: typeof Item;
  List: typeof List;
} = ({ children, onSubmit, className = '', layout = 'vertical', validated }) => {
  return (
    <BootstrapForm
      onSubmit={onSubmit}
      className={classnames(className, { [styles.horizontal]: layout === 'horizontal' })}
      validated={validated}
    >
      <Row>{children}</Row>
    </BootstrapForm>
  );
};

Form.Item = Item;
Form.List = List;

export { ModalContext };
export default Form;

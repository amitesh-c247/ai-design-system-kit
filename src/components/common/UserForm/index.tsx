import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import Input from '@/components/common/Form/Input';
import { useTranslations } from 'next-intl';

export interface UserFormValues {
  make: string;
  short_code: string;
  status: 'ACTIVE' | 'DISABLED';
}

interface UserFormProps {
  defaultValues?: UserFormValues;
  onSubmit: SubmitHandler<UserFormValues>;
  onCancel?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ defaultValues, onSubmit, onCancel }) => {
  const t = useTranslations('users');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<UserFormValues>({
    defaultValues: defaultValues || { make: '', short_code: '', status: 'ACTIVE' },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>{t('make')}</Form.Label>
        <Input
          {...register('make', { required: t('form.makeRequired') })}
          isInvalid={!!errors.make}
          feedback={errors.make?.message}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t('short_code')}</Form.Label>
        <Input
          {...register('short_code', { required: t('form.shortCodeRequired') })}
          isInvalid={!!errors.short_code}
          feedback={errors.short_code?.message}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t('status')}</Form.Label>
        <Form.Select {...register('status', { required: t('form.statusRequired') })} isInvalid={!!errors.status}>
          <option value="ACTIVE">{t('statusOptions.active')}</option>
          <option value="DISABLED">{t('statusOptions.inactive')}</option>
        </Form.Select>
        {errors.status && <div className="invalid-feedback d-block">{errors.status.message}</div>}
      </Form.Group>
      <div className="d-flex justify-content-end gap-2 mt-4">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} type="button">
            {t('cancel')}
          </Button>
        )}
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {t('save')}
        </Button>
      </div>
    </Form>
  );
};

export default UserForm; 
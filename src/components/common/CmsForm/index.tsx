import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import Input from '@/components/common/Form/Input';
import { useTranslations } from 'next-intl';
import { useSyncFormValues } from '@/utils/useSyncFormValues';

export interface CmsFormValues {
  title: string;
  content: string;
  status: 'PUBLISHED' | 'DRAFT';
  is_agreement: 0 | 1;
  open_in_new_tab: 0 | 1;
  content_type: 'TEXT' | 'LINK';
}

interface CmsFormProps {
  defaultValues?: Partial<CmsFormValues>;
  onSubmit: SubmitHandler<CmsFormValues>;
  onCancel?: () => void;
}

const CmsForm: React.FC<CmsFormProps> = ({ defaultValues, onSubmit, onCancel }) => {
  const t = useTranslations('cms');
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue, reset } = useForm<CmsFormValues>({
    defaultValues: {
      title: '',
      content: '',
      status: 'DRAFT',
      is_agreement: 0,
      open_in_new_tab: 0,
      content_type: 'TEXT',
      ...defaultValues,
    },
  });

  useSyncFormValues<CmsFormValues>(defaultValues, setValue);

  const contentType = watch('content_type');

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>{t('title')}</Form.Label>
        <Input
          {...register('title', { required: t('form.titleRequired') })}
          isInvalid={!!errors.title}
          feedback={errors.title?.message}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t('contentType')}</Form.Label>
        <Form.Select {...register('content_type', { required: t('form.contentTypeRequired') })} isInvalid={!!errors.content_type}>
          <option value="TEXT">{t('contentTypeOptions.text')}</option>
          <option value="LINK">{t('contentTypeOptions.link')}</option>
        </Form.Select>
        {errors.content_type && <div className="invalid-feedback d-block">{errors.content_type.message}</div>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t('content')}</Form.Label>
        {contentType === 'LINK' ? (
          <Input
            {...register('content', { required: t('form.contentRequired') })}
            isInvalid={!!errors.content}
            feedback={errors.content?.message}
          />
        ) : (
          <Form.Control
            as="textarea"
            rows={4}
            {...register('content', { required: t('form.contentRequired') })}
            isInvalid={!!errors.content}
          />
        )}
        {errors.content && <div className="invalid-feedback d-block">{errors.content.message}</div>}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t('status')}</Form.Label>
        <Form.Select {...register('status', { required: t('form.statusRequired') })} isInvalid={!!errors.status}>
          <option value="PUBLISHED">{t('statusOptions.published')}</option>
          <option value="DRAFT">{t('statusOptions.draft')}</option>
        </Form.Select>
        {errors.status && <div className="invalid-feedback d-block">{errors.status.message}</div>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="isAgreement">
        <Form.Check
          type="checkbox"
          label={t('isAgreement')}
          {...register('is_agreement')}
          checked={!!watch('is_agreement')}
          onChange={e => {
            // react-hook-form expects 0/1, not boolean
            const value = e.target.checked ? 1 : 0;
            // @ts-ignore
            register('is_agreement').onChange({ target: { value, name: 'is_agreement' } });
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="openInNewTab">
        <Form.Check
          type="checkbox"
          label={t('openInNewTab')}
          {...register('open_in_new_tab')}
          checked={!!watch('open_in_new_tab')}
          onChange={e => {
            const value = e.target.checked ? 1 : 0;
            // @ts-ignore
            register('open_in_new_tab').onChange({ target: { value, name: 'open_in_new_tab' } });
          }}
        />
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

export default CmsForm; 
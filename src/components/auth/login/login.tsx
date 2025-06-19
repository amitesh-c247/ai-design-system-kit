'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, FormGroup, FormLabel } from '@/components/common/Form';
import Input from '@/components/common/Form/Input';
import Button from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { EMAIL_REGEX } from '@/constants/regex';
import { useTranslations } from 'next-intl';

type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login = () => {
  const { login, isLoggingIn, loginError, isAuthenticated, isLoadingUser } = useAuth();
  const router = useRouter();
  const t = useTranslations('auth.login');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  });
  
  React.useEffect(() => {
    if (!isLoadingUser && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoadingUser, router]);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  if (isLoadingUser) {
    return <LoadingSpinner fullScreen />;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.cardContent}>
          <div className={styles.logoContainer}>
            <ImageWithFallback
              src="/logo.svg"
              alt="Company Logo"
              width={48}
              height={48}
              priority
            />
          </div>

          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>

          {loginError && (
            <div className={styles.errorMessage}>
              {loginError.message}
            </div>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <FormLabel>{t('email.label')}</FormLabel>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: t('email.required'),
                  pattern: {
                    value: EMAIL_REGEX,
                    message: t('email.invalid')
                  }
                })}
                placeholder={t('email.placeholder')}
                disabled={isLoggingIn}
                isInvalid={!!errors.email}
                feedback={errors.email?.message}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{t('password.label')}</FormLabel>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: t('password.required')
                })}
                placeholder={t('password.placeholder')}
                disabled={isLoggingIn}
                isInvalid={!!errors.password}
                feedback={errors.password?.message}
              />
            </FormGroup>

            <div className={styles.formFooter}>
              <label className={styles.rememberMe}>
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  disabled={isLoggingIn}
                />
                {t('rememberMe')}
              </label>

              <a href="/forgot-password" className={styles.forgotPassword}>
                {t('forgotPassword')}
              </a>
            </div>

            <Button 
              variant="primary"
              type="submit" 
              className={styles.submitButton}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? t('submitting') : t('submit')}
            </Button>
          </Form>

          <p className={styles.signupText}>
            {t('noAccount')}{' '}
            <a href="/register" className={styles.signupLink}>
              {t('signUp')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

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

type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login = () => {
  const { login, isLoggingIn, loginError, isAuthenticated, isLoadingUser } = useAuth();
  const router = useRouter();
  
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

          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Please sign in to continue</p>

          {loginError && (
            <div className={styles.errorMessage}>
              {loginError.message}
            </div>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <Input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: EMAIL_REGEX,
                    message: 'Please enter a valid email address'
                  }
                })}
                placeholder="Enter your email"
                disabled={isLoggingIn}
                isInvalid={!!errors.email}
                feedback={errors.email?.message}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required'
                })}
                placeholder="Enter your password"
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
                Remember me
              </label>

              <a href="/forgot-password" className={styles.forgotPassword}>
                Forgot Password?
              </a>
            </div>

            <Button 
              variant="primary"
              type="submit" 
              className={styles.submitButton}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Signing in...' : 'Sign In'}
            </Button>
          </Form>

          <p className={styles.signupText}>
            Don&apos;t have an account?{' '}
            <a href="/register" className={styles.signupLink}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

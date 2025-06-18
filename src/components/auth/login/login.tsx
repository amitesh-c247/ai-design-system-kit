'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, FormGroup, FormLabel } from '@/components/common/Form';
import Input from '@/components/common/Form/Input';
import Button from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/common/LoadingSpinner';

type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  rememberMe: yup.boolean().default(false),
});

const Login = () => {
  const { login, isLoggingIn, loginError, isAuthenticated, isLoadingUser } = useAuth();
  const router = useRouter();
  
  React.useEffect(() => {
    if (!isLoadingUser && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoadingUser, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

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

          <Form onSubmit={handleSubmit(onSubmit,()=>console.log("error  ",))}>
            <FormGroup>
              <FormLabel>Email Address</FormLabel>
              <Input
                id="email"
                type="email"
                {...register('email')}
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
                {...register('password')}
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

          <div className={styles.divider}>
            <span>or continue with</span>
          </div>

          <div className={styles.socialLogin}>
            <button type="button" disabled={isLoggingIn}>
              <ImageWithFallback
                src="/google.svg"
                alt="Google"
                width={24}
                height={24}
              />
              Google
            </button>
            <button type="button" disabled={isLoggingIn}>
              <ImageWithFallback
                src="/github.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
              GitHub
            </button>
          </div>

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

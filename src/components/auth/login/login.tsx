'use client';

import React, { useState } from 'react';
import { Form, FormCheck, FormItem } from '@/components/common/Form';
import Input from '@/components/common/Form/Input';
import Button from '@/components/common/Button';
import styles from './styles.module.scss';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.cardContent}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Please sign in to continue</p>

          <Form onSubmit={handleSubmit}>
            <FormItem label="Email" required>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormItem>

            <FormItem label="Password" required>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormItem>

            <div className={styles.formFooter}>
              <FormCheck
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className={styles.rememberMe}
              >
                Remember me
              </FormCheck>

              <a href="/forgot-password" className={styles.forgotPassword}>
                Forgot Password?
              </a>
            </div>

            <Button type="submit" variant="primary" block>
              Sign In
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

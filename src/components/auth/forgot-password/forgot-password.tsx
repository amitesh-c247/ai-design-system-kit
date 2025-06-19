"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, FormGroup, FormLabel } from "@/components/common/Form";
import Input from "@/components/common/Form/Input";
import Button from "@/components/common/Button";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import styles from '../auth.module.scss';

export type ForgotPasswordInputs = {
  email: string;
};

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordInputs>({
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    // Placeholder for forget password logic
    // eslint-disable-next-line no-console
    console.log("Forget password email:", data.email);
    setSubmitted(true);
  };

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
          <h1 className={styles.title}>Forgot Password</h1>
          <p className={styles.subtitle}>Enter your email to reset your password</p>

          {submitted ? (
            <div className={styles.errorMessage} style={{ background: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' }}>
              If an account with that email exists, a password reset link has been sent.
            </div>
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <FormLabel>Email Address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  placeholder="Enter your email"
                  isInvalid={!!errors.email}
                  feedback={errors.email?.message}
                />
              </FormGroup>
              <Button
                variant="primary"
                type="submit"
                className={styles.submitButton}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

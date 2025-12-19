"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, FormGroup, FormLabel } from "@/components/pure-components/Form";
import Input from "@/components/pure-components/Form/Input";
import Button from "@/components/pure-components/Button";
import ImageWithFallback from "@/components/pure-components/ImageWithFallback";

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
    setSubmitted(true);
  };

  return (
    <div className="app-auth-container d-flex align-items-center justify-content-center p-4">
      <div className="app-auth-card card w-100">
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <ImageWithFallback
              src="/logo.svg"
              alt="Company Logo"
              width={48}
              height={48}
              priority
            />
          </div>
          <h1 className="fs-xl fw-bold text-center mb-2">Forgot Password</h1>
          <p className="text-center mb-4">
            Enter your email to reset your password
          </p>

          {submitted ? (
            <div className="alert alert-success mb-3 text-center">
              If an account with that email exists, a password reset link has
              been sent.
            </div>
          ) : (
            <>
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
                  className="w-100"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </Form>
              <p className="text-center mt-3 mb-0">
                Already have an account?{" "}
                <a href="/login" className="text-decoration-none">
                  Sign in
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

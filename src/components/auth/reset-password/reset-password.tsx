"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, FormGroup, FormLabel } from "@/components/pure-components/Form";
import Input from "@/components/pure-components/Form/Input";
import Button from "@/components/pure-components/Button";
import ImageWithFallback from "@/components/pure-components/ImageWithFallback";
import classNames from "classnames";
import { Eye, EyeOff } from "@/components/pure-components/Icons";

export type ResetPasswordInputs = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordInputs>({
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
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
          <h1 className="fs-xl fw-bold text-center mb-2">Reset Password</h1>
          <p className="text-center mb-4">Enter your new password below</p>

          {submitted ? (
            <div className="alert alert-success mb-3 text-center">
              Your password has been reset successfully. You can now log in with
              your new password.
            </div>
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <FormLabel>New Password</FormLabel>
                <div className="position-relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "At least 8 characters" },
                      validate: {
                        hasUpper: (v) =>
                          /[A-Z]/.test(v) || "At least one uppercase letter",
                        hasLower: (v) =>
                          /[a-z]/.test(v) || "At least one lowercase letter",
                        hasNumber: (v) =>
                          /[0-9]/.test(v) || "At least one number",
                        hasSpecial: (v) =>
                          /[^A-Za-z0-9]/.test(v) ||
                          "At least one special character",
                      },
                    })}
                    placeholder="Enter your new password"
                    isInvalid={!!errors.password}
                    feedback={errors.password?.message}
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((v) => !v)}
                    className="app-password-toggle-btn"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormGroup>
              <FormGroup>
                <FormLabel>Confirm New Password</FormLabel>
                <div className="position-relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (v) =>
                        v === password || "Passwords do not match",
                    })}
                    placeholder="Re-enter your new password"
                    isInvalid={!!errors.confirmPassword}
                    feedback={errors.confirmPassword?.message}
                  />
                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="app-password-toggle-btn"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </FormGroup>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

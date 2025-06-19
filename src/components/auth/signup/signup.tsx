"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, FormGroup, FormLabel } from "@/components/common/Form";
import Input from "@/components/common/Form/Input";
import Button from "@/components/common/Button";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/hooks/useAuth"; // Uncomment if you add signup logic
// Use react-icons if available, otherwise fallback to inline SVG
// import { FiEye, FiEyeOff } from "react-icons/fi";
import { Eye, EyeOff } from "@/components/common/Icons";

export type SignupFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

const Signup = () => {
  // const { signup, isSigningUp, signupError } = useAuth(); // Uncomment if you add signup logic
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // Password strength logic (simple, for demo)
  const getPasswordStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 2) return "Weak";
    if (score === 3 || score === 4) return "Medium";
    if (score === 5) return "Strong";
    return "";
  };
  const passwordStrength = getPasswordStrength(password);

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    // Placeholder for signup logic
    // await signup(data);
    // For now, just log and redirect
    // eslint-disable-next-line no-console
    console.log("Signup form values:", data);
    alert("Signup successful! (Check console for values)");
    router.push("/login");
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
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Sign up to get started</p>

          {/* {signupError && (
            <div className={styles.errorMessage}>{signupError.message}</div>
          )} */}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <FormLabel>First Name</FormLabel>
              <Input
                id="firstName"
                type="text"
                {...register("firstName", { required: "First name is required" })}
                placeholder="Enter your first name"
                isInvalid={!!errors.firstName}
                feedback={errors.firstName?.message}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Last Name</FormLabel>
              <Input
                id="lastName"
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Enter your last name"
                isInvalid={!!errors.lastName}
                feedback={errors.lastName?.message}
              />
            </FormGroup>
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
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <div style={{ position: 'relative' }}>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "At least 8 characters" },
                    validate: {
                      hasUpper: (v) => /[A-Z]/.test(v) || "At least one uppercase letter",
                      hasLower: (v) => /[a-z]/.test(v) || "At least one lowercase letter",
                      hasNumber: (v) => /[0-9]/.test(v) || "At least one number",
                      hasSpecial: (v) => /[^A-Za-z0-9]/.test(v) || "At least one special character",
                    },
                  })}
                  placeholder="Enter your password"
                  isInvalid={!!errors.password}
                  feedback={errors.password?.message}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: '#888',
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {password && (
                <div className={styles.passwordStrength}>
                  <span className={styles[`passwordStrength${passwordStrength}`]}>
                    {passwordStrength}
                  </span>
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>Confirm Password</FormLabel>
              <div style={{ position: 'relative' }}>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (v) => v === password || "Passwords do not match",
                  })}
                  placeholder="Re-enter your password"
                  isInvalid={!!errors.confirmPassword}
                  feedback={errors.confirmPassword?.message}
                />
                <button
                  type="button"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: '#888',
                  }}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </FormGroup>
            <div className={styles.formFooter}>
              <label className={styles.rememberMe}>
                <input
                  type="checkbox"
                  {...register("acceptTerms", {
                    required: "You must accept the Terms and Privacy Policy",
                  })}
                />
                I accept the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>
            {errors.acceptTerms && (
              <div className={styles.errorMessage}>{errors.acceptTerms.message}</div>
            )}
            <Button
              variant="primary"
              type="submit"
              className={styles.submitButton}
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </Button>
          </Form>

          <p className={styles.signupText}>
            Already have an account?{' '}
            <a href="/login" className={styles.signupLink}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

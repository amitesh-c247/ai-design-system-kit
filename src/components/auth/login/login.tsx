"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, FormGroup, FormLabel } from "@/components/pure-components/Form";
import Input from "@/components/pure-components/Form/Input";
import Button from "@/components/pure-components/Button";
import { useAuth } from "@/hooks/auth";
import ImageWithFallback from "@/components/pure-components/ImageWithFallback";
import styles from "../auth.module.scss";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/pure-components/LoadingSpinner";
import { EMAIL_REGEX } from "@/constants/regex";
import { useTranslations } from "next-intl";
import { Eye, EyeOff } from "@/components/pure-components/Icons";

type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login = () => {
  const { login, isLoggingIn, loginError, isAuthenticated, isLoadingUser } =
    useAuth();
  const router = useRouter();
  const t = useTranslations("auth.login");

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    if (!isLoadingUser && isAuthenticated) {
      router.push("/dashboard");
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

          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.subtitle}>{t("subtitle")}</p>

          {loginError && (
            <div className={styles.errorMessage}>{loginError.message}</div>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <FormLabel>{t("email.label")}</FormLabel>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: t("email.required"),
                  pattern: {
                    value: EMAIL_REGEX,
                    message: t("email.invalid"),
                  },
                })}
                placeholder={t("email.placeholder")}
                disabled={isLoggingIn}
                isInvalid={!!errors.email}
                feedback={errors.email?.message}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{t("password.label")}</FormLabel>
              <div className={styles.passwordInputWrapper}>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: t("password.required"),
                })}
                placeholder={t("password.placeholder")}
                disabled={isLoggingIn}
                isInvalid={!!errors.password}
                feedback={errors.password?.message}
              />
              <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className={`${styles.passwordToggleBtn} ${
                    showPassword ? styles.hidePassword : styles.showPassword
                  }`}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                </div>
            </FormGroup>

            <div className={styles.formFooter}>
              <label className={`cursor-pointer ${styles.rememberMe}`}>
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  disabled={isLoggingIn}
                />
                {t("rememberMe")}
              </label>

              <a href="/forgot-password" className={styles.forgotPassword}>
                {t("forgotPassword")}
              </a>
            </div>
            <FormGroup>
            <Button
              variant="primary"
              type="submit"
              // className={styles.submitButton}
              // disabled={isLoggingIn}
            >
              {isLoggingIn ? t("submitting") : t("submit")}
            </Button>
            </FormGroup>
          </Form>
          <p className={styles.signupText}>
            Don&apos;t have an account?{" "}
            <a href="/signup" className={styles.signupLink}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

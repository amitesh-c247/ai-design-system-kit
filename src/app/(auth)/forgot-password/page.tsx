import { Metadata } from 'next';
import ForgotPasswordForm from '@/components/auth/forgot-password/forgot-password';

export const metadata: Metadata = {
  title: 'Forgot Password | Admin Dashboard',
  description: 'Forgot Password to access your admin dashboard',
};

export default function LoginPage() {
  return (
    <main>
      <ForgotPasswordForm />
    </main>
  );
}

import { Metadata } from 'next';
import ResetPassowrdForm from '@/components/auth/reset-password/reset-password';

export const metadata: Metadata = {
  title: 'Reset Password | Admin Dashboard',
  description: 'Reset Password to access your admin dashboard',
};

export default function LoginPage() {
  return (
    <main>
      <ResetPassowrdForm />
    </main>
  );
}

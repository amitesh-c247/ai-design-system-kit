import { Metadata } from 'next';
import LoginForm from '@/components/auth/login/login';
import styles from './styles.module.scss';

export const metadata: Metadata = {
  title: 'Login | Admin Dashboard',
  description: 'Login to access your admin dashboard',
};

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}

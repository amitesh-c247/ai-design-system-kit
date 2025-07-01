import Link from 'next/link'
import styles from './web.module.scss'

export default function WebHeader() {
  return (
    <header
      className={styles['web-header']}
      style={{
        background: 'var(--card)',
        borderBottom: '1px solid var(--border)',
        color: 'var(--foreground)',
      }}
    >
      <div
        className={styles['web-header__container']}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <Link
          href="/"
          className={styles['web-header__logo-link']}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: '2rem', color: 'var(--primary)' }}>🌐</span>
          <span
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--primary)',
            }}
          >
            WebLogo
          </span>
        </Link>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          <Link
            href="/"
            style={{
              color: 'var(--foreground)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Home
          </Link>
          <Link
            href="/about"
            style={{
              color: 'var(--foreground)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            About
          </Link>
          <Link
            href="/terms"
            style={{
              color: 'var(--foreground)',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Terms & Conditions
          </Link>
        </nav>
      </div>
    </header>
  )
}

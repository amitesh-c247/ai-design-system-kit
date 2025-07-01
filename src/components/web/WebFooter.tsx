import Link from 'next/link'
import styles from './web.module.scss'

export default function WebFooter() {
  return (
    <footer
      className={styles['web-footer']}
      style={{
        background: 'var(--card)',
        borderTop: '1px solid var(--border)',
        color: 'var(--muted-foreground)',
        marginTop: '3rem',
      }}
    >
      <div
        className={styles['web-footer__container']}
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '2rem 2rem 1rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
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
        </div>
        <div style={{ fontSize: '0.95rem', color: 'var(--muted-foreground)' }}>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

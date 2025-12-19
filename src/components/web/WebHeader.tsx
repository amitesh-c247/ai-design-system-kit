import Link from 'next/link'

export default function WebHeader() {
  return (
    <header className="app-web-header border-bottom">
      <div className="container d-flex align-items-center justify-content-between py-3">
        <Link href="/" className="text-decoration-none d-flex align-items-center gap-2">
          <span className="fs-2 text-primary">🌐</span>
          <span className="fs-4 fw-bold text-primary">WebLogo</span>
        </Link>
        <nav className="d-flex gap-4">
          <Link href="/" className="text-decoration-none fw-medium">
            Home
          </Link>
          <Link href="/about" className="text-decoration-none fw-medium">
            About
          </Link>
          <Link href="/terms" className="text-decoration-none fw-medium">
            Terms & Conditions
          </Link>
        </nav>
      </div>
    </header>
  )
}

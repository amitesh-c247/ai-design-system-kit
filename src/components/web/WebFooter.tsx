import Link from 'next/link'

export default function WebFooter() {
  return (
    <footer className="app-web-footer border-top mt-5">
      <div className="container d-flex flex-column align-items-center py-4">
        <div className="d-flex gap-4 mb-2">
          <Link href="/terms" className="text-decoration-none fw-medium">
            Terms & Conditions
          </Link>
          <Link href="/about" className="text-decoration-none fw-medium">
            About
          </Link>
        </div>
        <div className="fs-sm text-muted">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

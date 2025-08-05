
# Next.js 15 Admin Dashboard Theme

A modern, scalable admin dashboard template built with [Next.js 15](https://nextjs.org/), [React-Bootstrap](https://react-bootstrap.netlify.app/), TypeScript, and SCSS Modules. This project uses the App Router and a modular folder structure for maintainability and extensibility.

---

## 🚀 Project Overview

This project provides a robust foundation for building admin dashboards and internal tools. It features:
- Modular, reusable React components
- Authentication flows (login, signup, forgot/reset password)
- Responsive layouts with sidebar, header, and main content
- Theming support (light/dark mode)
- Clean, maintainable code with TypeScript
- SCSS Modules for scoped, maintainable styles

The structure and patterns are designed for easy scaling and customization for any admin or dashboard use case.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **UI Library:** [React-Bootstrap](https://react-bootstrap.netlify.app/)
- **Styling:** SCSS Modules, CSS Variables
- **State/Data:** React Query (for async data fetching)
- **Icons:** Custom SVG icons (see `src/components/common/Icons`)
- **Form Handling:** [react-hook-form](https://react-hook-form.com/)
- **Authentication:** Modular hooks and service layer

---

## 📁 Folder Structure Overview

```
frontend-admin-theme-2025/
├── public/                  # Static assets (SVGs, favicon, etc.)
├── src/
│   ├── app/                 # Next.js app directory (App Router)
│   │   ├── (auth)/          # Auth routes (login, signup, etc.)
│   │   ├── dashboard/       # Dashboard pages
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout (providers, theme, etc.)
│   │   └── providers.tsx    # React context providers (React Query, Theme, etc.)
│   ├── components/
│   │   ├── auth/            # Auth-related components (login, signup, etc.)
│   │   ├── common/          # Reusable UI components (Button, Form, Table, etc.)
│   │   └── header-sidebar/  # Header and Sidebar components
│   ├── hooks/               # Custom React hooks (e.g., useAuth)
│   ├── services/            # API and business logic (e.g., auth.ts)
│   └── utils/               # Utility functions (api, cookieService, etc.)
├── package.json
├── tsconfig.json
├── README.md
└── ...
```

---

## 🏗️ Getting Started

### 1. Installation

Clone the repo and install dependencies:

```bash
# Clone the repository
git clone https://github.com/your-org/frontend-admin-theme-2025.git
cd frontend-admin-theme-2025

# Install dependencies
yarn install
# or
npm install
```

### 2. Running Locally

Start the development server:

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## ⚙️ Environment Variables

If your project requires environment variables (e.g., API endpoints, secrets), create a `.env.local` file in the root. Example:

```env
# Main API Configuration
NEXT_PUBLIC_REST_API_ENDPOINT=http://localhost:3000/api

# MockAPI Configuration (shared for FAQ and CMS)
# Default: https://6853a9cea2a37a1d6f495380.mockapi.io/api/v1
NEXT_PUBLIC_MOCKAPI_BASE_URL=https://6853a9cea2a37a1d6f495380.mockapi.io/api/v1

# Security
NEXT_PUBLIC_TEXT_ENCRYPT_KEY=your-encryption-key
```

**Available Environment Variables:**
- `NEXT_PUBLIC_REST_API_ENDPOINT` - Main API endpoint for general services
- `NEXT_PUBLIC_MOCKAPI_BASE_URL` - Shared MockAPI base URL for FAQ and CMS (fallback: provided MockAPI URL)
- `NEXT_PUBLIC_TEXT_ENCRYPT_KEY` - Encryption key for cookies and sensitive data

Check the codebase for any usage of `process.env` to see which variables are required.

---

## 🏢 Build & Deployment

### Build for Production

```bash
yarn build
# or
npm run build
```

### Start Production Server

```bash
yarn start
# or
npm start
```

### Deploying (Vercel Recommended)

This project is optimized for deployment on [Vercel](https://vercel.com/):
- Push your repository to GitHub/GitLab/Bitbucket
- Import your project into Vercel
- Set any required environment variables in the Vercel dashboard
- Deploy!

For more, see [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

---

## 🧩 Modular Structure & Usage

- **Components** are organized by domain (auth, common, header-sidebar) for easy reuse and extension.
- **Auth flows** (login, signup, forgot/reset password) are modular and styled consistently using SCSS modules.
- **Theming** is handled via CSS variables and a ThemeProvider for light/dark mode.
- **Forms** use `react-hook-form` and custom Form/Input components for validation and accessibility.
- **Sidebar/Header** are fully responsive and support collapsible/expandable layouts.
- **Services** (e.g., `auth.ts`) encapsulate API logic for maintainability.

This structure makes it easy to:
- Add new pages or modules
- Swap out UI components
- Integrate with any backend
- Scale to large admin applications

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, improvements, or new features.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

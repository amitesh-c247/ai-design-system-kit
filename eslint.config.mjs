import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const compat = new FlatCompat({
  baseDirectory: __filename,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["next.config.js"],
    rules: {
      "@typescript-eslint/no-var-requires": "off"
    }
  }
];

export default eslintConfig;

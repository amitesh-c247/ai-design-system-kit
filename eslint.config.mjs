// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const compat = new FlatCompat({
  baseDirectory: __filename,
});

const eslintConfig = [...compat.extends("next/core-web-vitals"), {
  files: ["next.config.js"],
  rules: {
    "@typescript-eslint/no-var-requires": "off"
  }
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;

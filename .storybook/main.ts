import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "webpackFinal": async (config) => {
    // Add path alias for @/
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };

    // Configure SCSS to include variables globally
    const scssRule = config.module?.rules?.find((rule: any) => 
      rule.test && rule.test.test && rule.test.test('.scss')
    ) as any;
    
    if (scssRule) {
      const sassLoader = scssRule.use?.find((loader: any) => 
        loader.loader && loader.loader.includes('sass-loader')
      );
      
      if (sassLoader) {
        sassLoader.options = {
          ...sassLoader.options,
          additionalData: `@use "${path.resolve(__dirname, "../assets/scss/_variables.scss")}" as *;`
        };
      }
    }

    return config;
  }
};
export default config;
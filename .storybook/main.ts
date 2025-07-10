import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  webpackFinal: async (config) => {
    // Add path alias for @/
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };

    // Configure SCSS to include variables globally
    const scssRule = config.module?.rules?.find(
      (rule: any) => rule.test && rule.test.test && rule.test.test(".scss")
    ) as any;

    if (scssRule) {
      const sassLoader = scssRule.use?.find(
        (loader: any) => loader.loader && loader.loader.includes("sass-loader")
      );

      if (sassLoader) {
        sassLoader.options = {
          ...sassLoader.options,
          additionalData: `@use "${path.resolve(
            __dirname,
            "../assets/scss/_variables.scss"
          )}" as *;`,
        };
      }
    }

    // Fix chunk loading issues with @restart/ui and react-bootstrap
    if (config.optimization) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            enforce: true,
          },
          bootstrap: {
            test: /[\\/]node_modules[\\/](react-bootstrap|@restart)[\\/]/,
            name: "bootstrap",
            chunks: "all",
            priority: 10,
          },
        },
      };
    }

    return config;
  },
};
export default config;

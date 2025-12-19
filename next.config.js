const path = require("path");
const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Suppress Sass deprecation warnings (they're expected and don't affect functionality)
  // Most warnings come from Bootstrap's internal SCSS which we cannot fix
  // These are informational warnings about Dart Sass 3.0.0 (not yet released)
  sassOptions: {
    silenceDeprecations: ['import', 'legacy-js-api', 'global-builtin', 'if-function'],
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),       // @ -> src
      "@public": path.resolve(__dirname, "public"), // optional
    };
    
    // Also configure sass-loader directly in webpack for additional suppression
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOfRule) => {
          if (oneOfRule.test && oneOfRule.test.toString().includes('scss|sass')) {
            const sassLoader = oneOfRule.use?.find?.((loader) => {
              return loader && typeof loader === 'object' && 
                     (loader.loader?.includes('sass-loader') || loader === 'sass-loader');
            });
            
            if (sassLoader && typeof sassLoader === 'object') {
              sassLoader.options = {
                ...(sassLoader.options || {}),
                sassOptions: {
                  ...(sassLoader.options?.sassOptions || {}),
                  silenceDeprecations: ['import', 'legacy-js-api', 'global-builtin', 'if-function'],
                },
              };
            }
          }
        });
      }
    });
    
    return config;
  },
});

module.exports = nextConfig;

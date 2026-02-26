import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Global ignores
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      ".env*",
      "*.log",
      "coverage/**",
      ".nyc_output/**",
      ".cache/**",
      ".parcel-cache/**",
      "public/**",
      "supabase/.branches/**",
      "supabase/.temp/**",
      ".claude/**",
      ".vscode/**",
      ".idea/**",
      "*.swp",
      "*.swo",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Customize rules as needed
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "off", // Allow any types for Supabase and chart libraries
      "react-hooks/exhaustive-deps": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "react/no-unescaped-entities": "error",
    },
  },
];

export default eslintConfig;
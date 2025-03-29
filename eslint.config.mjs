import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Use ES module syntax for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Get the extended configuration as an object, not an array
const eslintConfig = compat.extends("next/core-web-vitals", "next/typescript");

// Use export default instead of module.exports
export default {
  ...eslintConfig,
  rules: {
    "prefer-const": ["error", { "destructuring": "all", "ignoreReadBeforeAssign": true }],
  },
};

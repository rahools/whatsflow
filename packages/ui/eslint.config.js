import baseConfig from "@whatsflow/eslint-config/base";
import reactConfig from "@whatsflow/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
  },
  ...baseConfig,
  ...reactConfig,
];

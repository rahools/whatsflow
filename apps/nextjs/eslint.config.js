import baseConfig, { restrictEnvAccess } from "@whatsflow/eslint-config/base";
import nextjsConfig from "@whatsflow/eslint-config/nextjs";
import reactConfig from "@whatsflow/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];

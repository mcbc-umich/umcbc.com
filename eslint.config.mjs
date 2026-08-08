import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Catches missing alt text and unlabelled controls at lint time (§14).
  // next/core-web-vitals already registers the jsx-a11y plugin, so we only
  // turn its stricter rules on rather than re-declaring the plugin.
  ...compat.extends("plugin:jsx-a11y/strict"),

  {
    rules: {
      // Next's <Link> renders the anchor; the plugin can't see through it.
      "jsx-a11y/anchor-is-valid": "off",
      // A scrollable region must be focusable to be keyboard-operable
      // (WCAG 2.1.1); Safari won't do it for us.
      "jsx-a11y/no-noninteractive-tabindex": [
        "error",
        {
          tags: [],
          roles: ["region", "tabpanel"],
          allowExpressionValues: true,
        },
      ],
    },
  },

  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;

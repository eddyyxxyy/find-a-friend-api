import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sort from "eslint-plugin-sort";

export default tseslint.config(
  eslint.configs.recommended,
  sort.configs["flat/recommended"],
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: "./",
      },
    },
    plugins: {
      "@stylistic": stylistic,
      "simple-import-sort": simpleImportSort,
      "sort": sort,
    },
    rules: {
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/max-len": ["error", 80, 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error"],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "sort/imports": "off",
      "sort/import-members": "off",
      "sort/string-enums": ["error", { "caseSensitive": false, "natural": true }],
      "sort/string-unions": ["error", { "caseSensitive": false, "natural": true }],
      "sort/type-properties": ["error", { "caseSensitive": false, "natural": true }]
    },
  }
);

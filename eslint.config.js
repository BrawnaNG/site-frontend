import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pluginVue from 'eslint-plugin-vue'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
    includeIgnoreFile(gitignorePath),
    ...pluginVue.configs['flat/recommended'],
    {
      files: ["**/*.js", "**/*.vue"],
      rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
      }
    }
  ];
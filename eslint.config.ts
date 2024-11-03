import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tseslint from 'typescript-eslint'
import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

const tsESLintConfig = tseslint.config(
    // eslint recommended rules
    js.configs.recommended,
    //...tseslint.configs.recommended,
    // OR more type checked rules
    //...tseslint.configs.recommendedTypeChecked,
    // OR more strict rules
    ...tseslint.configs.strictTypeChecked,
    // optional stylistic rules
    //...tseslint.configs.stylistic
    // OR the type checked version
    ...tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        }
    },
    {
        files: ['**/*.ts', '**/*.tsx']
    }
)

export default [
    ...compat.extends('next/core-web-vitals'),
    {
        ignores: [
            '.next/',
            '.vscode/',
            'public/',
        ]
    },
    {
        linterOptions: {
            reportUnusedDisableDirectives: 'warn'
        }
    },
    ...tsESLintConfig,
] satisfies FlatConfig.Config[]
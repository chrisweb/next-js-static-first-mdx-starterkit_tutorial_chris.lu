import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import * as mdx from 'eslint-plugin-mdx'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

const jsESLintConfig = [
    eslint.configs.recommended,
    {
        files: ['**/*.mjs'],
    },
]

const tsESLintConfig = tseslint.config(
    //...tseslint.configs.recommendedTypeChecked,
    // OR more strict rules
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    // nextjs
    ...compat.extends('next/core-web-vitals').map(config => ({
        ...config,
        files: ['**/*.ts?(x)', '**/*.md?(x)'],
    }))
)

const mdxESLintConfig = [
    mdx.configs.flat,
    mdx.configs.flatCodeBlocks,
    {
        files: ['**/*.md?(x)'],
        ...mdx.flat,
        processor: mdx.createRemarkProcessor({
            lintCodeBlocks: true,
            languageMapper: {},
        }),
    },
    {
        files: ['**/*.md?(x)'],
        ...mdx.flatCodeBlocks,
        rules: {
            ...mdx.flatCodeBlocks.rules,
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
]

export default [
    ...jsESLintConfig,
    ...mdxESLintConfig,
    ...tsESLintConfig,
    {
        ignores: [
            "**/node_modules/",
            "**/.next/",
            "**/.vscode/",
            "**/public/",
            "**/LICENSE",
            "tests/eslint/",
        ],
        linterOptions: {
            reportUnusedDisableDirectives: "warn"
        },
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['*.mjs'],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
]
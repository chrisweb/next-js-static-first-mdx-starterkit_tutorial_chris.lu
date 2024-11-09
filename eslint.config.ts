import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tseslint from 'typescript-eslint'
import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint'
import mdx from 'eslint-plugin-mdx'
import mdxParser from 'eslint-mdx'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const compatConfig = [
    ...compat.extends('next/core-web-vitals'),
]
/*const compatConfig = compat.config({
    extends: [
      // https://github.com/vercel/next.js/discussions/49337
      'plugin:@next/eslint-plugin-next/core-web-vitals',
      // https://github.com/facebook/react/issues/28313
      //'plugin:react-hooks/recommended',
      //'plugin:jsx-a11y/recommended',
    ],
  }
)*/

const mdxESLintConfig = [
    ...compatConfig,
    {
        files: ["**/*.md?(x)"],
        ...mdx.configs.flat,
        ...mdx.configs.flatCodeBlocks,
        languageOptions: {
            parser: mdxParser,
            parserOptions: {
                markdownExtensions: ["*.md, *.mdx"],
            },
        },
    },
] as FlatConfig.Config[]

const tsESLintConfig = tseslint.config(
    ...compatConfig,
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
        files: ['**/*.ts?(x)'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
)

export default [
    js.configs.recommended,
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
    ...mdxESLintConfig,
    ...tsESLintConfig,
] satisfies FlatConfig.Config[]
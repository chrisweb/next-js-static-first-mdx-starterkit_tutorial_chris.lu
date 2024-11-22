import eslintPlugin from '@eslint/js'
//import { FlatCompat } from '@eslint/eslintrc'
// @ts-expect-error this package has no types
import importPlugin from 'eslint-plugin-import'
import * as mdxPlugin from 'eslint-plugin-mdx'
import reactPlugin from 'eslint-plugin-react'
import tseslint, { configs as tseslintConfigs } from 'typescript-eslint'
// @ts-expect-error this package has no types
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
//import { Linter } from 'eslint'
import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint'
// @ts-expect-error this package has no types
import nextPlugin from '@next/eslint-plugin-next'

//const compat = new FlatCompat()

// when using eslint-config-next it becomes complicated
// to exclude MDX files from setup it does
// to avoid getting "parsing error: Invalid character"
/*const compatNextESLintConfig = [
    ...compat.extends('next/core-web-vitals'),
]*/
// so instead we use the same ESLint compat package
// but only include the eslint-plugin-next
/*const compatNextESLintPlugin = compat.config({
    extends: [
        // will get applied to all files
        // https://github.com/vercel/next.js/discussions/49337
        'plugin:@next/eslint-plugin-next/core-web-vitals',
    ],
})*/

const tsESLintConfig = tseslint.config(
    {
        name: 'tsESLintConfig',
        files: ['**/*.mjs', '**/*.ts?(x)'],
        // as we did not use eslint-config-next we will now
        // manually add the packages it would have added
        extends: [
            //...tseslintConfigs.recommended,
            // OR more type checked rules
            //...tseslintConfigs.recommendedTypeChecked,
            // OR more strict rules
            //...tseslintConfigs.strict,
            // OR more strict and type checked rules
            ...tseslintConfigs.strictTypeChecked,
            // optional stylistic rules
            //...tseslintConfigs.stylistic,
            // OR the type checked version
            ...tseslintConfigs.stylisticTypeChecked,
        ] as FlatConfig.ConfigArray,
        // only needed if you use TypeChecked rules
        languageOptions: {
            parserOptions: {
                // https://typescript-eslint.io/getting-started/typed-linting
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                // react recommended is already adding the ecmaFeatures
                /*ecmaFeatures: {
                    jsx: true,
                },*/
                // following option already added by eslint recommended
                // which we added in the jsESLintConfig
                //warnOnUnsupportedTypeScriptVersion: false,
            },
        },
    },
    {
        // disable type-aware linting on JS files
        // only needed if you use TypeChecked rules
        files: ['**/*.mjs'],
        ...tseslintConfigs.disableTypeChecked,
    },
)

const nextESLintConfig = [
    {
        name: 'nextESLintConfig',
        // no files for this config as we want to apply it to all files
        plugins: {
            'react': reactPlugin,
            'jsx-a11y': jsxA11yPlugin,
            /* eslint-disable @typescript-eslint/no-unsafe-assignment */
            'react-hooks': reactHooksPlugin,
            '@next/next': nextPlugin,
            'import': importPlugin,
            /* eslint-enable @typescript-eslint/no-unsafe-assignment */
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs['jsx-runtime'].rules,
            /* eslint-disable @typescript-eslint/no-unsafe-member-access */
            ...reactHooksPlugin.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,
            // this is the nextjs strict mode
            ...nextPlugin.configs['core-web-vitals'].rules,
            ...importPlugin.configs.recommended.rules,
            // the following is only needed if you use typescript
            // don't use the typescript rules from the plugin import
            // https://github.com/import-js/eslint-plugin-import/issues/2969
            //...importPlugin.configs.typescript.rules,
            //...importTypescriptPlugin.configs.recommended.rules,
            /* eslint-enable @typescript-eslint/no-unsafe-member-access */
            // rules from eslint-config-next
            'import/no-anonymous-default-export': 'warn',
            'react/no-unknown-property': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'], },],
            'jsx-a11y/aria-props': 'warn',
            'jsx-a11y/aria-proptypes': 'warn',
            'jsx-a11y/aria-unsupported-elements': 'warn',
            'jsx-a11y/role-has-required-aria-props': 'warn',
            'jsx-a11y/role-supports-aria-props': 'warn',
            'react/jsx-no-target-blank': 'off',
        } as FlatConfig.Rules,
        settings: {
            'react': {
                version: 'detect',
            },
            // only needed if you use (eslint-import-resolver-)typescript
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx', '.mjs']
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true
                }
            }
        },
    }
] as FlatConfig.Config[]

const jsESLintConfig = [
    {
        name: 'jsESLintConfig',
        // all files expect mdx files
        files: ['**/*.mjs', '**/*.ts?(x)'],
        ...eslintPlugin.configs.recommended,
        rules: {
            quotes: [
                'error',
                'single',
                { 'allowTemplateLiterals': true },
            ],
            semi: [
                'error',
                'never',
            ],
        },
    },
] as FlatConfig.Config[]

const mdxESLintConfig = [
    // https://github.com/mdx-js/eslint-mdx/blob/d6fc093fb32ab58fb226e8cf42ac77399b8a4758/README.md#flat-config
    {
        name: 'mdxFlatESLintConfig',
        files: ['**/*.mdx'],
        ...mdxPlugin.flat,
        processor: mdxPlugin.createRemarkProcessor({
            // I disabled linting code blocks
            // as I was having performance issues
            lintCodeBlocks: false,
            languageMapper: {},
        }),
    },
    {
        name: 'mdxFlatCodeBlocksESLintConfig',
        files: ['**/*.mdx'],
        ...mdxPlugin.flatCodeBlocks,
        rules: {
            ...mdxPlugin.flatCodeBlocks.rules,
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
] as FlatConfig.Config[]

export default [
    {
        name: 'ignoreESLintConfig',
        // the ignores option needs to be in a separate configuration object
        // replaces the .eslintignore file
        ignores: [
            '.next/',
            '.vscode/',
            'public/',
        ]
    },
    ...jsESLintConfig,
    ...tsESLintConfig,
    ...mdxESLintConfig,
    ...nextESLintConfig,
    //...compatNextESLintPlugin,
] satisfies FlatConfig.Config[]
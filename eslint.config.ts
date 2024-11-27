import eslintPlugin from '@eslint/js'
import tseslint, { configs as tseslintConfigs } from 'typescript-eslint'
import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint'
// @ts-expect-error this package has no types
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
// @ts-expect-error this package has no types
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
// @ts-expect-error this package has no types
import nextPlugin from '@next/eslint-plugin-next'
import stylisticPlugin from '@stylistic/eslint-plugin'

const eslintConfig = [
    {
        name: 'custom/eslint/recommended',
        files: ['**/*.ts?(x)'],
        ...eslintPlugin.configs.recommended,
    },
]

const ignoresConfig = [
    {
        name: 'custom/eslint/ignores',
        // the ignores option needs to be in a separate configuration object
        // replaces the .eslintignore file
        ignores: [
            '.next/',
            '.vscode/',
            'public/',
        ]
    },
] as FlatConfig.Config[]

const tseslintConfig = tseslint.config(
    {
        name: 'custom/typescript-eslint/recommended',
        files: ['**/*.ts?(x)'],
        extends: [
            ...tseslintConfigs.recommended,
            // OR more type checked rules
            //...tseslintConfigs.recommendedTypeChecked,
            // OR more strict rules
            //...tseslintConfigs.strict,
            // OR more strict and type checked rules
            //...tseslintConfigs.strictTypeChecked,
            // optional stylistic rules
            ...tseslintConfigs.stylistic,
            // OR the type checked version
            //...tseslintConfigs.stylisticTypeChecked,
        ] as FlatConfig.ConfigArray,
        // only needed if you use TypeChecked rules
        languageOptions: {
            parserOptions: {
                // https://typescript-eslint.io/getting-started/typed-linting
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
                warnOnUnsupportedTypeScriptVersion: true,
            },
        },
    },
    {
        // disable type-aware linting on JS files
        // only needed if you use TypeChecked rules
        // (and you have javascript files in your project)
        files: ['**/*.mjs'],
        ...tseslintConfigs.disableTypeChecked,
    },
)

const nextConfig = [
    {
        name: 'custom/next/config',
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
            ...reactHooksPlugin.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,
            // this is the nextjs strict mode
            ...nextPlugin.configs['core-web-vitals'].rules,
            ...importPlugin.configs.recommended.rules,
            //...jsxA11yPlugin.configs.recommended.rules,
            // OR more strict a11y rules
            ...jsxA11yPlugin.configs.strict.rules,
            // rules from eslint-config-next
            'import/no-anonymous-default-export': 'warn',
            'react/no-unknown-property': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-no-target-blank': 'off',
            'jsx-a11y/alt-text': ['warn', { elements: ['img'], img: ['Image'], },],
            'jsx-a11y/aria-props': 'warn',
            'jsx-a11y/aria-proptypes': 'warn',
            'jsx-a11y/aria-unsupported-elements': 'warn',
            'jsx-a11y/role-has-required-aria-props': 'warn',
            'jsx-a11y/role-supports-aria-props': 'warn',
        } as FlatConfig.Rules,
        settings: {
            'react': {
                version: 'detect',
            },
            // only needed if you use (eslint-import-resolver-)typescript
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true
                }
            }
        },
    }
] as FlatConfig.Config[]

const stylisticConfig = [
    {
        name: 'custom/stylistic/recommended',
        files: ['**/*.ts?(x)'],
        // no files for this config as we want to apply it to all files
        plugins: {
            '@stylistic': stylisticPlugin,
        },
        rules: {
            // this removes all legacy rules from eslint, typescript-eslint and react
            ...stylisticPlugin.configs['disable-legacy'].rules,
            // this adds the recommended rules from stylistic
            ...stylisticPlugin.configs['recommended-flat'].rules,
            // custom rules
            '@stylistic/indent': ['warn', 4],
            '@stylistic/quotes': ['warn', 'single'],
            '@stylistic/semi': ['warn', 'never'],
        } as FlatConfig.Rules,
    }
] as FlatConfig.Config[]

export default [
    ...eslintConfig,
    ...ignoresConfig,
    ...tseslintConfig,
    ...nextConfig,
    ...stylisticConfig,
] satisfies FlatConfig.Config[]
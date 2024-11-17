# MY_PROJECT

## npm commands (package.json scripts)

`npm run dev`: to start the development server (NOT using turbopack)  
`npm run dev-turbo`: to start the development server (using turbopack)  
`npm run build`: to make a production build  
`npm run start`: to start the server on a production server using the build we made with the previous command  
`npm run next-lint`: a backup of the original next.js linting command
`npm run lint`: to manually use our (custom) linting command, it will scan our code and help us find problems in it (gets used by the build command before building)
`npm run lint-nocache`: same as **lint** command but without cache, takes longer but can be useful when testing changes
`npm run lint-debug`: the **lint** but with the ESLint **debug** flag (for a more verbose output)
`npm run lint-fix`: the **lint** command but with the **fix** flag activated (to automatically fix errors and warnings if it can), you probably want to create a new branch before running this at it might produce a big quantity of changed files

## CI/CD pipeline for automatic deployments

Every time code gets pushed into the main branch, it will trigger a production deployment

When code gets pushed into the preview branch, it will trigger a preview deployment

<a href="https://chris.lu/web_development/tutorials/next-js-static-first-mdx-starterkit">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/chrisweb/next-js-static-first-mdx-starterkit_tutorial_chris.lu/main/public/images/readme/static_first_mdx_starterkit.avif" type="image/avif" />
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/chrisweb/next-js-static-first-mdx-starterkit_tutorial_chris.lu/main/public/images/readme/static_first_mdx_starterkit.webp" type="image/webp" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/chrisweb/next-js-static-first-mdx-starterkit_tutorial_chris.lu/main/public/images/readme/static_first_mdx_starterkit.avif" type="image/avif" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/chrisweb/next-js-static-first-mdx-starterkit_tutorial_chris.lu/main/public/images/readme/static_first_mdx_starterkit.webp" type="image/webp" />
    <img src="https://raw.githubusercontent.com/chrisweb/next-js-static-first-mdx-starterkit_tutorial_chris.lu/main/public/images/readme/static_first_mdx_starterkit.jpg" alt="chris.lu banner" />
  </picture>
</a>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

# Next.js static first MDX starterkit

This repository contains all the source code from the "[Next.js static first MDX starterkit](https://chris.lu/web_development/tutorials/next-js-static-first-mdx-starterkit)" tutorial

Every branch of this repository corresponds to a section of the tutorial.

> [!NOTE]  
> I update the main branch from time to time as it contains the final version of the source code, but I do NOT update the dependencies in the "chapter" branches  

## npm commands (package.json scripts)

`npm run dev`: to start the development server (NOT using turbopack)  
`npm run dev-turbo`: to start the development server (using turbopack)  
`npm run build`: to make a production build  
`npm run start`: to start the server on a production server using the build we made with the previous command  
`npm run next-lint`: a backup of the original next.js linting command  
`npm run lint`: to manually use our (custom) linting command, it will scan our code and help us find problems in it (gets used by the build command before building)  
`npm run lint-nocache`: same as **lint** command without cache, takes longer but can be useful when testing changes  
`npm run lint-debug`: the **lint** with the ESLint **debug** flag (for a more verbose output)  
`npm run lint-fix`: the **lint** command with the **fix** flag activated (to automatically fix errors and warnings if it can), you probably want to create a new branch before running this as it might produce a big quantity of changed files  
`npm run lint-debug-config`: will print debugging information about what gets loaded by our ESLint config  
`npm run lint-print-config`: print out a json representation of what is in our ESLint config  
`npm run lint-inspect-config`: will open `http://localhost:7777/` in your browser, which is a tool to help you visualize the content of our ESLint config  

## CI/CD pipeline for automatic deployments

Every time code gets pushed into the main branch, it will trigger a production deployment

When code gets pushed into the preview branch, it will trigger a preview deployment

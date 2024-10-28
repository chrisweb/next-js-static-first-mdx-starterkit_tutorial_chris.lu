# MY_PROJECT

## npm commands (package.json scripts)

`npm run dev`: to start the development server (NOT using turbopack)  
`npm run dev-turbo`: to start the development server (using turbopack)  
`npm run build`: to make a production build  
`npm run start`: to start the server on a production server using the build we made with the previous command  
`npm run lint`: to run a linting script that will scan our code and help us find problems in our code  

## CI/CD pipeline for automatic deployments

Every time code gets pushed into the main branch, it will trigger a production deployment

When code gets pushed into the preview branch, it will trigger a preview deployment

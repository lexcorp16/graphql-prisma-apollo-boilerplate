# graphql-prisma-apollo-boilerplate

## Setting up
 Follow the following steps to use this biloerplate for a new project;
 
 - Clone the repository by running 
  ```
  git clone https://github.com/lexcorp16/graphql-prisma-apollo-boilerplate.git
  ```
 
 - Create a `config` folder in the project root containing the following files `test.env`, `dev.env` and `prod.env`.
 
 - In the newly created files from the step above, add the following environment variables; `PRISMA_ENDPOINT`, `PRISMA_SECRET` and `JWT_SECRET`.
 
 - Update the `PRISMA_ENDPOINT` environment variable for all three environments (Dev, Test and Prod). Use your app name for the service name and the correct stage for the stage name.
 
 - Ensure you have your local (Docker) and production (Prisma Cloud) instances of prisma running.
 
 - Deploy prisma to all three environments; <br/>  From the `prisma` directorty run 
  ```
  prisma deploy -e <path-to-environment-file>
  ```
  
 - Run `npm install` from the project root to install dependencies.
 
 - Run `npm run test` to run the test suite.
 
 - Run `npm run dev` to start up the dev server.
 
 - Run `heroku create` to create a new heroku project.
 
 - Use `heroku config:set KEY=VALUE` to set up all three environment variables on Heroku that exist in `prod.env`
 
 - Deploy your app to Heroku by running `git push heroku master`
 

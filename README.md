# NC News Seeding

- Instructions for this sprint can be found at https://l2c.northcoders.com/courses/be/seeding-nc-news


+++ SETTING UP ENVIRONMENT VARIABLES +++

    .gitignore is set to ignore .env files.

    The project requires two environment variables to run correctly.

    One for development environment and one for test environment.

    1. At the root directory create a file called: .env.development
        Inside .env.development write: PGDATABASE=nc_news

    2.  At the root directory create a file called: .env.test
        Inside .env.development write: PGDATABASE=nc_news_test

    1. CHECK CONNECTION TO DEV DATABASE
        In terminal run:  npm run seed-dev
        
            --> In the logs we should see: 
            
            Connected to nc_news

    2. CHECK CONNECTION TO TEST DATABASE
        In terminal run:  npm run test-seed

            --> the test files should run (may fail tests), in the logs we should see:

            Connected to nc_news_test
    
    If above is successful we now connect to test database when using tests/jest and dev database when running via node

    
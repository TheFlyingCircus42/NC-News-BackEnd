# 📰 NC News – Back End

A responsive news web application built with React, allowing users to browse articles, vote, and interact with comments.

Originally developed during the Northcoders bootcamp, this project is actively maintained and extended as a full-stack portfolio piece.

---

## 🌐 Live Site

- https://ncnews-rh.netlify.app

---

## 🔗 Repositories

- Frontend: https://github.com/TheFlyingCircus42/NC-News-FE  
- Backend/API: https://github.com/TheFlyingCircus42/NC-News-BackEnd  

---

## 🚀 Features

- View articles by topic
- Vote on articles and comments
- Add and delete comments
- Optimistic UI updates for voting and posting
- Responsive design for mobile and desktop
- Dynamic homepage (featured + trending articles)

---

## ⚙️ Backend / API

- PostgreSQL database (Supabase)
- Node.js + Express
- RESTful API
- Hosted on Render
- Tested with Jest & Supertest

---

## 🧱 Tech Stack (Frontend)

- React (Vite)
- JavaScript (ES6+)
- CSS (custom styling)
- Netlify (deployment & CI/CD)

---

## 💻 Local Setup

Set up requires: 
- NPM & NODE - https://docs.npmjs.com/downloading-and-installing-node-js-and-npm 
- PostgresSQL - https://www.postgresql.org/download/

- Clone the repo and install dependencies:

- go to  https://github.com/TheFlyingCircus42/NC-News-BackEnd
- fork and clone repo
- cd NC-News-BackEnd
- npm install
- Set up Environment Variables (see below)
- Seed local DB (see below - requires Postgres SQL)
- run the command "npm run dev" to activate nodemon. Should return the following:
<img width="320" height="114" alt="image" src="https://github.com/user-attachments/assets/0b91cfa7-ffd6-4195-ae5c-6632c3403328" />




# NC News Seeding DB

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



---

## 🛣️ Roadmap

Ongoing improvements include:

- User authentication (login & profiles)
- Sorting and pagination
- Posting new articles
- Refactoring and performance improvements
- Migrating to TypeScript
- Expanding dataset and reseeding database


If you have any feedback or suggestions please feel free to get in touch. rob.hawkins.89@gmail.com


    

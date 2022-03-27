# terveystalo-case

Simple web app for managing laboratory tests.

## Requirements

- NodeJS
- Docker

## Start production build locally with docker

In your terminal, run

`docker-compose up`

Once done, the app should be served in [http://localhost:8080](http://localhost:8080)

To reset the app to its initial state

`docker-compose down`

`docker-compose up`

## Development

You should open two different terminal processes for these

### Backend

Run following commands in terminal

`cd backend`

`npm install`

`npm run init`

`npm run dev`

### Frontend

Run following commands in terminal

`cd frontend`

`npm install`

`npm run dev`

Once both backend and frontend are running, you should be able to visit the website at [http://localhost:3000](http://localhost:3000)

## Running tests in the backend

You must have installed the dependencies for the backend

If you are on Windows, you can run tests with

`npm run test:win`

Otherwise

`npm run test:unix`

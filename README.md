# Interview Scheduler

## Project Description

Interview Scheduler is a Single Page Application built using React. It allows users to book, cancel and edit interview appointments. Data is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format. Tests are used throughout the development of the project, using Jest, StoryBook and Cypress.

### Preview
![Show Schedule]()
![Book Appointment]()
![Edit & Delete Appointment]()

## Getting Started

#### Setup
Install dependencies with `npm install`.

### Running Webpack Development Server
```sh
npm start
```

### Running Jest Test Framework
```sh
npm test
```

### Running Storybook Visual Testbed
```sh
npm run storybook
```

## API Server
For full functionality the client and the API server applications must run at the same time. You can fork and clone the scheduler-api [here](https://github.com/lighthouse-labs/scheduler-api) and follow README instructions for setup. 

## Dependencies
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts
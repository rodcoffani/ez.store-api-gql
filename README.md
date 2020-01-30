# ez.store-api-gql

This is an update of the [ez.store-api](https://github.com/rodcoffani/ez.store-api) using GraphQL concepts and syntax.

## Dependencies
Install the dependencies using `yarn` or `npm i`\
* Dependencies:
  - apollo-datasource: ^0.6.4,
  - dotenv: ^8.2.0,
  - graphql: ^14.5.8,
  - graphql-yoga: ^1.18.3,
  - pg: ^7.17.1
* Dev Dependencies: 
  - easygraphql-tester: ^5.1.6,
  - mocha: ^7.0.0,
  - nodemon: ^2.0.0

## First steps
 - Have a Postgres database or a Docker Postgres already installed;
 - Run [this script](https://github.com/rodcoffani/ez.store-api/blob/master/scripts/postgres.sql) in it.

## Running the project
To initialize the project, run the `start` command.\
To run all the tests, run the `test` command. \

  `"start": "nodemon src/api.js",`\
  `"test": "mocha src/tests/*.js"`

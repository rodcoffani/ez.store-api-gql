const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');

const Resolvers = require('./../db/postgres/resolvers/resolvers')
const Schema = fs.readFileSync(path.join('./../db/postgres/schemas', 'schema', 'schema.graphql'), 'utf8')

describe('Postgres Tests', function () {
    this.timeout(Infinity);
    this.beforeAll( async function () {
        const tester = new EasyGraphQLTester(Schema, Resolvers);
    });

    it('Data on users table', () => {
        const query = 
        `
        {
            users {
                id
                name
                email                
            }
        }
        `;
        tester.test(true, query);
    });
});

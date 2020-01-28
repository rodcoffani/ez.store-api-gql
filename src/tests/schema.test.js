const fs = require('fs');
const path = require('path');
const EasyGraphQLTester = require('easygraphql-tester');

const schema = fs.readFileSync(path.join(__dirname, '..', '/db', '/schemas', 'schema.graphql'), 'utf8');

describe("Testing schema", () => {
    let tester;

    before(()=> {
        tester = new EasyGraphQLTester(schema);
    });

    it('Invalid query', () => {
        const gql = `
        {
            users {
                InvalidField
            }
        }
        `;
        tester.test(false, gql);
    });
    it('Selecting all users', () => {
        const gql = `
        {
            users {
                id
                name
                email
            }
        }
        `;
        tester.test(true, gql)
    });
    it('Selecting only one user', () => {
        const gql = `
        {
            user(id: 26) {
                id
                name
                email
            }
        }
        `;
        tester.test(true, gql)
    });
    it('Mocked schema', () => {
        const gql = `
        {
            users {
                id
                name
                email
                wallet {
                    balance
                }
            }
        }
        `;
        const mockedResult = tester.mock(gql);
    });
});
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const EasyGraphQLTester = require('easygraphql-tester');

const db = require('./../configs/db');
db.connect();

const schema = fs.readFileSync(path.join(__dirname, '..', '/db', '/schemas', 'schema.graphql'), 'utf8');
const resolvers = require('./../db/resolvers/resolvers');

const MOCK = {
    "data": {
        "user": {
            "id": "26",
            "name": "Rodrigo Coffani",
            "email": "rodrigo.coffani@gmail.com"
        }
    }   
}

describe("Testing schema", () => {
    let tester;

    before(()=> {
        tester = new EasyGraphQLTester(schema, resolvers);
    });
    
    it('UserByID resolver', async () => {
        const query = `
            query Test($id: ID!) {
                user(id: $id) {
                    id
                    name
                    email
                }
            }
        `
        const result = await tester.graphql(query, undefined, { db }, {id: 26});
        assert.deepEqual(result, MOCK);
    });

    it('Users resolver', async () => {
        const query = `
            query Test {
                users {
                    id
                    name
                    email
                }
            }
        `
        const { data: { users }} = await tester.graphql(query, undefined, { db }, undefined);
        const result = users.length;
        assert.ok(result >= 20);
        console.log(result);
    });
});
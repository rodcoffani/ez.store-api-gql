const fs = require('fs');
const path = require('path');
const assert = require('assert');
const EasyGraphQLTester = require('easygraphql-tester');

const db = require('./../configs/db');
db.connect();

const schema = fs.readFileSync(path.join(__dirname, '..', '/db', '/schemas', 'schema.graphql'), 'utf8');
const resolvers = require('./../db/resolvers/resolvers');

const MOCK_USER = {
    "data": {
        "user": {
            "id": "26",
            "name": "Rodrigo Coffani",
            "email": "rodrigo.coffani@gmail.com"
        }
    }   
}
const MOCK_WALLET = {
    "data": {
        "wallet": {
            "id": "26",
            "inserted_at": "1574963495000",
            "owner_user_id": "26",
        }
    } 
}
const MOCK_DONATION = {
    "data": {
        "donation": {
            "id": "1",
            "quantity": 5,
            "receiver_user_id": "6",
            "sender_user_id": "16"
        }
    }
}
const MOCK_PURCHASE = {
    "data": {
        "purchase": {
            "id": "26",
            "inserted_at": "1574963495000",
            "owner_user_id": "26",
        }
    } 
}


describe("Users resolvers", () => {
    let tester;
    before(()=> {
        tester = new EasyGraphQLTester(schema, resolvers);
    });
    
    it('One user by ID', async () => {
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
        assert.deepEqual(result, MOCK_USER);
    });

    it('All users', async () => {
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
    });
});

describe('Wallets resolvers', () => {
    let tester;
    before(()=> {
        tester = new EasyGraphQLTester(schema, resolvers);
    });

    it('One wallet by ID', async () => {
        const query = `
            query Test($id: ID!) {
                wallet(id: $id) {
                    id
                    inserted_at
                    owner_user_id
                }
            }
        `
        const result = await tester.graphql(query, undefined, { db }, {id: 26});
        assert.deepEqual(result, MOCK_WALLET);
    });

    it('All wallets', async () => {
        const query = `
            query Test {
                wallets {
                    id
                    inserted_at
                    owner_user_id
                }
            }
        `
        const { data: { wallets }} = await tester.graphql(query, undefined, { db }, undefined);
        const result = wallets.length;
        assert.ok(result >= 20);
    });
});

describe('Donations resolvers', () => {
    let tester;
    before(()=> {
        tester = new EasyGraphQLTester(schema, resolvers);
    });

    it('One donation by ID', async () => {
        const query = `
            query Test($id: ID!) {
                donation(id: $id) {
                    id
                    quantity
                    receiver_user_id
                    sender_user_id
                }
            }
        `
        const result = await tester.graphql(query, undefined, { db }, {id: 1});
        assert.deepEqual(result, MOCK_DONATION);
    });

    it('All donations', async () => {
        const query = `
            query Test {
                donations {
                    id
                    quantity
                    receiver_user_id
                    sender_user_id
                }
            }
        `
        const { data: { donations }} = await tester.graphql(query, undefined, { db }, undefined);
        const result = donations.length;
        assert.ok(result >= 100);
    });
});

describe('Purchase tests', () => {
    let tester;
    before(()=> {
        tester = new EasyGraphQLTester(schema, resolvers);
    });

    it('One purchase (value = 5)', async () => {
        const query = `
            mutation FazendoCompra {
                purchase(owner_user_id: 26, value: 5) {
                    id
                    inserted_at
                    owner_user_id
                }
            }
        `
        const result = await tester.graphql(query, undefined, { db }, {id: 1});
        assert.deepEqual(result, MOCK_PURCHASE);
    });
});
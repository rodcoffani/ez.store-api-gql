require('dotenv').config();
const pgp = require('pg-promise');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
} = require('graphql');

const db ={}
const connectionString = process.env.DATABASE_URL;
db.conn = pgp(connectionString);

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password_hash: { type: GraphQLString },
        avatar: { type: GraphQLString },
        inserted_at: { type: GraphQLString },
        updated_at: { type: GraphQLString },
        wallet: { type: WalletType },
        donations_received: [{ type: DonationType }],
        donations_sent: [{ type: DonationType }]
    })
});

const WalletType = new GraphQLObjectType({
    name: 'Wallet',
    fields: () => ({
        id: { type: GraphQLID },
        to_offer: { type: GraphQLInt },
        received: { type: GraphQLInt },
        balance: { type: GraphQLInt },
        owner_user_id: { type: GraphQLID },
        inserted_at: { type: GraphQLString },
        updated_at: { type: GraphQLString },
    }),
});

const DonationType = new GraphQLObjectType({
    name: 'Donation',
    fields: () => ({
        id: { type: GraphQLID },
        quantity: { type: GraphQLInt },
        reason: { type: GraphQLString },
        sender_user_id: { type: GraphQLID },
        receiver_user_id: { type: GraphQLID },
        donate_at: { type: GraphQLString },
        inserted_at: { type: GraphQLString },
        updated_at: { type: GraphQLString },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                const query = `SELECT * FROM users`;
                return db.conn.queryResult.many(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'Error! The error is ', err;
                    });
            }
        },
        user:  {
            type: UserType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args) {
                const query = `SELECT * FROM users WHERE id=${args.id}`;
                return db.conn.queryResult.one(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'Error! The error is ', err;
                    });
            }
        },
        wallets: {
            type: new GraphQLList(WalletType),
            resolve(parent, args) {
                const query = `SELECT * FROM wallets`;
                return db.conn.queryResult.many(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'Error! The error is ', err;
                    });
            }
        },
        wallet: {
            type: WalletType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const query = `SELECT * FROM wallets WHERE id = ${args.id}`;
                return db.conn.queryResult.many(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'Error! The error is ', err;
                    });
            }
        },
        donations: {
            type: new GraphQLList(DonationType),
            resolve(parent, args) {
                const query = `SELECT * FROM donations`;
                return db.conn.queryResult.many(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'Error! The error is ', err;
                    });
            }
        },
        donation: {
            type: DonationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                const query = `SELECT * FROM wallets WHERE id = ${args.id}`;
                return db.conn.queryResult.one(query)
                    .then(data => {
                        return data;
                    })
                    .catch(err => {
                        return 'Error! The error is ', err;
                    });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
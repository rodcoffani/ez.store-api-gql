require('dotenv').config();
const options = {
    error: function(error, e) {
        if(e.cn) {
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message);
        }
    }
}
const pgp = require('pg-promise')(options);

const db ={}
// const connectionString = process.env.DATABASE_URL;
const connectionString = {
    host: 'localhost',
    port: 5432,
    database: 'ez_coins_api_dev',
    user: 'postgres',
    password: 'postgres'
};
db.conn = pgp(connectionString);

module.exports = {
    Query: {
        users: (parent, args) => {
            const query = `SELECT * FROM users`;
            return db.conn.queryResult.many(query)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        user: (parent, args) => {
            const query = `SELECT * FROM users WHERE id=${args.id}`;
            return db.conn.queryResult.one(query)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        wallets: (parent, args) => {
            const query = `SELECT * FROM wallets`;
            return db.conn.queryResult.many(query)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        wallet: (parent, args) => {
            const query = `SELECT * FROM wallets WHERE id = ${args.id}`;
            return db.conn.queryResult.many(query)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        donations: (parent, args) => {
            const query = `SELECT * FROM donations`;
            return db.conn.queryResult.many(query)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        donation: (parent, args) => {
            const query = `SELECT * FROM wallets WHERE id = ${args.id}`;
            return db.conn.queryResult.one(query)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        teste: () => 'Aqui é só pra testar'
    }
};
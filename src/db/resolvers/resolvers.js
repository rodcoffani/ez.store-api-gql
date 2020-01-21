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
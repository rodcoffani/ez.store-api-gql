module.exports = {
    Query: {
        users: (parent, args, { db }) => {
            const query = `SELECT * FROM users`;
            return db.query(query)
                .then(data => {
                    return data.rows;
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        user: (parent, args, { db }) => {
            const query = `SELECT * FROM users WHERE id = $1`;
            return db.query(query, [args.id])
                .then(data => {
                    return data.rows[0];
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        wallets: (parent, args, { db }) => {
            const query = `SELECT * FROM wallets`;
            return db.query(query)
                .then(data => {
                    return data.rows;
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        wallet: (parent, args, { db }) => {
            const query = `SELECT * FROM wallets WHERE id = $1`;
            return db.query(query, [args.id])
                .then(data => {
                    return data.rows[0];
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        donations: (parent, args, { db }) => {
            const query = `SELECT * FROM donations`;
            return db.query(query)
                .then(data => {
                    return data.rows;
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        donation: (parent, args, { db }) => {
            const query = `SELECT * FROM donations WHERE id = $1`;
            return db.query(query, [args.id])
                .then(data => {
                    return data.rows[0];
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
    }
};
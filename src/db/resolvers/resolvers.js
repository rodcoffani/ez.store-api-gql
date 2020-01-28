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
        user: (parent, { id }, { db }) => {
            const query = `SELECT * FROM users WHERE id = $1`;
            return db.query(query, [id])
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
        wallet: (parent, { id }, { db }) => {
            const query = `SELECT * FROM wallets WHERE id = $1`;
            return db.query(query, [id])
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
        donation: (parent, { id }, { db }) => {
            const query = `SELECT * FROM donations WHERE id = $1`;
            return db.query(query, [id])
                .then(data => {
                    return data.rows[0];
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
    },
    User: {
        wallet: ( { id } , args, { db }) => {
            const query = `SELECT * FROM wallets WHERE owner_user_id = $1`;
            return db.query(query, [id])
                .then(data => {
                    return data.rows[0];
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        donations_received: ( { id } , args, { db }) => {
            const query = `SELECT * FROM donations WHERE receiver_user_id = $1`;
            return db.query(query, [id])
                .then(data => {
                    return data.rows;
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
        donations_sent: ( { id } , args, { db }) => {
            const query = `SELECT * FROM donations WHERE sender_user_id = $1`;
            return db.query(query, [id])
                .then(data => {
                    return data.rows;
                })
                .catch(err => {
                    return 'Error! The error is ', err;
                });
        },
    }
};
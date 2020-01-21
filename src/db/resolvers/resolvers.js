module.exports = {
    Query: {
        users: (parent, args, {dataSources}) => {
            dataSources.usersAPI.findUsers();
        },
        user: (parent, args, {dataSources}) => {
            dataSources.usersAPI.findUser({ id : args.id });
        },
        wallets: (parent, args, {dataSources}) => {
            dataSources.usersAPI.findWallets();
        },
        wallet: (parent, args, {dataSources}) => {
            dataSources.usersAPI.findWallet({ id: args.id });
        },
        donations: (parent, args, {dataSources}) => {
            dataSources.usersAPI.findDonations();
        },
        donation: (parent, args, {dataSources}) => {
            dataSources.usersAPI.findDonation({ id: args.id })
        },
        teste: () => 'Aqui é só pra testar'
    }
};
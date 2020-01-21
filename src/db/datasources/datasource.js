const { DataSource } = require('apollo-datasource');

class UsersAPI extends DataSource {
    constructor(database) {
        super();
        this.database = database;
    }

    initialize(config) {
        this.context = config.context;
    }

    async findUsers() {
        const users = await this.database.users.read();
        if(users.length === 0)
            return 'ERROR: No user found!'
        return users;
    }
    
    async findUser({ id: idArg }) {
        const id = idArg;
        const user = await this.database.users.read({ id: id });
        return user ? user[0] : `ERROR: User with id=${id} was not found!`;
    }

    async findWallets() {
        const wallets = await this.database.wallets.read();
        if(wallets.length === 0)
            return 'ERROR: No wallet found!'
        return wallets;
    }
    
    async findWallet({ id: idArg }) {
        const id = idArg;
        const wallet = await this.database.wallets.read({ id: id });
        return wallet ? wallet[0] : `ERROR: Wallet with id=${id} was not found!`;
    }
    
    async findDonations() {
        const donations = await this.database.donations.read();
        if(donations.length === 0)
            return 'ERROR: No donation found!'
        return donations;
    }
    
    async findDonation({ id: idArg }) {
        const id = idArg;
        const donations = await this.database.donations.read({ id: id });
        return donations ? donations[0] : `ERROR: Donation with id=${id} was not found!`;
    }

}
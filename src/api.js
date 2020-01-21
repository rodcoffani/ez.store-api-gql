const {
    GraphQLServer
} = require('graphql-yoga');

const typeDefs = 'src/db/schemas/schema.graphql';
const resolvers = require('./db/resolvers/resolvers');
const UsersAPI = require('./db/datasources/datasource');

const database = require('./configs/db');
database.connect();

const app = new GraphQLServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        usersAPI: new UsersAPI({ database })
    })
});

app
    .start(() => console.log('Server running on port', app.options.port))
    .catch(
        err => console.log(`Something went wrong while starting server: ${err}`)
    );
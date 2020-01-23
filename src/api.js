const {
    GraphQLServer
} = require('graphql-yoga');

const typeDefs = 'src/db/schemas/schema.graphql';
const resolvers = require('./db/resolvers/resolvers');

const db = require('./configs/db');
db.connect();

const app = new GraphQLServer({
    typeDefs,
    resolvers,
    context: () => ({ db })
});

app
    .start(() => console.log('Server running on port', app.options.port))
    .catch(
        err => console.log(`Something went wrong while starting server: ${err}`)
    );
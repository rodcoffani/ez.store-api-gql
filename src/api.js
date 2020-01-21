const {
    GraphQLServer
} = require('graphql-yoga');

const typeDefs = './src/db/schemas/schema.graphql'
const resolvers = './src/db/resolvers/resolvers.js'

const app = new GraphQLServer({
    typeDefs,
    resolvers
});

app
    .start(() => console.log('Server running on port', app.options.port))
    .catch(
        err => console.log(`Something went wrong while starting server: ${err}`)
    );
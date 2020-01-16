const Hapi = require('hapi');
const { graphqlHapi } = require('apollo-server-hapi');

const app = Hapi.Server({
    port: 2000
});

async function main() {
    app.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        },
    });
    
    await app.register({
        plugin: graphqlHapi,
        options: {
          path: '/graphql',
          graphqlOptions: {
            schema: myGraphQLSchema,
          },
          route: {
            cors: true,
          },
        },
      });

    await app.start();
    console.log('Server on port ', app.info.port);
    
    return app;
}

module.exports = main();
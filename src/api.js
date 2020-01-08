const Hapi = require('hapi');

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
    
    await app.start();
    console.log('Server on port ', app.info.port);
    
    return app;
}

module.exports = main();
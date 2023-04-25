const Hapi = require('@hapi/hapi');

const init = async () => {

  const server = Hapi.server({
    port: 8000,
    host: 'localhost',
  });

  await server.register({
    // eslint-disable-next-line global-require
    plugin: require('@hapi/vision'),
  });

  server.views({
    engines: {
      // eslint-disable-next-line global-require
      html: require('handlebars'),
    },
    relativeTo: __dirname,
    path: '../templates',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.view('index'),
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);

};

init();

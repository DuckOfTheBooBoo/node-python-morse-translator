/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import Hapi from '@hapi/hapi';
import vision from '@hapi/vision';
import inert from '@hapi/inert';
import Handlebars from 'handlebars';
import mime from 'mime';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  getTextToMorse,
  getMorseToText,
} from './handler.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

const init = async () => {

  // SERVER
  const server = Hapi.server({
    port: 8000,
    host: 'localhost',
    routes: {
      files: {
        relativeTo: __dirname,
      },
    },
  });

  // REGISTER
  await server.register([
    vision,
    inert,
  ]);

  // VIEWS
  server.views({
    engines: {
      // eslint-disable-next-line global-require
      html: Handlebars,
    },
    relativeTo: __dirname,
    path: '../templates',
  });

  // EXT
  server.ext('onPostHandler', (request, h) => {
    const { response } = request;

    if (response.isBoom || response.type !== 'text/html') {
      return h.continue;
    }
    response.type(mime.getType(request.path));
    return h.continue;
  });

  // ROUTES
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => h.view('index'),
    },
    {
      method: 'GET',
      path: '/src/{param*}',
      handler: (request, h) => {
        const { param } = request.params;
        
        return h.file(`./${param}`);
      },
      
    },
    {
      method: 'GET',
      path: '/api/texttomorse',
      handler: getTextToMorse,
    },
    {
      method: 'GET',
      path: '/api/morsetotext',
      handler: getMorseToText,
    },
  ]);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);

};

init();

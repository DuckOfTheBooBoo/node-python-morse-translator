/* eslint-disable import/extensions */
import Hapi from '@hapi/hapi';
import Handlebars from 'handlebars';
import vision from '@hapi/vision';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  getTextToMorse,
  getMorseToText,
} from './handler.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

const init = async () => {

  const server = Hapi.server({
    port: 8000,
    host: 'localhost',
  });

  await server.register({
    // eslint-disable-next-line global-require
    plugin: vision,
  });

  server.views({
    engines: {
      // eslint-disable-next-line global-require
      html: Handlebars,
    },
    relativeTo: __dirname,
    path: '../templates',
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => h.view('index'),
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

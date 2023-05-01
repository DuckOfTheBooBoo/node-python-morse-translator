/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import Hapi from '@hapi/hapi';
import vision from '@hapi/vision';
import inert from '@hapi/inert';
import Handlebars from 'handlebars';
import mime from 'mime';
import { spawn } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  getTextToMorse,
  getMorseToText,
  generateTone,
} from './src/handler.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));
const ALLOWED_STATIC_FILE = ['char-counter.js', 'style.css', 'download-wav.js'];
const ALLOWED_STATIC_DIR = ['src', 'styles'];

const init = async () => {

  // SERVER
  const server = Hapi.server({
    port: process.env.NODE_ENV !== 'prod' ? 9000 : 80,
    host: process.env.NODE_ENV !== 'prod' ? 'localhost' : '0.0.0.0',
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
    path: './templates',
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
      path: '/{param}/{param1*}',
      handler: (request, h) => {
        const { param, param1 } = request.params;
        
        if ((ALLOWED_STATIC_DIR.includes(param)) && (ALLOWED_STATIC_FILE.includes(param1))) {
          return h.file(`${param}/${param1}`);
        }

        const response = h.response({
          status: 'fail',
          message: 'Forbidden. You are not authorized to access this resource.',
        });
        response.code(403);
        return response;
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
    {
      method: 'GET',
      path: '/generateTone',
      handler: generateTone,
    },
  ]);

  // Executing Python API Server
  const pythonProcess = spawn('python', ['./src/python_api/api.py', '5000']);

  // Handler for exit event
  process.on('exit', () => {
    console.log('Node.js process is exiting. Terminating Python API server...');
    pythonProcess.kill('SIGTERM');
  });

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python API: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python API error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);

};

init();

const { textToMorse, morseToText } = require('./morse-code-convert');

const getTextToMorse = (request, h) => {

  const { data } = request.query;

  let response;

  if (data !== '') {
    try {
      const result = textToMorse(data);
      response = h.response({
        status: 'success',
        data: result,
      });
      response.code(200);
      return response;
  
    } catch (err) {
      console.error(err.message);

      response = h.response({
        status: 'fail',
        message: err.message,
      });

      response.code(400);
      return response;
    }

  }

  response = h.response({
    status: 'success',
    message: 'Empty string',
  });
  response.code(200);
  return response;

};

module.exports = {
  getTextToMorse,
};

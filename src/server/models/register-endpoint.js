import request from 'request';

const registerGetEndpoint = async (req, resp, options) => {
  request(options, (error, response, body) => {
    if (error) resp.status(400).send(new Error('An error occurred'));
    else {
      resp.setHeader('Cache-Control', 'max-age=7200');
      resp.send(body);
    }
  });
};

const registerPostEndpoint = async (req, resp, options) => {
  request(options, (error, response, body) => error ?
    resp.status(400).send(new Error('An error occurred')) : resp.send(body));
};

export {registerGetEndpoint, registerPostEndpoint};

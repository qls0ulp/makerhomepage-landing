const axios = require('axios');
const qs = require('qs');

exports.handler = (event, context, callback) => {
  if (event.queryStringParameters.code) {
    const { code } = event.queryStringParameters;

    axios
      .post(
        'https://api.getmakerlog.com/oauth/token/',
        qs.stringify({
          grant_type: 'authorization_code',
          code,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          auth: {
            username: process.env.CLIENT_ID,
            password: process.env.CLIENT_SECRET,
          },
        },
      )
      .then((res) => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res.data),
        });
      })
      .catch((error) => {
        callback(null, {
          statusCode: error.response.status,
          body: JSON.stringify(error.response.data),
        });
      });
  } else {
    callback(null, {
      statusCode: 200,
      body: 'ERROR: No code was provided.',
    });
  }
};

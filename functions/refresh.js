const axios = require('axios');
const qs = require('qs');

exports.handler = (event, context, callback) => {
  if (event.queryStringParameters.refresh_token) {
    // eslint-disable-next-line camelcase
    const { refresh_token } = event.queryStringParameters;

    axios
      .post(
        'https://api.getmakerlog.com/oauth/token/',
        qs.stringify({
          grant_type: 'refresh_token',
          refresh_token,
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
      body: 'ERROR: No refresh token was provided.',
    });
  }
};

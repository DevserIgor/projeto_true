export default {
  jwt: {
    secret: process.env.APP_SECRET ? process.env.APP_SECRET : '',
    expiresIn: '1d',
  },
};

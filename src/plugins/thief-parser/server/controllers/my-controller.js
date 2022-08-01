'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('thief-parser')
      .service('myService')
      .getWelcomeMessage();
  },
});

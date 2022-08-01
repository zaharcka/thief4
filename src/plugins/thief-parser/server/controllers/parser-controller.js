'use strict';

module.exports = ({ strapi }) => ({
  getAllPages(ctx) {
    ctx.body = strapi
      .plugin('thief-parser')
      .service('parseService')
      .parseAllpages();
  },
});

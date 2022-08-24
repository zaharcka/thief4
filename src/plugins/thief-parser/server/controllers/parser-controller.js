"use strict";

module.exports = ({ strapi }) => ({
  async parseAllPages(ctx) {
    const {
      request: { body },
    } = ctx;
    ctx.body = "ok";
    await strapi
      .plugin("thief-parser")
      .service("parseService")
      .parseAllPages(body);
  },
});

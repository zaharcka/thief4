"use strict";

module.exports = ({ strapi }) => ({
  async getPagesBySitemap(ctx) {
    const {
      request: { body },
    } = ctx;
    ctx.body = await strapi
      .plugin("thief-parser")
      .service("sitemapService")
      .getPagesBySitemap(body);
  },
  async getAllTask(ctx) {
    ctx.body = await strapi
      .plugin("thief-parser")
      .service("sitemapService")
      .getTasksStore();
  },
});

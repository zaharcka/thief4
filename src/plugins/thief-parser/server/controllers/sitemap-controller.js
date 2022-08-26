"use strict";

module.exports = ({ strapi }) => ({
  async getPagesBySitemap(ctx) {
    const {
      request: { body },
    } = ctx;
    ctx.body = "ok";
    strapi
      .plugin("thief-parser")
      .service("sitemapService")
      .getPagesBySitemap(body);
  },
  async getAllTask(ctx) {
    console.log("sitemap controller getAllTask");
    ctx.body = await strapi
      .plugin("thief-parser")
      .service("sitemapService")
      .getTasksStore();
  },
  async clearPageList(ctx) {
    (ctx.body = "ok"),
      await strapi
        .plugin("thief-parser")
        .service("sitemapService")
        .clearAllPages();
  },
});

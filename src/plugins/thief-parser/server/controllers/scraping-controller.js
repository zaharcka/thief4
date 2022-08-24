module.exports = ({ strapi }) => ({
  async scrapingPagesBySite(ctx) {
    const {
      request: { body },
    } = ctx;
    ctx.body = "ok";
    await strapi
      .plugin("thief-parser")
      .service("scrapingService")
      .fillPagesByHTMLbySiteId(body);
  },
});

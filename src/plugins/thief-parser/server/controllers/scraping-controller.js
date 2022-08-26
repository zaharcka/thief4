module.exports = ({ strapi }) => ({
  scrapingPagesBySite(ctx) {
    const {
      request: { body },
    } = ctx;
    ctx.body = "ok";
    strapi
      .plugin("thief-parser")
      .service("scrapingService")
      .fillPagesByHTMLbySiteId(body);
  },
});

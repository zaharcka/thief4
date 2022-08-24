const axios = require("axios");
const cheerio = require("cheerio");
("use strict");

module.exports = ({ strapi }) => ({
  async parseAllPages(data) {
    const pages = await strapi.entityService.findMany("api::page.page", {
      fields: ["URL", "id", "html"],
      filters: { site: data.id },
    });

    const currentSite = await strapi.entityService.findOne(
      "api::site.site",
      data.id
    );

    const getContent = ({ html, parseConfig }) => {
      const {
        content: { selector: contentSelector, context: contentContext },
        title: { selector: titleSelector, context: titleContext },
        selectorsForDelete,
      } = parseConfig;
      const A = cheerio.load(html);

      const res = A(contentSelector, contentContext);
      selectorsForDelete.forEach((selector) => {
        res.find(selector).remove();
      });
      let title = A(titleSelector, titleContext).text();

      const render = res.html() ? res.html().trim() : res.html();

      return {
        title,
        content: render,
      };
    };

    const { articles_parser_config: parseConfig } = currentSite;
    for (const page of pages) {
      const content = getContent({ html: page.html, parseConfig });
      await strapi.entityService.update("api::page.page", page.id, {
        data: {
          content: content.content,
          title: content.title,
        },
      });
    }
  },
});

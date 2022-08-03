const axios = require("axios");
("use strict");

module.exports = ({ strapi }) => ({
  async fillPagesByHTMLbySiteId(data) {
    const pages = await strapi.entityService.findMany("api::page.page", {
      fields: ["URL", "id"],
      filters: { site: data.id },
    });

    console.log("pages>>>>", pages);

    for (const page of pages) {
      const content = await axios.get(`${page.URL}`);
      await strapi.entityService.update("api::page.page", page.id, {
        data: {
          html: content.data,
        },
      });
      console.log(`Page ${page.URL} saved`);
    }

    console.log("fillPagesByHTMLbySiteId>>>>");
    return "res";
  },
});
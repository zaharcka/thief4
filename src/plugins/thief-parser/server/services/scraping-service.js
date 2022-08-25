const axios = require("axios");
("use strict");

module.exports = ({ strapi }) => ({
  async fillPagesByHTMLbySiteId(data) {
    const pages = await strapi.entityService.findMany("api::page.page", {
      fields: ["URL", "id"],
      filters: { site: data.id },
    });
    console.log("Total pages>>>>", pages);
    let i = 1;
    for (const page of pages) {
      console.log(`Getting HTML.... ${i}/${pages.length}`, page.URL);
      const content = await axios.get(`${page.URL}`);
      await strapi.entityService.update("api::page.page", page.id, {
        data: {
          html: content.data,
        },
      });
      console.log(`Page ${page.URL} saved`);
    }
    return "res";
  },
});

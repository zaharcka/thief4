const Sitemapper = require("sitemapper");
'use strict';

const getPagesOfSiteByItsSitemap = async (domain) => {
  if (domain) {
    const sitemap = new Sitemapper();
    try {
      //TODO: проверять, https или http
      const res = await sitemap.fetch(`https://${domain}/sitemap.xml`);
      return {
        totalPages: res.sites.length,
        pages: res,
        error: null,
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  } else {
    throw new Error("Не указан домен");
  }
};

module.exports = ({ strapi }) => ({
  async parseAllPages(data) {
    const {domain, id: site} = data;
    const pagesArray = await getPagesOfSiteByItsSitemap(domain);
    pagesArray.pages.sites.forEach(pagesURL => {
      try {
        strapi.entityService.create('api::page.page', {
          data: {
            URL: pagesURL,
            site
          }
        })
      } catch (e) {
        console.log(`Error  while creating page ${pagesURL}`)
      };
    })


    return 'ok';

  }
});

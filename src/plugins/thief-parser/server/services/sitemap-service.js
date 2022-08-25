const Sitemapper = require("sitemapper");
const { v4: uuidv4 } = require("uuid");
let store = require("../taskStore");
const axios = require("axios");

let taskStore = store().taskStore;

("use strict");

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
  async getTasksStore() {
    return taskStore.taskStore;
  },
  async getPagesBySitemap(data) {
    console.log("getPagesBySitemap >>>>", data.domain);
    const { domain, id: site } = data;
    const taskId = uuidv4();
    const task = {
      type: "fetchBySitemap",
      title: `Getting pages y sitemap of ${domain}`,
      id: taskId,
      affect: {
        sites: [site],
      },
    };
    taskStore.push(task);
    console.log("HERE1, site>>>>", site);
    const pagesArray = await getPagesOfSiteByItsSitemap(domain);
    console.log("HERE2, pagesArray length>>>>", pagesArray.totalPages);

    /*pagesArray.pages.sites.forEach((pagesURL, index, array) => {
      try {
        console.log(`creating.... ${index + 1}/${array.length}`, pagesURL);
        // TODO AWAIT !!!!
        strapi.entityService.create("api::page.page", {
          data: {
            URL: pagesURL,
            site,
          },
        });
      } catch (e) {
        console.log(`Error  while creating page ${pagesURL}`);
      }
    });*/

    let index = 0;

    for (const pagesURL of pagesArray.pages.sites) {
      const sleshes = pagesURL.split("/").length - 1;
      if (sleshes < 4) {
        console.log(
          `creating.... ${index + 1}/${pagesArray.pages.sites.length}`,
          pagesURL
        );
        await strapi.entityService.create("api::page.page", {
          data: {
            URL: pagesURL,
            site,
          },
        });
        console.log(`creating success`);
      } else {
        console.log(`Pass ${pagesURL} 'cause sleshes = ${sleshes}`, pagesURL);
      }

      index = index + 1;
    }
  },
  async clearAllPages(data) {
    console.log("clearAllPages >>>>", data.domain);
    const { domain, id: site } = data;
    const pages = await strapi.entityService.findMany("api::page.page", {
      fields: ["URL", "id"],
      filters: { site: data.id },
    });

    for (const page of pages) {
      await strapi.entityService.delete("api::page.page", page.id);
      console.log(`Page ${page.URL} deleted`);
    }
  },
});

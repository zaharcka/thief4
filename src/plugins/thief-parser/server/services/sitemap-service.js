const Sitemapper = require("sitemapper");
const { v4: uuidv4 } = require("uuid");
let store = require("../taskStore");

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
    const pagesArray = await getPagesOfSiteByItsSitemap(domain);
    pagesArray.pages.sites.forEach((pagesURL) => {
      try {
        strapi.entityService.create("api::page.page", {
          data: {
            URL: pagesURL,
            site,
          },
        });
      } catch (e) {
        console.log(`Error  while creating page ${pagesURL}`);
      }
    });
    setTimeout(() => {
      console.log("DELETE TASK...");
      taskStore = taskStore.filter((item) => item.id !== taskId);
    }, 10000);
    return "ok";
  },
});

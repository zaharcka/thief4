module.exports = [
  {
    method: "POST",
    path: "/parseSite/:id",
    handler: "sitemapController.getPagesBySitemap",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getTaskStore",
    handler: "sitemapController.getAllTask",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/startCrawler/:id",
    handler: "scrapingController.scrapingPagesBySite",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/startParsing/:id",
    handler: "parseController.parseAllPages",
    config: {
      policies: [],
      auth: false,
    },
  },
];

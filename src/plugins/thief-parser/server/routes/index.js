module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "myController.index",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/parseSite/:id",
    handler: "parseController.getAllPages",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getTaskStore",
    handler: "parseController.getAllTask",
    config: {
      policies: [],
      auth: false,
    },
  },
];

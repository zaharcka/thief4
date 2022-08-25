const path = require("path");
const process = require("process");

module.exports = ({ env }) => ({
  connection: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    useNullAsDefault: true,
  },
});

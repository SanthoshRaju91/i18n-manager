/**
* Configuration main file for the application
* includes configuraion for server PORT, LOGS location
*/
import path from "path";

const ENV = process.env.NODE_ENV;
const logFileName =
  ENV === "production" ? `logs/production.log` : `logs/development.log`;

module.exports = {
  PORT: ENV === "production" ? 9000 : 3000,
  LOGS: logFileName,
  FILEDB: ENV === "test" ? "mirage" : "db",
  SECRET: "Somethingsecret"
};

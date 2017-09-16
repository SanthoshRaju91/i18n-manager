/**
* Main server file for starting the node server.
* Server listens on PORT 3000 (for development) & 9000 (for production)
*/
import express from "express";
import { PORT } from "./config";
import logger from "./utils/logger";
import middlewares from "./config/middleware";
import { ConfigRoutes } from "./routes";

// creating an express application instance
const app = new express();

// applying middlewares for server instance
middlewares(app);

app.use("/api", [ConfigRoutes]);

// listening on server configured PORT
app.listen(PORT, err => {
  if (err) {
    logger.error(`Could not start the server: ${err}`);
  } else {
    logger.log(`Server running on PORT: ${PORT}`);
  }
});

/*
* Making the application instance exportable only on test environment
* This is required for testing framework
*/
if (process.env.NODE_ENV === "test") {
  module.exports = app;
}

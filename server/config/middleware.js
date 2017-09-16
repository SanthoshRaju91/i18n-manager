/**
* Middleware configuratin for the application.
* configures body-parser, morgan request logging for dev, enabling cors (cross platform compatibility)
*/
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";

/* CORS options for the server instance*/
const corsOptions = {
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extend: false }));
  app.use(morgan("dev"));
  app.use(cors(corsOptions));
};

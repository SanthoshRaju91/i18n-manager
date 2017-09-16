import { Router } from "express";
import fs from "fs";
import FileDB from "../../utils/FileDB";
import { FILEDB } from "../../config";

const ConfigRoutes = new Router();

/**
* Request API for getting the app configuration
* @API getAppConfig
*/
ConfigRoutes.get("/getAppConfig", (req, res) => {
  if (!fs.existsSync(`${FILEDB}/config.json`)) {
    res.json({
      success: false,
      config: {
        isConfigured: false,
        message: "Application not configured"
      }
    });
  } else {
    let instance = new FileDB("config.json");
    let config = instance.getData();
    res.json({
      success: true,
      config
    });
  }
});

ConfigRoutes.post("/configure", async (req, res) => {
  let config = {
    name: req.body.name,
    store: req.body.store,
    scm: req.body.scm,
    scmURL: req.body.scmURL,
    location: req.body.location
  };

  try {
    let instance = new FileDB("config.json");
    await instance.writeData(config);
    res.json({
      success: true
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Something went wrong"
    });
  }
});

export default ConfigRoutes;

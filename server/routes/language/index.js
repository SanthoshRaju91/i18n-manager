import { Router } from "express";
import {
  authenticateUserSCM,
  decryptPassword,
  readSalt
} from "../../utils/connection";
import logger from "../../utils/logger";

const LanguageRoutes = new Router();

LanguageRoutes.post("/addNewLanguage", async (req, res) => {
  try {
    let { username, password, data } = req.body;
    let salt = readSalt();
    let dPassword = decryptPassword(password, salt);

    let response = await authenticateUserSCM(username, password);

    if (response) {
    } else {
      throw response;
    }
  } catch (err) {
    logger.error(`Something went wrong while adding new language: ${err}`);
    res.json({
      success: false,
      message: "Something went wrong"
    });
  }
  // authenicate with SCM
  let response = await authenticateUserSCM(username, dPassword);
});

export default LanguageRoutes;

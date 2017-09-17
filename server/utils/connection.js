import { MongoClient } from "mongodb";
import logger from "./logger";
import config from "../db/config.json";
import curl from "curlrequest";

/**
* Function to establish a connection with MongoDB on DB configuration
* @method checkMongoConnection
* @param url - MongoDB URL
*/
export const checkMongoConnection = async (url = "") => {
  return await new Promise((resolve, reject) => {
    try {
      MongoClient.connect(url, (err, db) => {
        if (err) {
          throw err;
        } else {
          logger.log(`Connection was established to: ${url}`);
          resolve(db);
        }
      });
    } catch (err) {
      logger.error(`Could not connect to mongoDB: ${err}`);
      reject(err);
    }
  });
};

/**
* Function to authenticate a user over the configured SCM like git / bitbucket / stash
* @method authenticateUserSCM
* @param username - SCM username
* @param password - SCM password
*/
export const authenticateUserSCM = async (username, password) => {
  return await new Promise((resolve, reject) => {
    if (config.scm === "GIT") {
      let gitURL = config.scmURL;
      curl.request(
        { url: gitURL, user: `${username}:${password}` },
        (err, response) => {
          if (err) {
            logger.error(`Error in authenticating: ${err}`);
            reject(err);
          } else {
            logger.log("authenticated git account");
            resolve(response);
          }
        }
      );
    } else if (config.scm === "BIT" || config.scm === "STASH") {
      let url = config.scmURL;
      curl.request(
        {
          url,
          user: `${username}:${password}`,
          headers: { "Content-Type": "application/json" }
        },
        (err, response) => {
          if (err) {
            logger.error(
              `Error in authenticating ${config.scm} account : ${err}`
            );
            reject(err);
          } else {
            logger.log(`Authenticated ${config.scm} account`);
            resolve(response);
          }
        }
      );
    }
  });
};

import { Router } from 'express';

import {
  authenticateUserSCM,
  decryptPassword,
  readSalt
} from '../../utils/connection';

import logger from '../../utils/logger';
import {
  addNewLanguageAPI,
  addNewKeyAPI,
  updateKeysValueAPI
} from '../../modules/api-language';

const LanguageRoutes = new Router();

LanguageRoutes.post('/addNewLanguage', async (req, res) => {
  try {
    let { username, password, data } = req.body;
    // let salt = readSalt();
    // let dPassword = decryptPassword(password, salt);

    // let response = await authenticateUserSCM(username, password);
    let response = true;
    if (response) {
      let addResponse = addNewLanguageAPI(data);
      if (addResponse) {
        res.json({
          success: true,
          message: 'New language added'
        });
      } else {
        throw 'Could not add new language';
      }
    } else {
      throw response;
    }
  } catch (err) {
    logger.error(`Something went wrong while adding new language: ${err}`);
    res.json({
      success: false,
      message: 'Something went wrong'
    });
  }
});

LanguageRoutes.post('/addNewKey', async (req, res) => {
  try {
    let { username, password, data } = req.body;
    // let salt = readSalt();
    // let dPassword = decryptPassword(password, salt);

    // let response = await authenticateUserSCM(username, password);
    let response = true;
    if (response) {
      let newKey = addNewKeyAPI(data);

      if (newKey) {
        res.json({
          success: true,
          message: 'New key added to the path'
        });
      } else {
        throw 'Could not add new key';
      }
    } else {
      throw response;
    }
  } catch (err) {
    logger.error(
      `Something went wrong while adding new key to language: ${err}`
    );
    res.json({
      success: false,
      message: 'Something went wrong'
    });
  }
});

export default LanguageRoutes;

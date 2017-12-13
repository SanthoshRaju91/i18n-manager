import { Router } from 'express';
import logger from '../../utils/logger';
import * as ActivityLogger from '../../utils/activity-log';

import {
  addNewLanguageAPI,
  addNewKeyAPI,
  updateKeysValueAPI,
  deleteKeyAPI,
  getTranslation
} from '../../modules/api-language';

const LanguageRoutes = new Router();

LanguageRoutes.post('/addNewLanguage', (req, res, next) => {
  try {
    let { data } = req.body;

    let addResponse = addNewLanguageAPI(data);

    if (addResponse) {
      
      newLangLogger(req.username, data);
      
      res.status(200).json({
        success: true,
        message: 'New language added'
      });
    } else {
      throw 'Could not add new language';
    }
  } catch (err) {
    next(err);
  }
});

LanguageRoutes.post('/addNewKey', (req, res, next) => {
  try {
    let { data } = req.body;

    let newKey = addNewKeyAPI(data);

    if (newKey) {

      newKeyLogger(req.username, data);

      res.status(200).json({
        success: true,
        message: 'New key added to the path'
      });
    } else {
      throw 'Could not add new key';
    }
  } catch (err) {
    next(err);
  }
});

LanguageRoutes.get('/getTranslation/:lang', async (req, res, next) => {
  try {
    let { lang } = req.params;

    let translations = await getTranslation(lang);

    res.status(200).json({
      success: true,
      translations
    });
  } catch (err) {
    next(err);
  }
});

LanguageRoutes.post('/update', async (req, res, next) => {
  try {
    let { data} = req.body;

    let updated = await updateKeysValueAPI(data);

    if (updated) {     

      updateKeyValueLogger(req.username, data);

      res.status(200).json({
        success: true,
        message: 'Value updated'
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Value was not updated'
      });
    }
  } catch (err) {
    next(err);
  }
});

LanguageRoutes.post('/delete', (req, res, next) => {
  try {
    let { data } = req.body;

    let deleted = deleteKeyAPI(data);

    if (deleted) {

      deleteKeyLogger(req.username, data);

      res.status(200).json({
        success: true,
        message: 'Deleted'
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Unable to delete'
      });
    }
  } catch (err) {
    next(err);
  }
});

LanguageRoutes.get('/activities/last', (req, res, next) => {
  try {
    let lastActivity = ActivityLogger.getLastActivity() || [];

    res.status(200).json({
      success: true,
      activity: lastActivity
    });
  } catch(err) {
    next(err);
  }
});

LanguageRoutes.get('/activities/all', (req, res, next) => {
  try {
    let activites = ActivityLogger.getActivities() || [];

    res.status(200).json({
      success: true,
      activites
    });
  } catch(err) {
    next(err);
  }
});

/** Activity logger utility functions **/

/**
 * Function to log new language added
 * @method newLangLogger
 * @param {String} user
 * @param {Object} data
 */
function newLangLogger(user, data) {

  let log = {
    user,
    message: `Added new language ${data.label} (${data.key})`,
    date: Date.now()
  };

  ActivityLogger.logActivity(log);
}

/**
 * Function to log if a key is deleted
 * @method deleteKeyLogger
 * @param {String} user
 * @param {Object} data
 */
function deleteKeyLogger(user, data) {
  let log = {
    user,
    message: `Deleted key on the path ${data.keyPath}`,
    date: Date.now()
  };

  ActivityLogger.logActivity(log);
}


/**
 * Function to log if a key's value is updated
 * @method updateKeyValueLogger
 * @param {String} user
 * @param {Object} data
 */
function updateKeyValueLogger(user, data) {
  let log = {
    user,
    message: `Updated key's ${data.keyPath} for language ${data.lang}`,
    date: Date.now()
  };

  ActivityLogger.logActivity(log);
}

/**
 * Function to log if a new key is added
 * @method newKeyLogger
 * @param {String} user
 * @param {Object} data
 */
function newKeyLogger(user, data) {
  let log = {
    user,
    message: `Added a new key ${data.key} to path ${data.keyPath}`,
    date: Date.now()
  };

  ActivityLogger.logActivity(log);
}

export default LanguageRoutes;

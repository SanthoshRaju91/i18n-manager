import { Router } from 'express';
import logger from '../../utils/logger';

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
  } catch (err) {
    next(err);
  }
});

LanguageRoutes.post('/delete', (req, res, next) => {
  try {
    let { data } = req.body;

    let deleted = deleteKeyAPI(data);

    if (deleted) {
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

export default LanguageRoutes;

import FileDB from '../utils/FileDB';
import addNewLanguage from './file/add-new-language';
import addNewKey from './file/add-new-key';
import updateKeysValue from './file/update-keys-value';
import getTranslationFromFile from './file/get-translation';

import logger from '../utils/logger';

const configInstance = new FileDB('config.json');
const store = configInstance.getData().store;
const DB_STORE = 'DB';
const FILE_STORE = 'FILE';

export const addNewLanguageAPI = async data => {
  try {
    if (store === DB_STORE) {
      //TODO: Add MongoDB integration
    } else if (store === FILE_STORE) {
      await addNewLanguage(data);
      return true;
    }
  } catch (err) {
    logger.error(
      `Something went wrong while adding translation to ${store}: ${err} `
    );
    return false;
  }
};

export const addNewKeyAPI = async data => {
  try {
    if (store === DB_STORE) {
      //TODO: Add MongoDB integration
    } else if (store === FILE_STORE) {
      await addNewKey(data);
      return true;
    }
  } catch (err) {
    logger.error(
      `Something went wrong while adding new key to the translation: ${err}`
    );

    return false;
  }
};

export const updateKeysValueAPI = async data => {
  try {
    if (store === DB_STORE) {
      //TODO: Add MongoDB integration
    } else if (store === FILE_STORE) {
      await updateKeysValue(data);
      return true;
    }
  } catch (err) {
    logger.error(
      `Something went wrong while updating key's value to the translation: ${err}`
    );

    return false;
  }
};

export const getTranslation = async data => {
  try {
    if (store === DB_STORE) {
      //TODO: MongoDB wiring
    } else if (store === FILE_STORE) {
      let { lang } = data;
      let { translation } = await getTranslationFromFile(lang);
      return translation;
    }
  } catch (err) {
    logger.error(
      `Could not fetch translation for the language ${data.lang} - ${err}`
    );
    return {};
  }
};

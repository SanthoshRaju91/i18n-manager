import FileDB from '../utils/FileDB';
import { addNewLanguage } from './file/add-new-language';
import { addNewKey } from './file/add-new-key';
import { updateKeysValue } from './file/update-keys-value';
import logger from '../utils/logger';

const configInstance = new FileDB('config.json');
const store = configInstance.getData().store;

export const addNewLanguageAPI = async data => {
  try {
    if (store === 'DB') {
      //TODO: Add MongoDB integration
    } else if (store === 'FILE') {
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
    if (store === 'DB') {
      //TODO: Add MongoDB integration
    } else if (store === 'FILE') {
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
    if (store === 'DB') {
      //TODO: Add MongoDB integration
    } else if (store === 'FILE') {
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

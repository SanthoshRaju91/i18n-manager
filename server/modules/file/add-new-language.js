import FileDB from '../../utils/FileDB';
import logger from '../../utils/logger';

/**
* Function for adding new language to the translation manager, FILEDB.
* @method addNewLanguage
* @param data
*/
export const addNewLanguage = data => {
  return new Promise((resolve, reject) => {
    try {
      let langInstance = new FileDB('language.json');
      let translationInstance = new FileDB(`translations/${data.key}.json`);

      // updating the language JSON
      let { key, label, translation } = data;
      langInstance.update(key, label);

      //adding translation content to the translation file
      translationInstance.writeData(translation);
      resolve();
    } catch (err) {
      logger.error(`Something went wrong while adding new translation` + err);
    }
  });
};

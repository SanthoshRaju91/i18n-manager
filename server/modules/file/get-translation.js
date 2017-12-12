import logger from '../../utils/logger';
import FileDB from '../../utils/FileDB';

/**
* Function to get translation json for the given lang key
* @method getTranslationFromFile
* @param lang
*/

const getTranslationFromFile = (lang = 'en') => {
  return new Promise((resolve, reject) => {
    try {
      let langTranslation = new FileDB(`translations/${lang}.json`);

      let translation = langTranslation.getData();

      resolve({
        translation
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default getTranslationFromFile;

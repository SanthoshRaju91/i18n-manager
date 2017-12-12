import FileDB from '../../utils/FileDB';
import logger from '../../utils/logger';
import setByPath from '../../utils/objecter';

/**
* Function to add new key to the translation json files
* @method addNewKey
* @param data
*/
const addNewKey = data => {
  return new Promise((resolve, reject) => {
    var { keyPath, key, value } = data;

    if (keyPath && key && value) {
      let langs = new FileDB('language.json');

      let languages = langs.getData();

      let langKeys = Object.keys(languages);

      langKeys.map(current => {
        let langTranslation = new FileDB(`translations/${current}.json`);

        let translation = langTranslation.getData();

        setByPath(translation, `${keyPath}.${key}`, value);

        langTranslation.writeData(translation);
      });

      resolve();
    } else {
      reject('Missing required keys');
    }
  });
};

export default addNewKey;

import FileDB from '../../utils/FileDB';
import logger from '../../utils/logger';

/**
* Function to add new key to the translation json files
* @method addNewKey
* @param data
*/
export const addNewKey = data => {
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

function setByPath(obj, path, value) {
  var parts = path.split('.');
  var o = obj;
  if (parts.length > 1) {
    for (var i = 0; i < parts.length - 1; i++) {
      if (!o[parts[i]]) o[parts[i]] = {};
      o = o[parts[i]];
    }
  }

  o[parts[parts.length - 1]] = value;
}

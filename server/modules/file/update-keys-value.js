import logger from '../../utils/logger';
import FileDB from '../../utils/FileDB';
import setByPath from '../../utils/objecter';

/**
* Function to update given key's value for the selected language.
* @method updateKeysValue
* @param data
*/
const updateKeysValue = data => {
  return new Promise((resolve, reject) => {
    var { lang, keyPath, value } = data;

    if (lang && keyPath && value) {

      let langInstance = new FileDB(`translations/${lang}.json`);

      let translation = langInstance.getData();

      setByPath(translation, keyPath, value);

      langInstance.writeData(translation);

      resolve();
    } else {
      reject('Missing required keys');
    }
  });
};

export default updateKeysValue;

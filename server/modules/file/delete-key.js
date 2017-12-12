import logger from '../../utils/logger';
import FileDB from '../../utils/FileDB';
import { deleteByPath } from '../../utils/objecter';

const deleteKey = async keyPath => {
  return await new Promise((resolve, reject) => {
    if (keyPath) {
      let langs = new FileDB('language.json');

      let languages = langs.getData();

      let langKeys = Object.keys(languages);

      langKeys.map(current => {
        let langTranslation = new FileDB(`translations/${current}.json`);

        let translation = langTranslation.getData();

        deleteByPath(translation, keyPath);

        langTranslation.writeData(translation);
      });

      resolve();
    } else {
      reject('Missing key path');
    }
  });
};

export default deleteKey;

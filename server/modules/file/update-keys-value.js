

/**
* Function to update given key's value for the selected language.
* @method updateKeysValue
* @param data
*/
export const updateKeysValue = data => {

  return new Promise((resolve, reject) => {
    var { lang, translation } = data;

    if(lang && translation) {

    } else {
      reject('Missing required keys');
    }
  });
}

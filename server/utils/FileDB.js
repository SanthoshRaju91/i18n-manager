import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import logger from "../utils/logger";
import { FILEDB } from "../config";

export default class FileDB {
  /**
  * constructor method, initializing the adapter and assiging it
  * to db instance
  * @method constructor
  * @param props - constructor propertier
  */
  constructor(props) {
    let adapter = new FileSync(`${FILEDB}/${props}`);
    this.db = lowdb(adapter);
    this.db.defaults({}).write();
  }

  /**
  * Function to get the db instance data
  * @method getData
  */
  getData(args = []) {
    if (args.length) {
      return this.db.get(args).__wrapped__;
    }
    return this.db.get().__wrapped__;
  }

  /**
  * Function to write the data to instance, this will replace the complete content in the
  * file.
  * @method writeData
  * @param data - Data to be written.
  */
  async writeData(data) {
    return await new Promise((resolve, reject) => {
      try {
        this.db.setState(data).write();
        resolve();
      } catch (err) {
        reject(err);
        logger.error(`Something went wrong while writing to file: ${err}`);
      }
    });
  }

  /**
  * Function for updating the key's value
  * @method update
  * @param key - object key
  * @param value - key's value
  */
  async update(key, value) {
    return await new Promise((resolve, reject) => {
      try {
        this.db.set(key, value).write();
        resolve();
      } catch (err) {
        reject(err);
        logger.error(`Something went wrong while updating the keys: ${err}`);
      }
    });
  }
}

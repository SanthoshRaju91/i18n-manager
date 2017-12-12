import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import logger from './logger';
import curl from 'curlrequest';
import { SECRET } from '../config';
import crypto from 'crypto';
import cryptoJS from 'crypto-js';
import FileDB from './FileDB';
import { FILEDB } from '../config';

/**
* Function to establish a connection with MongoDB on DB configuration
* @method checkMongoConnection
* @param url - MongoDB URL
*/
export const checkMongoConnection = async (url = '') => {
  return await new Promise((resolve, reject) => {
    try {
      MongoClient.connect(url, (err, db) => {
        if (err) {
          throw err;
        } else {
          logger.log(`Connection was established to: ${url}`);
          resolve(db);
        }
      });
    } catch (err) {
      logger.error(`Could not connect to mongoDB: ${err}`);
      reject(err);
    }
  });
};

/**
* Function to authenticate a user over the configured SCM like git / bitbucket / stash
* @method authenticateUserSCM
* @param username - SCM username
* @param password - SCM password
*/
export const authenticateUserSCM = async (username, password) => {
  return await new Promise((resolve, reject) => {
    const configInstance = new FileDB('config.json');
    const config = configInstance.getData();

    if (config.scm === 'GIT') {
      let gitURL = config.scmURL;
      curl.request(
        { url: gitURL, user: `${username}:${password}` },
        (err, response) => {
          if (err) {
            logger.error(`Error in authenticating: ${err}`);
            reject(err);
          } else if (
            JSON.parse(response).message ||
            JSON.parse(response).message === 'Bad credentials'
          ) {
            logger.error(`Error in authenticating: ${response}`);
            reject(response);
          } else {
            logger.log('authenticated git account');
            getUser(username).then(response => {
              let { name, email, username } = response;
              resolve({
                token: signToken({
                  name,
                  username,
                  email
                }),
                name
              });
            });
          }
        }
      );
    } else if (config.scm === 'BIT' || config.scm === 'STASH') {
      let url = config.scmURL;
      curl.request(
        {
          url,
          user: `${username}:${password}`,
          headers: { 'Content-Type': 'application/json' }
        },
        (err, response) => {
          if (err) {
            logger.error(
              `Error in authenticating ${config.scm} account : ${err}`
            );
            reject(err);
          } else if (
            JSON.parse(response).message ||
            JSON.parse(response).message === 'Bad credentials'
          ) {
            logger.error(`Error in authenticating : ${response}`);
            reject(response);
          } else {
            logger.log(`Authenticated ${config.scm} account`);
            resolve(response);
          }
        }
      );
    }
  });
};

/**
* Function to generate a authentication salt.
* @method generateSalt
*/
export const generateSalt = () => {
  try {
    let salt = crypto.createHash('md5').update(SECRET).digest('hex');
    let instance = new FileDB('salt.json');
    instance.writeData({ salt });
  } catch (err) {
    logger.error(`Something went wrong in generating salt: ${err}`);
    return err;
  }
};

/**
* Function to read the generated salt from file db
* @method readSalt
*/
export const readSalt = () => {
  try {
    let instance = new FileDB('salt.json');
    let { salt } = instance.getData();
    if (salt) {
      return salt;
    } else {
      let genSalt = crypto.createHash('md5').update(SECRET).digest('hex');
      instance.writeData({ salt: genSalt });
      salt = instance.getData().salt;
      return salt;
    }
  } catch (err) {
    logger.error(`Something went wrong while reading the salt: ${err}`);
    return err;
  }
};

/**
* Function to encrypt the password, this is helper internally for test cases.
* @method encryptPassword
* @param password - user provided password
* @param salt - backend generated salt
*/
export const encryptPassword = (password, salt) => {
  try {
    let cpassword = cryptoJS.AES.encrypt(password, salt);
    return cpassword;
  } catch (err) {
    logger.error(`Something went wrong in generating password crypt: ${err}`);
    return err;
  }
};

/**
* Function to decrypt the password.
* @method decryptPassword
* @param passwordHash - Hashed password
* @param salt - backend generated salt
*/
export const decryptPassword = (passwordHash, salt) => {
  try {
    let password = cryptoJS.AES.decrypt(passwordHash.toString(), salt);
    return password.toString(cryptoJS.enc.Utf8);
  } catch (err) {
    logger.error(`Error in decrypting the password: ${err}`);
    return err;
  }
};

export const signToken = payload => {
  try {
    let token = jwt.sign(payload, SECRET, { expiresIn: '3h' });
    return token;
  } catch (err) {
    logger.error(`Error in signing the token: ${err}`);
    return err;
  }
};

export const getUser = async user => {
  return await new Promise((resolve, reject) => {
    try {
      curl.request(
        {
          url: `https://api.github.com/users/${user}`
        },
        (err, response) => {
          if (err) {
            throw err;
          } else {
            let user = JSON.parse(response);
            resolve({
              email: user.email,
              username: user.login,
              name: user.name
            });
          }
        }
      );
    } catch (err) {
      logger.error(`Error in getting the user details ${err}`);
      return err;
    }
  });
};

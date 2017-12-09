import 'babel-polyfill';
import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../server';
import glob from 'glob';
import fs from 'fs';
import { readSalt, encryptPassword } from '../utils/connection';

let should = chai.should();
chai.use(chaiHTTP);

describe('Add New Language', () => {
  before(() => {
    glob('mirage/*.json', (err, files) => {
      if (err) {
        console.error(`Error in deleting files: ${err}`);
      } else {
        files.map(current => {
          fs.unlink(current);
        });
      }
    });
  });

  it('/api/addNewLanguage', done => {
    let salt = readSalt();
    let cPassword = encryptPassword('Jarvis@123', salt);
    chai
      .request(server)
      .post('/api/addNewLanguage')
      .send({
        username: 'santhoshRaju91',
        password: cPassword,
        data: {
          key: 'en',
          label: 'English',
          translation: {
            login: {
              message: 'Welcome to login page'
            }
          }
        }
      })
      .end((err, res) => {
        if (err) {
          console.error(`Error in adding new language: ${err}`);
          throw new Error(err);
        } else {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('message').eql('New language added');
        }
        done();
      });
  });
});

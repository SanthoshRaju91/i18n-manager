import 'babel-polyfill';
import chai from 'chai';
import chaiHTTP from 'chai-http';
import server from '../server';
import glob from 'glob';
import fs from 'fs';

let should = chai.should();
chai.use(chaiHTTP);

describe('App configuration with FILE DB', () => {
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

  it('api/configure: it should configure the application with the given options', done => {
    let payload = {
      name: 'SCB SFP',
      store: 'FILE',
      scm: 'GIT',
      scmURL: 'https://api.github.com',
      location: '/Users/santhoshraju/Documents/'
    };

    chai
      .request(server)
      .post('/api/configure')
      .send(payload)
      .end((err, res) => {
        if (err) {
          console.error(`Error: ${err}`);
          throw new Error(err);
        } else {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
        }
        done();
      });
  });

  it('api/getAppConfig: it should return empty app config for the first initial run', done => {
    chai.request(server).get('/api/getAppConfig').end((err, res) => {
      if (err) {
        console.error(`Error: ${err}`);
        throw new Error(err);
      } else {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.config.should.have.property('isConfigured').eql(false);
        res.body.config.should.have
          .property('message')
          .eql('Application not configured');
      }
      done();
    });
  });

  it('api/getAppConfig: it should get the application config', done => {
    chai.request(server).get('/api/getAppConfig').end((err, res) => {
      if (err) {
        console.error(`Error : ${err}`);
        throw new Error(err);
      } else {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('salt');
        res.body.should.have.property('config');
      }
      done();
    });
  });
});

describe('App configuration with MongoDB', () => {
  before(() => {
    glob('mirage/*.json', (err, files) => {
      if (err) {
        console.error(`Error in deleting files: ${err}`);
        throw new Error(err);
      } else {
        files.map(current => {
          fs.unlink(current);
        });
      }
    });
  });

  it('api/checkConnection: it should confirm connection with mongoDB', done => {
    chai
      .request(server)
      .post('/api/checkConnection')
      .send({
        mongoURL: 'mongodb://root:root@ds127958.mlab.com:27958/frontendstack'
      })
      .end((err, res) => {
        if (err) {
          console.error(`Error in connecting to mongoDB database: ${err}`);
          throw new Error(err);
        } else {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('connected').eql(true);
        }
        done();
      });
  });

  it('api/configure: it should configure the mongoDB connection', done => {
    let payload = {
      name: 'Application name',
      store: 'DB',
      scm: 'GIT',
      scmURL: 'https://api.github.com/user',
      mongoURL: 'mongodb://root:root@ds127958.mlab.com:27958/frontendstack'
    };

    chai
      .request(server)
      .post('/api/checkConnection')
      .send({
        mongoURL: payload.mongoURL
      })
      .end((err, res) => {
        if (err) {
          console.error(`Error in establishing connection to mongoDB: ${err}`);
          throw new Error(err);
        } else {
          res.should.have.status(200);
          res.should.be.a('object');
          if (res.body.should.have.property('connected').eql(true)) {
            chai
              .request(server)
              .post('/api/configure')
              .send(payload)
              .end((err1, response) => {
                if (err1) {
                  console.error(
                    `Error in configuring the Application: ${err1}`
                  );
                  throw new Error(err);
                } else {
                  response.should.have.status(200);
                  response.should.be.a('object');
                  response.should.have.property('success').eql(true);
                  response.should.have.property('config');
                }
              });
          }
        }
        done();
      });
  });
});

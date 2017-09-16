import "babel-polyfill";
import chai from "chai";
import chaiHTTP from "chai-http";
import server from "../server";
import glob from "glob";
import fs from "fs";

let should = chai.should();
chai.use(chaiHTTP);

glob("mirage/*.json", (err, files) => {
  if (err) {
    console.error(`Error in deleting files: ${err}`);
  } else {
    files.map(current => {
      fs.unlink(current);
    });
  }
});

describe("Application config requests", () => {
  it("getAppConfig: it should return empty app config for the first initial run", done => {
    chai.request(server).get("/api/getAppConfig").end((err, res) => {
      if (err) {
        console.error(`Error: ${err}`);
        throw new Error(err);
      } else {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(false);
        res.body.config.should.have.property("isConfigured").eql(false);
        res.body.config.should.have
          .property("message")
          .eql("Application not configured");
      }
      done();
    });
  });

  it("getAppConfig: it should configure the application with the given options", done => {
    let payload = {
      name: "SCB SFP",
      store: "FILE",
      scm: "GIT",
      scmURL: "https://api.github.com",
      location: "/Users/santhoshraju/Documents/"
    };

    chai
      .request(server)
      .post("/api/configure")
      .send(payload)
      .end((err, res) => {
        if (err) {
          console.error(`Error: ${err}`);
          throw new Error(err);
        } else {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
        }
        done();
      });
  });

  it("getAppConfig: it should get the application config", done => {
    chai.request(server).get("/api/getAppConfig").end((err, res) => {
      if (err) {
        console.error(`Error : ${err}`);
        throw new Error(err);
      } else {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("config");
      }
      done();
    });
  });
});

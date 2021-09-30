import chai from "chai";
import chaiHttp from "chai-http";
import chaiDateTime from "chai-datetime";
import app from "../app.js";
import connectDb from "../db/dbConnect.js";
import DOTENV from "dotenv";
import disconnectDb from "../db/dbDisconnect.js";

DOTENV.config();

chai.should();
chai.use(chaiDateTime);
chai.use(chaiHttp);
describe("POST caseStudy", () => {
  beforeEach((done) => {
    connectDb();
    done();
  });

  describe("POST /api/casestudy", () => {
    // Test The Post Route For Success
    //data
    const caseStudy = {
      startDate: "2016-02-13",
      endDate: "2016-05-12",
      minCount: 20,
      maxCount: 32,
    };
    const unvalidatedCaseStudy={
      startDate: "2016-0-13",
      endDate: "201-05-12",
      minCount: 20,
      maxCount: 32,
    }
    it("DATA POST SUCCESS QUERY", (done) => {
      chai
        .request(app)
        .post("/api/casestudy")
        .send(caseStudy)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          res.body.should.have.property("records");
          res.body.should.have.property("code");
          res.body.should.have.property("code").eq(0);

          done();
        });
    });
    it("RECORD ARRAY SCHEMA VALIDATION", (done) => {
      chai
        .request(app)
        .post("/api/casestudy")
        .send(caseStudy)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          res.body.should.have.property("records");
          res.body.records.forEach((value)=>{
            Object.keys(value).should.deep.to.equal(["key","createdAt","totalCount"])
          })
          res.body.should.have.property("code");
          res.body.should.have.property("code").eq(0);

          done();
        });
    });
    // Test The Post Route For Validation
    it("UNVALIDATED DATA POST FAIL QUERY", (done) => {
      chai
        .request(app)
        .post("/api/casestudy")
        .send(unvalidatedCaseStudy)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          res.body.should.have.property("code");
          res.body.should.have.property("records");
          res.body.should.have.property("code").eq(1);
          res.body.should.have.property("msg");

          done();
        });
    });
    // Test the Post Route For Date in range
    it("ALL DATES IN RANGE", (done) => {
      chai
        .request(app)
        .post("/api/casestudy")
        .send(caseStudy)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          res.body.should.have.property("code");
          res.body.should.have.property("records");
          res.body.should.have.property("code").eq(0);
          res.body.records.should.be.a("array");
          res.body.records.forEach((value) => {
            const date = new Date(value.createdAt);
            const fromDate = new Date(caseStudy.startDate);
            const toDate = new Date(caseStudy.endDate);
            date.should.be.withinDate(fromDate, toDate);
          });
          done();
        });
    });
    // Test the Post Route for total count Range
    it("totalCount IN RANGE of POST DATA", (done) => {
  
      chai
        .request(app)
        .post("/api/casestudy")
        .send(caseStudy)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          res.body.should.have.property("code");
          res.body.should.have.property("records");
          res.body.should.have.property("code").eq(0);
          res.body.records.should.be.a("array");
          res.body.records.forEach((value) => {
            const min= caseStudy.minCount;
            const max = caseStudy.maxCount;
            value.totalCount.should.be
              .above(min)
              .below(max);
          });
          done();
        });
    });
    // Test for a 404
    it("Page NOT FOUND", (done) => {
      chai
        .request(app)
        .post("/api23/casestudyassdd")
        .send(caseStudy)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          res.body.should.have.property("code");
          res.body.should.have.property("records");
          res.body.should.have.property("code").eq(2);
          res.body.records.should.be.a("array");
          
          done();
        });
    });
    it("500  Server Error", (done) => {
      //Test for 500 internal server error by disconnecting mongodb
      disconnectDb()
      chai
        .request(app)
        .post("/api/casestudy")
        .send(caseStudy)
        .end((err, res) => {
          res.should.have.status(500);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          res.body.should.have.property("code");
          res.body.should.have.property("records");
          res.body.should.have.property("code").eq(2);
          res.body.records.should.be.a("array");
          
          done();
        });
    });
  });
});

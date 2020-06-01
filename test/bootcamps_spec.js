process.env.NODE_ENV = "test";

let chai = require("chai");
let expect = require("chai").expect;
let server = require("../server");
let chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Bootcamps", () => {
  context("basic routes", () => {
    it("allows retrieving all bootcamps", (done) => {
      chai
        .request(server)
        .get("/api/v1/bootcamps")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a("Object");
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal("Show All Bootcamps");
          done();
        });
    });

    it("allows retrieving a single bootcamp", (done) => {
      chai
        .request(server)
        .get("/api/v1/bootcamps/1")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal("Show Bootcamp 1");
          done();
        });
    });

    it("allows creating a new bootcamp", (done) => {
      chai
        .request(server)
        .post("/api/v1/bootcamps")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal("Create New Bootcamp");
          done();
        });
    });

    it("allows updating an existing bootcamp", (done) => {
      chai
        .request(server)
        .put("/api/v1/bootcamps/1")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal("Update Bootcamp 1");
          done();
        });
    });

    it("allows deleting an existing bootcamp", (done) => {
      chai
        .request(server)
        .delete("/api/v1/bootcamps/1")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.msg).to.equal("Delete Bootcamp 1");
          done();
        });
    });
  });
});

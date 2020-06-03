process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const dbHandler = require("./db-handler");
const seedBootcamps = require("./db-seed-bootcamp");

let chai = require("chai");
let expect = require("chai").expect;
let server = require("../server");
let chaiHttp = require("chai-http");

chai.use(chaiHttp);

// Connect to a new in-memory database before running any tests.
beforeAll(async () => await dbHandler.connect());

beforeEach(async () => await seedBootcamps());

// Clear all test data after every test.
afterEach(async () => await dbHandler.clearDatabase());

// Remove and close the db and server.
afterAll(async () => await dbHandler.closeDatabase());

describe("Bootcamps", () => {
  afterEach(async () => {
    await server.close();
  });

  describe("Create New Bootcamps", () => {
    it("will not save an invalid bootcamp", (done) => {
      chai
        .request(server)
        .post("/api/v1/bootcamps")
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.be.false;
          expect(res.body.msg).to.equal("Unable to create Bootcamp.");
          done();
        });
    });

    it("will save a valid bootcamp", (done) => {
      let bootcamp = {
        name: "Test Bootcamp",
        description: "Test Bootcamp Description",
        address: "1137 Tester Lane",
        careers: ["Web Development"],
      };

      chai
        .request(server)
        .post("/api/v1/bootcamps")
        .send(bootcamp)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.be.true;
          expect(res.body.data.name).to.equal("Test Bootcamp");
          expect(res.body.data.description).to.equal(
            "Test Bootcamp Description",
          );
          done();
        });
    });
  });

  describe("basic routes", () => {
    it("allows retrieving all bootcamps", (done) => {
      chai
        .request(server)
        .get("/api/v1/bootcamps")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a("Object");
          expect(res.body.success).to.be.true;
          expect(res.body.data).to.be.an("array");
          expect(res.body.data).to.have.lengthOf(2);
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

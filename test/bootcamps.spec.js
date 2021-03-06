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

  describe("GET", () => {
    it("retrieves all bootcamps", (done) => {
      chai
        .request(server)
        .get("/api/v1/bootcamps")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a("Object");
          expect(res.body.success).to.be.true;
          expect(res.body.count).to.equal(4);
          expect(res.body.data).to.be.an("array");
          expect(res.body.data).to.have.lengthOf(4);
          done();
        });
    });

    it("retrieves a single bootcamp", (done) => {
      chai
        .request(server)
        .get("/api/v1/bootcamps/5d713995b721c3bb38c1f5d0")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.data.name).to.equal("Devworks Bootcamp");
          done();
        });
    });

    it("provides a bad request for non-existent bootcamp id", (done) => {
      chai
        .request(server)
        .get("/api/v1/bootcamps/5d713995b721c3bb38c1f5d1")
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.be.false;
          expect(res.body.error).to.equal(
            "Bootcamp with ID 5d713995b721c3bb38c1f5d1 was not found",
          );
          done();
        });
    });

    it("provides a bad request for invalid bootcamp id", (done) => {
      chai
        .request(server)
        .get("/api/v1/bootcamps/5d713995b721c3bb38c1f5d1aaaaa")
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.be.false;
          expect(res.body.error).to.contain(
            "Bootcamp ID 5d713995b721c3bb38c1f5d1aaaaa is malformed",
          );
          done();
        });
    });
  });

  // NOTE:
  // Radius tests will apparently not work with Jest. I'm rapidly
  // becoming convinced that Jest is not the right tool to be working
  // with here as it has had numerous problems that I have had to
  // workaround.

  // describe("GET (within radius)", () => {
  //   it("checks within a 10 mile radius", (done) => {
  //     chai
  //       .request(server)
  //       .get("/api/v1/bootcamps/radius/02118/10")
  //       .end((err, res) => {
  //         expect(res.status).to.equal(200);
  //         expect(res.body.success).to.be.true;
  //         expect(res.body.count).to.equal(1);
  //         expect(res.body.data).to.have.lengthOf(1);
  //         done();
  //       });
  //   });
  // });

  describe("POST", () => {
    it("will not save an invalid bootcamp", (done) => {
      chai
        .request(server)
        .post("/api/v1/bootcamps")
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.be.false;
          expect(res.body.error).to.contain(
            "Please enter an address for the Bootcamp.",
          );
          expect(res.body.error).to.contain(
            "Please add some descriptive text for the Bootcamp.",
          );
          expect(res.body.error).to.contain(
            "Please add a name for the Bootcamp.",
          );
          done();
        });
    });

    it("will save a valid bootcamp", (done) => {
      let bootcamp = {
        name: "Test Bootcamp",
        description: "Test Bootcamp Description",
        address: "220 Pawtucket St, Lowell, MA 01854-3502, US",
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
          expect(res.body.data.slug).to.equal("test-bootcamp");
          done();
        });
    });

    it("will not save a duplicate bootcamp", (done) => {
      let bootcamp = {
        name: "Devworks Bootcamp",
        description: "Test Bootcamp Description",
        address: "220 Pawtucket St, Lowell, MA 01854-3502, US",
        careers: ["Web Development"],
      };

      chai
        .request(server)
        .post("/api/v1/bootcamps")
        .send(bootcamp)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.be.false;
          expect(res.body.error).to.equal(
            "Duplicate field entered: name; value is Devworks Bootcamp",
          );
          done();
        });
    });
  });

  describe("PUT", () => {
    it("updates an existing bootcamp", (done) => {
      chai
        .request(server)
        .put("/api/v1/bootcamps/5d713995b721c3bb38c1f5d0")
        .send({ name: "Modified Bootcamp Name" })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          expect(res.body.data.name).to.equal("Modified Bootcamp Name");
          done();
        });
    });

    it("does not update a bootcamp that does not exist", (done) => {
      chai
        .request(server)
        .put("/api/v1/bootcamps/5d713995b721c3bb38c1f5d1")
        .send({ name: "Modified Bootcamp Name" })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.be.false;
          expect(res.body.error).to.equal(
            "Bootcamp with ID 5d713995b721c3bb38c1f5d1 was not found",
          );
          done();
        });
    });

    it("does not update a bootcamp with a malformed id", (done) => {
      chai
        .request(server)
        .put("/api/v1/bootcamps/5d713995b721c3bb38c1f5d0aaaaa")
        .send({ name: "Modified Bootcamp Name" })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.be.false;
          expect(res.body.error).to.contain(
            "Bootcamp ID 5d713995b721c3bb38c1f5d0aaaaa is malformed",
          );
          done();
        });
    });
  });

  describe("DELETE", () => {
    it("deletes an existing bootcamp", (done) => {
      chai
        .request(server)
        .delete("/api/v1/bootcamps/5d713995b721c3bb38c1f5d0")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.be.true;
          done();
        });

      chai
        .request(server)
        .get("/api/v1/bootcamps/5d713995b721c3bb38c1f5d0")
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.be.false;
          done();
        });
    });

    it("does not delete a bootcamp that does not exist", (done) => {
      chai
        .request(server)
        .delete("/api/v1/bootcamps/5d713995b721c3bb38c1f5d1")
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.success).to.be.false;
          expect(res.body.error).to.equal(
            "Bootcamp with ID 5d713995b721c3bb38c1f5d1 was not found",
          );
          done();
        });
    });

    it("does not delete a bootcamp with a malformed id", (done) => {
      chai
        .request(server)
        .delete("/api/v1/bootcamps/5d713995b721c3bb38c1f5d0aaaa")
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.success).to.be.false;
          expect(res.body.error).to.contain(
            "Bootcamp ID 5d713995b721c3bb38c1f5d0aaaa is malformed",
          );
          done();
        });
    });
  });
});

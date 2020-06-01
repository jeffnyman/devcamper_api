const express = require("express");

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../controllers/bootcamps");

const router = express.Router();

// router.get("/", (req, res) => {});
// router.post("/", (req, res) => {});

router.route("/").get(getBootcamps).post(createBootcamp);

// router.get("/:id", (req, res) => {});
// router.put("/:id", (req, res) => {});
// router.delete("/:id", (req, res) => {});

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;

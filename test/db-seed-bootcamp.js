const objectID = require("mongodb").ObjectID;
const Bootcamp = require("../models/Bootcamp");

async function seedBootcamps() {
  let bootcamps = [
    {
      _id: new objectID("5d713995b721c3bb38c1f5d0"),
      name: "Devworks Bootcamp",
      description: "Devworks is a full stack JavaScript Bootcamp.",
      address: "233 Bay State Rd Boston MA 02215",
      careers: ["Web Development", "UI/UX", "Business"],
    },
    {
      _id: new objectID("5d713a66ec8f2b88b8f830b8"),
      name: "ModernTech Bootcamp",
      description:
        "ModernTech has one goal, and that is to make you a rockstar developer and/or designer with a six figure salary.",
      address: "220 Pawtucket St, Lowell, MA 01854",
      careers: ["Web Development", "UI/UX", "Mobile Development"],
    },
  ];

  const seededBootcamps = await Bootcamp.insertMany(bootcamps);
}

module.exports = seedBootcamps;

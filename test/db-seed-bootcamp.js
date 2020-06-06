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
    {
      _id: new objectID("5d725a037b292f5f8ceff787"),
      name: "Codemasters",
      description:
        "Codemasters will give you the skills and the tools to become the best developer possible.",
      address: "85 South Prospect Street Burlington VT 05405",
      careers: ["Web Development", "Data Science", "Business"],
    },
    {
      _id: new objectID("5d725a1b7b292f5f8ceff788"),
      name: "Devcentral Bootcamp",
      description:
        "Devcentral Bootcamp will give you the skills and the tools to become the best developer possible.",
      address: "45 Upper College Rd Kingston RI 02881",
      careers: [
        "Mobile Development",
        "Web Development",
        "Data Science",
        "Business",
      ],
    },
  ];

  const seededBootcamps = await Bootcamp.insertMany(bootcamps);
}

module.exports = seedBootcamps;

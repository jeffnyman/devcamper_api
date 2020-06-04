const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Please add a name for the Bootcamp."],
    maxlength: [50, "Bootcamp name cannot be more than 50 characters."],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please add some descriptive text for the Bootcamp."],
    maxlength: [
      500,
      "Bootcamp descriptive text cannot be more than 500 characters.",
    ],
  },
  website: {
    type: String,
    match: [
      /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
      "Please use a valid URL with HTTP or HTTPS.",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number cannot be longer than 20 characters."],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email.",
    ],
  },
  address: {
    type: String,
    required: [true, "Please enter an address for the Bootcamp."],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    // Fields from MapQuest GeoCoder API.
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Quality Assurance",
      "Testing",
      "Product Development",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    // Not inserted with request; will be generated.
    type: Number,
    min: [1, "Rating must be at least 1."],
    max: [10, "Rating cannot be more than 10."],
  },
  // Not inserted with request; will be generated.
  averageCost: Number,
  photo: {
    // Refers to the name of the file; not the binary contents.
    type: String,
    default: "no-photo.png",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create bootcamp slug from the name
BootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Geocode and create location field
BootcampSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // The request provides an address. That address is then dissected and
  // geocoded. All of that information is put in the formattedAddress and
  // stored in the location object. So that means we don't actually need
  // the address that is sent as part of the request to be stored in the
  // database.
  this.address = undefined;

  next();
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);

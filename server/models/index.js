require("dotenv").config();

/*using mongoose*/
const mongoose = require("mongoose");

const uri = process.env.URI;
// const uri = "mongodb://localhost:27017/test";

mongoose.connect(
  uri,
  (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`connected to ${res.name} @ ${res.host}`);
      // console.log(res);
    }
  },
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = mongoose;

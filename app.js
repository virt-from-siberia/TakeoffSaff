const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json({ extended: true }));

const PORT = config.get("post") || 5000;

app.use(bodyParser.json({ extended: true }));

app.use("/auth", require("./routes/auth.routes"));
app.use("/contacts", require("./routes/contacts.routes"));

async function start() {
  try {
    await mongoose.connect(config.get("mongoURL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(5000, () => {
      //console.log(`:::APP HAS BEEN STARTED::: on POST :  ${PORT}`);
    });
  } catch (err) {
    //console.log("SERVER ERROR", err.message);
    process.exit(1);
  }
}

start();

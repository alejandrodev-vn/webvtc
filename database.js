const mongoose = require("mongoose");

const urlDB = 'mongodb+srv://huytra264:Huytra264@cluster1.2wruq.mongodb.net/vtc-cts?retryWrites=true&w=majority'

mongoose.connect(urlDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

module.exports = { connection };
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const name = process.env.MONGODB_NAME;
const pw = process.env.MONGODB_PASSWORD;

// DATABASE CONNECTION
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
const uri = `mongodb+srv://${name}:${pw}@cluster0.vrbby.mongodb.net/book-review?retryWrites=true&w=majority`;

mongoose
  .connect(uri, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
//////

const schema = require("./schema");

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen("4000", () => {
  console.log("server has started");
});

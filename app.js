const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

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
// allow cross origin requests
app.use(cors())

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  res.send("This is the server-side of the graphql based backend")
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  process.stdout.write(`server is running at port ${port}`);
});

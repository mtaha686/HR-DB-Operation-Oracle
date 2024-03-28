// app.js
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/Routes");
// require("./models/countries");

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use("/tables", routes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

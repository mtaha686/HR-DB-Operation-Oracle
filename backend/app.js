const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const routes = require("./routes/Routes");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());
app.use("/tables", routes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

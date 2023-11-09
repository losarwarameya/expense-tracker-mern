const express = require("express");
const usersRoutes = require("./routes/usersRoutes");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;

const app = express();
app.use(cors());

app.use(express.json());
app.use(usersRoutes);

app.listen(port, () => {
  console.log("Server listening at port " + port);
});

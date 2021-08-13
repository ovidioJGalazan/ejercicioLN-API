const express = require("express");
const app = express();
const port = 3001;

const allDataAPI = require("./routes/allData");
const cuentas = require("./routes/cuentas");
allDataAPI(app);
cuentas(app);


app.listen(port, () => {
  console.log(`Listening in ${port} port`);
});
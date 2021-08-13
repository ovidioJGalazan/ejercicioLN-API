const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const allDataAPI = require("./routes/allData");
const cuentas = require("./routes/cuentas");
const { logErrors, errorHandler } = require("./utils/middleware/errorHandlers");

//https://immense-tor-32802.herokuapp.com/ 

app.get("/", (request, response) => {
  response.send("<h1>Examen LN - Backend</h1>");
});

//Routes
allDataAPI(app);
cuentas(app);

//Middleware
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening in ${port} port`);
});
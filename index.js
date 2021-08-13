const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const allDataAPI = require("./routes/allData");
const cuentas = require("./routes/cuentas");
const { logErrors, errorHandler } = require("./utils/middleware/errorHandlers");

//Routes
allDataAPI(app);
cuentas(app);

app.get("/", (request, response) => {
  response.send("<h1>Examen LN - Backend</h1>");
});


//Middleware
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening in ${port} port`);
});
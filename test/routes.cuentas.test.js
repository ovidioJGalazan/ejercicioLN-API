const proxyquire = require("proxyquire");
const testServer = require("../utils/testServer");

describe("Routes - cuentas", () => {
  const route = proxyquire("../routes/cuentas", {
  });

  const request = testServer(route);
  describe("GET /api/cuentas", () => {
    it("Should respond with status 200", (done) =>{
      request.get("/api/cuentas").expect(200, done);
    });
  });
  describe("GET /api/cualquiera", () => {
    it("Should respond with status 404", (done) =>{
      request.get("/api/cualquiera").expect(404, done);
    });
  });
});
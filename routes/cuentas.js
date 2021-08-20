const express = require("express");
const CuentasService = require("../services/cuentas");
const URL = "/api/cuentas";

const cuentas = (app) => {
  const router = express.Router();
  app.use(URL, router);
  router.use(express.json());
    
  router.get("", async (req, res, next) => {
    const {filterBy, filterValue, orderBy, page, qty, cleanType} = req.query;
    try{
      const cuentasService = new CuentasService();

      let results = await cuentasService.filter({filterBy, filterValue});
      results = cuentasService.order({cuentas: results, orderBy});
      results = cuentasService.paginate({cuentas: results, page, qty});
      results = cuentasService.cleanData({cuentas: results, cleanType});
      res.status(200).json({
        data: results,
        message: `Se devuelven ${qty} elementos de la ${page} página filtrados por ${filterBy}=${filterValue} ordenados ${orderBy} para cards ${cleanType}.`
      }
      );
    }catch(err){
      next(err);
    }
  });
};

module.exports = cuentas;
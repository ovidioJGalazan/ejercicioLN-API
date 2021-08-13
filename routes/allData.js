const express = require("express");
const { mockData } = require("../utils/mocks/data");

const allDataAPI = (app) => {

  const router = express.Router();
  app.use("/", router);
    
  app.get("/", async (req, res, next) => {
    try{
      const allData = await Promise.resolve(mockData);
      res.status(200).json({
        data: allData,
        message: "All data recieved."
      }
      );
    }catch(err){
      next(err);
    }
  });
};

module.exports = allDataAPI;
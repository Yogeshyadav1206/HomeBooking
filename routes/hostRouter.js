// Core Module
const path = require("path");

// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathUtil");
const homescontroller = require("../controllers/homes");
hostRouter.get("/add-home", homescontroller.getaddHome);
hostRouter.post("/add-home", homescontroller.postaddHome);
hostRouter.get("/hosthomelist", homescontroller.gethosthomelist);
hostRouter.post("/removefromhost", homescontroller.postremovefromhost);
hostRouter.get("/editHome/:homeId", homescontroller.geteditHome);
hostRouter.post("/editHome", homescontroller.posteditHome);

module.exports = hostRouter;

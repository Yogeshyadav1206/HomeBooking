// Core Modules
const path = require("path");

// External Module
const express = require("express");
const userRouter = express.Router();

// Local Module
const homescontroller = require("../controllers/homes");

userRouter.get("/", homescontroller.gethome);
userRouter.get("/booking", homescontroller.getbooking);
userRouter.get("/favouritelist", homescontroller.getfavouritelist);
userRouter.get("/homelist", homescontroller.gethomelist);
userRouter.get("/homelist/:homeId", homescontroller.gethomedetails);
userRouter.post("/fav", homescontroller.postaddtofav);
userRouter.post("/fav-remove", homescontroller.postremovefromfav);

module.exports = userRouter;

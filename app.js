// Core Module
const path = require("path");

// External Module
const express = require("express");

//Local Module
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorcontroller = require("./controllers/error");
const { mongoConnect } = require("./utils/databaseUtil"); // name export as mutiple exports are there in databaseUtil
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorcontroller.error);

const PORT = 4003;
mongoConnect(() => {
  //phle mongoconnect kro and jb client hmare pass aa jaye tb server start krna
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
});

const Home = require("../models/homedata");
const Favouritehome = require("../models/favhome");
exports.getaddHome = (req, res, next) => {
  //by default .render view me check krta h
  res.render("host/editHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};
exports.geteditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    // no destructuring of array becoz only one obj will come
    if (!home) {
      console.log("home not found");
      return res.redirect("/host/hosthomelist");
    } else {
      // console.log(home);
      res.render("host/editHome", {
        pageTitle: "editHome",
        currentPage: "Host-Home-List",
        editing: editing,
        homeId: homeId,
        home: home,
      });
    }
  });
};
exports.postaddHome = (req, res, next) => {
  // console.log("Home Registration successful for:", req.body);
  const home = new Home(
    req.body.houseName,
    req.body.price,
    req.body.location,
    req.body.rating,
    req.body.photoUrl,
    req.body.description
  );
  // kyuki save is returning promise so handled by .then
  home.save().then(() => {
    console.log("home saved");
  });

  // const {houseName,price,location,rating,photoUrl}=req.body;
  // const home=new Home(houseName,price,location,rating,photoUrl);
  // home.save();

  res.render("host/homeAdded", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};

exports.posteditHome = (req, res, next) => {
  // console.log("Home Registration successful for:", req.body);

  // const home = new Home(
  //   req.body.houseName,
  //   req.body.price,
  //   req.body.location,
  //   req.body.rating,
  //   req.body.photoUrl
  //   req.body.description
  // );
  // home.save();

  const { id, houseName, price, location, rating, photoUrl, description } =
    req.body;
  const home = new Home(
    houseName,
    price,
    location,
    rating,
    photoUrl,
    description
  );
  home._id = id;
  home.save().then(() => {
    console.log("home Edited");
  });
  res.redirect("/host/hosthomelist");
};

exports.getbooking = (req, res, next) => {
  //by default .render view me check krta h
  res.render("store/booking", {
    pageTitle: "Bookings",
    currentPage: "Booking",
  });
};

exports.gethosthomelist = (req, res, next) => {
  //by default .render view me check krta h
  // Home.fetchAll().then(([registeredHomes]) here ([registeredHomes]) is used to desturctured to array but in mongo we are coming with .toArray already;
  Home.fetchAll().then((registeredHomes) => {
    // console.log(registeredHomes);
    res.render("host/hosthomelist", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "Host-Home-List",
    });
  });
};
exports.postremovefromhost = (req, res, next) => {
  // console.log("Received request to remove home with ID:", req.body.id);
  Home.removefromhost(req.body.id)
    .then(() => {
      res.redirect("/host/hosthomelist");
    })
    .catch((error) => {
      console.log("Error while deleting", error);
    });
};

exports.gethomelist = (req, res, next) => {
  // //by default .render view me check krta h
  // res.render("store/homelist", {
  //   pageTitle: "Home-List",
  //   currentPage: "Home-List",
  // });
  Home.fetchAll().then((registeredHomes) => {
    // console.log(registeredHomes);
    res.render("store/homelist", {
      registeredHomes: registeredHomes,
      pageTitle: "Home-List",
      currentPage: "Home-List",
    });
  });
};
exports.gethome = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    // console.log(registeredHomes);
    res.render("store/home", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
    });
  });
};
exports.gethomedetails = (req, res, next) => {
  const homeId = req.params.homeId; //used for gettind id
  //call findById from  class Home in homedata.js
  Home.findById(homeId).then((home) => {
    if (!home) {
      // console.log("home not found");
      //redirect to homelist page
      res.redirect("/homelist");
    } else {
      res.render("store/homedetails", {
        home: home,
        pageTitle: "Home Deatils",
        currentPage: "Home-List",
      });
    }
  });
};
exports.postaddtofav = (req, res, next) => {
  // console.log("id from atf", req.body.id);
  Favouritehome.addtofav(req.body.id)
    .then(() => {
      res.redirect("/favouritelist");
    })
    .catch((error) => {
      console.log("Error adding to favourites:", error);
      res.redirect("/homelist"); // Redirect somewhere even if an error occurs
    });
};

exports.getfavouritelist = (req, res, next) => {
  Favouritehome.getfavourite() //as array is coming so no destructuring
    .then((favHomeDetails) => {
      res.render("store/favouritelist", {
        favourities: favHomeDetails,
        pageTitle: "Favourite Home List",
        currentPage: "FavouriteList",
      });
    })
    .catch((err) => {
      console.error("Error fetching favourites:", err);
    });
};

exports.postremovefromfav = (req, res, next) => {
  // console.log(req.body);
  Favouritehome.removefromfav(req.body.id)
    .then(() => {
      res.redirect("/favouritelist");
    })
    .catch((err) => {
      console.log("error in deleting favhome", err);
    });
};

const Home = require("./homedata");
const { getDB } = require("../utils/databaseUtil");
const { ObjectId } = require("mongodb");
module.exports = class Favouritehome {
  static addtofav(homeId) {
    // console.log("id coming fot atf", homeId);
    const db = getDB();
    return Favouritehome.findByIdFav(homeId).then((favhome) => {
      if (!favhome) {
        return Home.findById(homeId).then((home) => {
          const insertFields = {
            houseName: home.houseName,
            price: home.price,
            location: home.location,
            rating: home.rating,
            photoUrl: home.photoUrl,
            description: home.description,
          };
          return db.collection("favuorites").insertOne(insertFields);
        });
      } else {
        console.log("home is already present");
        return Promise.resolve();
      }
    });
  }

  static removefromfav(homeId) {
    const db = getDB();
    return db
      .collection("favuorites")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }

  static getfavourite() {
    const db = getDB();
    //.find() gives us a pointer which can be used to iterate all but here we want all so .toArray convert all those to array and then return;
    return db.collection("favuorites").find().toArray();
  }

  static findByIdFav(homeId) {
    // console.log("id coming to fbid", homeId);
    const db = getDB();
    return db
      .collection("favuorites")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }
};

let registeredHomes = [];
const { getDB } = require("../utils/databaseUtil");
const { ObjectId } = require("mongodb");
module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }
  save() {
    const db = getDB();
    if (this._id) {
      const updateFields = {
        houseName: this.houseName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description,
      };
      // use updateFields instead of this becoz if we use this then it will try to update immutabe _id so except _id all values updted and then insert
      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updateFields }
        );
    } else {
      return db.collection("homes").insertOne(this);
      //it is returning a promise from here so change the syntax where save is used
      //here collection refers as table  .insertOne() function is used to insert 1 entry
      // it allows json obj so this inserted
    }
  }
  static fetchAll() {
    const db = getDB();
    //.find() gives us a pointer which can be used to iterate all but here we want all so .toArray convert all those to array and then return;
    return db.collection("homes").find().toArray();
  }
  static removefromhost(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
  static findById(homeId) {
    // console.log(homeId);
    const db = getDB();
    //return db.collection("homes").find({ _id: homeId }).next(); next for moving to next iterator
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
    //new ObjectId(String(homeId)) } id is converted to object id because in mongo it provide unique objid to each entry
  }
};

const fAdmin = require("firebase-admin");
fAdmin.initializeApp();

const fireBaseFunctions = require("firebase-functions");

const express = require("express");
const umapp = express();
const cors = require("cors"); //enabling cors
const bcrypt = require("bcrypt");
const saltRounds = 9;
const firestoreDB = fAdmin.firestore();

umapp.use(cors({ origin: true }));

//Service to save to firebase
umapp.post("/userCreate", async (req, res) => {
  fAdmin
    .auth()
    .createUser({
      email: req.body.email,
      password: req.body.password,
    })
    .then((userRecord) => {
      return res.status(200).send(userRecord.toJSON());
    })
    .catch((error) => {
      return res.status(200).send("Error in User Create " + error);
    });
});

//save all other user details to FiresStoreDB
umapp.post("/saveUserDetailsfireStore", async (req, res) => {
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  try {
    await db
      .collection("userCredentials")
      .doc("/" + req.body.id + "/")
      .set({
        id: req.body.id,
        email: req.body.email,
        password: encryptedPassword,
        name: req.body.name,
        isRestaurantOwner: req.body.isRestaurantOwner,
      });
    return res.status(200).send(req.body.id + "User Saved to firestore collection");
  } catch (error) {
    console.log(error);
    return res.status(200).send(error);
  }
});

//to check if a user is already present in Firebase.
umapp.get("/findAUser/:email", async (req, res) => {
  const userEmail = req.params.email;
  admin
    .auth()
    .getUserByEmail(userEmail)
    .then((userRecord) => {
      return res.status(200).send(userRecord.toJSON());
    })
    .catch((error) => {
      return res.status(200).send("Error in finding a User"+error);
    });
});

//to get the userDetails from Firestore db
umapp.get("/fetchUserDetails/:id/:password", async (req, res) => {
  try {
    const document = firestoreDB.collection("userCredentials").doc(req.params.id);
    const docInfo = await document.get();
    var docData = docInfo.data();
    console.log(docData);
    const password = req.params.password;
    console.log(req.params.password);
    console.log(password);
    const isPasswordCompared = await bcrypt.compare(password, docData.password);
    return res.status(200).send("Password comparison :"+isPasswordCompared + "," + "isRestaurantOwner"+docData.isRestaurantOwner);
  } catch (error) {
    console.log(error);
    return res.status(200).send("Error" + error);
  }
});

exports.app = fireBaseFunctions.https.onRequest(umapp);
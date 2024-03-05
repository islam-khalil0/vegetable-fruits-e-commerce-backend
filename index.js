const express = require("express");
//ODM tool
const mongoose = require("mongoose");

//Schemas
const Vegetable = require("./models/Vegetable");
const Fruits = require("./models/Fruits");
const Offers = require("./models/Offers");

//upload images
const cloudinary = require("cloudinary").v2;
const path = require("path");
const multer = require("multer");

// Import the cors middleware
const cors = require("cors");
 
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose
  .connect(
    "mongodb+srv://eslamkhalil851:w5TCB9QFucl5NcBl@cluster0.i6htfmg.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected with DB successfully");
    app.listen(3000, () => {
      console.log("iam listening in port 3000");
    });
  })
  .catch((e) => {
    console.log("error with connected db ", e);
  });

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dgx6qjzs5",
  api_key: "286735357397959",
  api_secret: "1OJBZXTImY9qswNxp9UC0rq9_XY",
});

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//add new vegetable
app.post("/addVegetable", upload.single("file"), async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  const addVegetable = new Vegetable();

  try {
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: "uploads", // Specify your Cloudinary folder
      resource_type: "image",
    });

    addVegetable.name = name;
    addVegetable.price = price;
    addVegetable.imageName = result.original_filename;
    addVegetable.imagePath = result.secure_url;

    await addVegetable.save();
    res.send("add new item successfully");
  } catch (error) {
    res.send("error in time of save new item", error);
  }
});

//get vegetable
app.get("/getVegetable", async (req, res) => {
  try {
    const displayVegetable = await Vegetable.find(
      {},
      "name price imageName imagePath"
    );

    res.json(displayVegetable);
  } catch (error) {
    res.send("error in get vegetable :", error);
  }
});

//delete item of vegetable
app.delete("/deleteVegetable/:vegetableId", async (req, res) => {
  const id = req.params.vegetableId;

  try {
    await Vegetable.findByIdAndDelete(id);
    res.send("deleted item successfully");
  } catch (error) {
    res.send("error in delete vegetable : ", error);
  }
});

//update vegetable
app.put("/updateVegetable/:vegetableId", async (req, res) => {
  const id = req.params.vegetableId;
  const upName = req.body.upName;
  const upPrice = req.body.upPrice;
  try {
    const updatedVegetable = await Vegetable.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: upName,
          price: upPrice,
        },
      },
      {
        new: true,
      }
    );

    if (updatedVegetable) {
      res.status(200).json(updatedVegetable);
    } else {
      res.status(404).json({ message: "Vegetable not found" });
    }
  } catch (error) {
    console.log("Error updating vegetable:", error);
  }
});

//add fruits
app.post("/addFruits", async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  const addFruits = new Fruits();
  addFruits.name = name;
  addFruits.price = price;

  try {
    await addFruits.save();
    res.send("add new item successfully");
  } catch (error) {
    res.send("error in time of save new item ", error);
  }
});

//get fruits
app.get("/getFruits", async (req, res) => {
  try {
    const displayFruits = await Fruits.find();
    res.json(displayFruits);
  } catch (error) {
    res.send("error in get fruits : ", error);
  }
});

//delete item of fruits
app.delete("/deleteFruits/:fruitsId", async (req, res) => {
  const id = req.params.fruitsId;

  try {
    await Fruits.findByIdAndDelete(id);
    res.send("deleted item successfully");
  } catch (error) {
    res.send("error in delete fruits : ", error);
  }
});

//update fruits
app.put("/updateFruits/:fruitsId", async (req, res) => {
  const id = req.params.fruitsId;
  const upName = req.body.upName;
  const upPrice = req.body.upPrice;
  try {
    const updatedFruits = await Fruits.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: upName,
          price: upPrice,
        },
      },
      {
        new: true,
      }
    );

    if (updatedFruits) {
      res.status(200).json(updatedFruits);
    } else {
      res.status(404).json({ message: "fruits not found" });
    }
  } catch (error) {
    console.log("Error updating fruits:", error);
  }
});

//add offers
app.post("/addOffers", async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;

  const addOffers = new Offers();
  addOffers.name = name;
  addOffers.price = price;

  try {
    await addOffers.save();
    res.send("add new item successfully");
  } catch (error) {
    res.send("error in add new item : ", error);
  }
});

//get offers
app.get("/getOffers", async (req, res) => {
  try {
    const displayOffers = await Offers.find();
    res.json(displayOffers);
  } catch (error) {
    res.send("error in get offers : ", error);
  }
});

//delete item of offers
app.delete("/deleteOffers/:offerId", async (req, res) => {
  const id = req.params.offerId;

  try {
    await Offers.findByIdAndDelete(id);
    res.send("deleted item successfully");
  } catch (error) {
    res.send("error in delete offer : ", error);
  }
});

//update offer
app.put("/updateOffer/:offerId", async (req, res) => {
  const id = req.params.offerId;
  const upName = req.body.upName;
  const upPrice = req.body.upPrice;

  try {
    const updateOffer = await Offers.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: upName,
          price: upPrice,
        },
      },
      {
        new: true,
      }
    );
    if (updateOffer) {
      res.status(200).json(updateOffer);
    } else {
      res.status(404).json({ message: "offer not found" });
    }
  } catch (error) {
    console.log("Error updating offer:", error);
  }
});

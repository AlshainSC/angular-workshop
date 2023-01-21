"use strict";
const model = require("../models/model");

exports.getAll = async (req, res) => {
  const Model = await model.find();
  try {
    res.send(Model);
    res.status(201);
    console.log("DataBase: successfully retrieved data");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

exports.postDocument = async (req, res) => {
  const Model = new model({
    id: req.params._id,
    title: req.body.title,
    description: req.body.description,
    percentComplete: req.body.percentComplete,
    favorite: req.body.favorite,
  });
  try {
    await Model.save();
    console.log("worked");
    res.status(201);
    res.send(JSON.stringify(Model));
    console.log("DataBase: successfuly posted data");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

exports.deleteDocument = async (req, res) => {
  const id = req.params._id;
  try {
    await model.findByIdAndDelete(id);
    res.status(204);
    res.send(`Document has been deleted`);
    console.log("Successfully deleted Document");
  } catch (error) {
    res.status(500);
    console.log("error is in server/controllers/index.js");
    throw new Error(error);
  }
};

exports.updateDocument = async (req, res) => {
  const id = req.params._id;
  try {
    const update = await model.updateOne(
      { _id: id },
      {
        $set: {
          id: req.body.id,
          title: req.body.title,
          description: req.body.description,
          percentComplete: req.body.percentComplete,
          favorite: req.body.favorite,
        },
      }
    );
    res.status(200);
    res.send(JSON.stringify(update));
    console.log("Successfully updated Document");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

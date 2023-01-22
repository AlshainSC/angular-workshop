"use strict";
const model = require("../models/model");
const mongoose = require("mongoose");

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
    console.log("DataBase: successfuly posted data: ", Model);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

exports.deleteDocument = async (req, res) => {
  // const id = JSON.parse(req.params.id);
  const id = req.params.id;
  console.log("id is: ", id);
  try {
    const deletion = await model.findByIdAndDelete({ _id: id });
    res.status(204);
    res.send(deletion);
    console.log("Successfully deleted Document", id);
  } catch (error) {
    res.status(500);
    console.log("request params: ", req.body);
    console.log("error is in server/controllers/index.js");
    throw new Error(error);
  }
};

exports.updateDocument = async (req, res) => {
  // const id = req.body._id;
  const id = req.params.id;
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
    console.log("Successfully updated Document: ", req.body);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

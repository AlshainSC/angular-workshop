"use strict";
//dependencies
const Router = require("express");
const controller = require("./controllers/index");
//setup
const router = new Router();
//endpoints
router.get("/courses", controller.getAll);
router.post("/courses", controller.postDocument);
router.delete("/courses/:id", controller.deleteDocument);
router.put("/courses/:id", controller.updateDocument);
module.exports = router;

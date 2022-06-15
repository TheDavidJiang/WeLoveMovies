const router = require("express").Router({mergeParams: true})
const controller = require("./reviews.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")


//get rid of .get in :reviewId later. Also the read function in here and the controller.
router.route("/:reviewId").get(controller.read).put(controller.update).delete(controller.delete).all(methodNotAllowed)
router.route("/").get(controller.list).all(methodNotAllowed)

module.exports = router
const router = require("express").Router()
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

const theatersRouter = require("../theaters/theaters.router")
const reviewsRouter = require("../reviews/reviews.router")
const { readMoviesAndTheaters } = require("./movies.controller")

router.use("/:movieId/reviews", controller.movieExists, reviewsRouter)
router.use("/:movieId/theaters", controller.movieExists, controller.readMoviesAndTheaters)
router.route("/:movieId").get(controller.read).all(methodNotAllowed)
router.route("/").get(controller.list).all(methodNotAllowed)

module.exports = router
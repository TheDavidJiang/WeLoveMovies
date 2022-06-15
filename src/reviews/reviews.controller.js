const reviewsService = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundaries")
const knex = require("../db/connection")

async function list(req, res, next){
    const { movieId } = req.params
    // console.log(movieId)
    const reviews = await reviewsService.readMoviesAndReviews(movieId)
    // if (movieId){
    //     let movieReview = reviews.filter(review => review.movie_id == movieId)
    //     console.log(movieReview)
    // }
    
    // res.json({ data: reviews.filter(movieId ? reviewsService.readMoviesAndReviews : reviews.filter(review => review.movie_id == movieId)) })
    res.json({ data: reviews.filter(movieId ? review => review.movie_id == movieId : () => true) })
    // res.json({ data: movieId ? reviews.filter(review => review.movie_id == movieId) : () => true })
}

function reviewExists(req, res, next){
    reviewsService
    .readMoviesAndReviews(req.params.reviewId)
    .then((review)=>{
        if(review){
            res.locals.review = review
            return next()
        }
        next({ status: 404, message: "Review cannot be found" })
    })
    .catch(next)
}



function update(req, res, next){
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    }
    reviewsService
    .update(updatedReview)
    .then((data)=> res.json({ data }))
    .catch(next)
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)]
}
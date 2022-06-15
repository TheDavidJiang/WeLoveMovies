const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

function list(){
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.movie_id", "mt.is_showing")
}

function listMoviesAndTheaters(){
    return knex("movies_theaters").select("*")
}

const addMovie = mapProperties({
    "m:critic_id": "movie.critic_id",
    "m:title": "movie.title",
    "m:runtime_in_minutes": "movie.runtime_in_minutes",
    "m:rating": "movie.rating",
    "m:description": "movie.description",
    "m:image_url": "movie.image_url",
    "m:created_at": "movie.created_at",
    "m:updated_at": "movie.updated_at",
    "m:is_showing": "movie.is_showing",
    "m:theater_id": "movie.theater_id"
})

function readMoviesAndTheaters(){
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*",
    "m.movie_id as m:movie_id",
    "m.title as m:title",
    "m.runtime_in_minutes as m:runtime_in_minutes",
    "m.rating as m:rating",
    "m.description as m:description",
    "m.image_url as m:image_url",
    "m.created_at as m:created_at",
    "m.updated_at as m:updated_at",
    "mt.is_showing as mt:is_showing",
    "mt.theater_id as mt:theater_id",
    )
    // .where({ "m.movie_id": movie_id})
    // .then((theaters)=>theaters.map((theater)=>addMovie(theater)))
}

// function readMoviesAndTheaters(){
//     return knex("theaters as t")
//     .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
//     .join("movies as m", "mt.movie_id", "m.movie_id")
//     .select("m.*", "t.*", "mt.*")
//     // .where({ "m.movie_id": movie_id})
//     // .then((theaters)=>theaters.map((theater)=>addMovie(theater)))
// }

module.exports = {
    list,
    listMoviesAndTheaters,
    readMoviesAndTheaters
}
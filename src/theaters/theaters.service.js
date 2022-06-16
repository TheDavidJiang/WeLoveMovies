const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")
const reduceProperties = require("../utils/reduce-properties");

const data = [
  {
    theater_id: 1,
    name: "Regal City Center",
    movie_id: 1,
    title: "Spirited Away",
    rating: "PG",
    image_url: "asdf"
  },
  {
    theater_id: 1,
    name: "Regal City Center",
    movie_id: 2,
    title: "Interstellar",
    rating: "PG-13",
    image_url: "asdf"
  },
];

//the leftmost thing is drawing information from the key in the data that you're passing in, it needs to match the variable exactly
// the first thing in the value array refers to which name you want to group them under
// you need null for the second thing
// the last thing is what you're naming that key

const reduceMovies = reduceProperties("theater_id", {
  "m:movie_id": ["movies", null, "movie_id"],
  "m:title": ["movies", null, "title"],
  "m:rating": ["movies", null, "rating"],
  "m:runtime_in_minutes": ["movies", null, "runtime_in_minutes"],
  "m:description": ["movies", null, "description"],
  "m:image_url": ["movies", null, "image_url"],
  "m:created_at": ["movies", null, "created_at"],
  "m:updated_at": ["movies", null, "updated_at"],
  "mt:is_showing": ["movies", null, "is_showing"],
  "mt:theater_id": ["movies", null, "theater_id"]
});

console.log("hello there", JSON.stringify(reduceMovies(data), null, 4));


// function list(){
//     return knex("theaters as t")
//     .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
//     .select("t.*", "mt.movie_id", "mt.is_showing")
//     .groupBy("t.theater_id", "mt.movie_id", "mt.is_showing")
// }

function listTheaters(){
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.movie_id", "mt.is_showing")
    .groupBy("t.theater_id", "mt.movie_id", "mt.is_showing")
    .then((data)=>reduceMovies(data))
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
    // value should be movie_theater? what is the name of the table?
    "mt:is_showing": "movie.is_showing",
    "mt:theater_id": "movie.theater_id"
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
    .then((theaters)=>reduceMovies(theaters))
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
    // list,
    listTheaters,
    listMoviesAndTheaters,
    readMoviesAndTheaters
}
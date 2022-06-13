const knex = require("../db/connection")

function list(){
    return knex("movies").select("*")
}

function listShowing(){
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where("mt.is_showing", true)
    .groupBy("m.movie_id")
}

module.exports = {
    list,
    listShowing
}
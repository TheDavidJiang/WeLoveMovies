const theatersService = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundaries")
const reduceProperties = require("../utils/reduce-properties");

// async function list(req, res, next){
//     const { movieId } = req.params
//     const theaters = await theatersService.list()

//     // const results =  theaters.filter(movieId ? theater => theater.movie_id == movieId : ()=> true)
//     // console.log(results)
//     // const data = [
//     //     {
//     //       theater_id: 1,
//     //       name: "Regal City Center",
//     //       address_line_1: "801 C St.",
//     //       address_line_2: "",
//     //       movie_id: 1,
//     //       title: "Spirited Away",
//     //       rating: "PG",
//     //       description: "hello"

//     //     },
//     //     {
//     //       theater_id: 1,
//     //       name: "Regal City Center",
//     //       address_line_1: "801 C St.",
//     //       address_line_2: "",
//     //       movie_id: 2,
//     //       title: "Interstellar",
//     //       rating: "PG-13",
//     //       description: "hello"

//     //     },
//     //   ];
//     //   const reduceMovies = reduceProperties("theater_id", {
//     //     movie_id: ["movies", null, "movie_id"],
//     //     title: ["movies", null, "title"],
//     //     rating: ["movies", null, "rating"],
//     //     description: ["movies", null, "description"]
//     //   });
//     // console.log("reduceFunction: ", JSON.stringify(reduceMovies(data), null, 4));


//     res.json({ data: theaters.filter(movieId ? theater => theater.movie_id == movieId : ()=> true)})
    
//     // res.json({ data: result })
    
// }

async function list(req, res, next){
    const { movieId } = req.params
    const theaters = await theatersService.listTheaters()
    // const moviesAndTheaters = await theatersService.listMoviesAndTheaters()
    const readMoviesAndTheaters = await theatersService.readMoviesAndTheaters()
    // console.log(moviesAndTheaters)
    // const results = theaters.map((theater)=>)
    // for (let theater of theaters) {
    //     for (let moviesInTheater of moviesAndTheaters){
    //         if (theater.theater_id === moviesInTheater)
    //     }
    // }
    movieId ? res.json({ data: theaters.filter(theater => theater.movie_id == movieId )}) :  res.json({ data: readMoviesAndTheaters })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
}
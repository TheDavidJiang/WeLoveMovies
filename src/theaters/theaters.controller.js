const theatersService = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundaries")

async function list(req, res, next){
    const { movieId } = req.params
    const theaters = await theatersService.list()
    console.log(theaters)

    res.json({ data: theaters.filter(movieId ? theater => theater.movie_id == movieId : ()=> true)})
    
    // console.log(result)
    // res.json({ data: result })
    
}

// async function list(req, res, next){
//     const theaters = await theatersService.listTheaters()
//     const moviesAndTheaters = await theatersService.listMoviesAndTheaters()
//     const readMoviesAndTheaters = await theatersService.readMoviesAndTheaters()
//     // console.log(moviesAndTheaters)
//     // const results = theaters.map((theater)=>)
//     // for (let theater of theaters) {
//     //     for (let moviesInTheater of moviesAndTheaters){
//     //         if (theater.theater_id === moviesInTheater)
//     //     }
//     // }
//     res.json({ data: readMoviesAndTheaters })
// }

module.exports = {
    list: [asyncErrorBoundary(list)],
}
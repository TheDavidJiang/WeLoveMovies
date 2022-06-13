const moviesService = require("./movies.service")

async function list(req, res, next){
    const is_showing = req.query.is_showing
    if (is_showing){
        return next()
    }
    const data = await moviesService.list()
    res.json({ data })
}

async function listShowing(req, res, next){
    res.json({ data: await moviesService.listShowing() })
}

module.exports = {
    list: [list, listShowing],
    
}
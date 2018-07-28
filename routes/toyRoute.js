const TOY_URL = '/toys';
const toyService = require('../services/toyService')
const reviewService = require('../services/reviewService.js')


module.exports = (app) => {

    app.get('/toys', (req, res) => {
        toyService.query(req.query.name, +req.query.minPrice)
            .then(toys => res.json(toys))
    })
    
    app.get('/toys/:toyId', (req, res) => {     
        const toyId = req.params.toyId;
        console.log('this is route toyId', toyId)
        
        Promise.all([
            toyService.getById(toyId),
            reviewService.query({toyId})
        ])
        .then(([toy, reviews]) => {
            console.log('this is route', toy, reviews)            
            res.json({
                toy, reviews
            })
        })
    })
    
    // return toyService.getById(toyId)
    // .then(toy => {
    //     console.log('toyRoute',res)
    //     res.json(toy)
    // })


    app.delete('/toys/:toyId', (req, res)=>{
        if (!req.session.loggedinUser || !req.session.loggedinUser.isAdmin) return res.status(403).send('Not approved');
        const toyId = req.params.toyId;
        toyService.remove(toyId)
            .then(()=>res.end(`toy ${toyId} Deleted `))
    
    })
    
    app.post('/toys', (req, res) => {
        if (!req.session.loggedinUser.isAdmin) return        
        const toy = req.body;
        toyService.add(toy)
            .then(toy => {
                res.json(toy)
            })
    })
    
    app.put('/toys/:toyId', (req, res)=>{
        if (!req.session.loggedinUser.isAdmin) return        
        const toy = req.body;
        toyService.update(toy)
            .then(toy=>res.json(toy))
    
    })
    
}
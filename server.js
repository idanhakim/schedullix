const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const toyService = require('./services/toyService')
const app = express()
// const reviewService = require('./services/reviewService')

app.use(cors({
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));

app.use(bodyParser.json())
app.use(express.static('dist'))
app.use(cookieParser())

app.use(session({
    secret: 'secret string',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

// const addToyRoutes = require('./routes/toyRoute')
// addToyRoutes(app)

const addUserRoutes = require('./routes/userRoute')
addUserRoutes(app)

// const addReviewRoutes = require('./routes/reviewRoute')
// addReviewRoutes(app)




const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App litening on port ${port}!`)
})
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const toyService = require('./services/toyService')
const app = express()
// const reviewService = require('./services/reviewService')

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
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

const addUserRoutes = require('./routes/userRoute')
addUserRoutes(app);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App litening on port ${port}!`)
})
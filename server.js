// Load Express and create app
const express = require('express')
const app = express()

// Load express-session and set it up
// Documentation: https://github.com/expressjs/session
const session = require('express-session')
app.use(session({
    secret: 'audl2018'
}))

// Enable JSON support
// Documentation: https://expressjs.com/en/api.html#express.json
app.use(express.json())

// Set up templates
// Documentation: https://expressjs.com/en/api.html#app.engine
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// Serve static files
// Documentation: https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// Load Socket.io and set it up
// Documentation: https://socket.io/get-started/chat/
const http = require('http').Server(app)
const io = require('socket.io')(http)

// Real time events
io.on('connection', socket => {
    console.log('Socket connected', socket.id)

    socket.emit('debug message', 'Socket connected to server!')
})

// Load database
const db = require('./database.js')

// Main endpoint where main page is served from
app.get('/', (req, res) => {
    // Render the main.html in the views folder
    res.render('main', { title: 'Main page title' })
})


app.get('/postblog', (req, res) => {
    res.render('postblog', { title: 'Postblog page' })
})

app.get('/blogposts/:id', (req, res) => {
    res.render('blogpost', { title: 'Blogpost page' })
})


// Synchronize database models
// Documentation: http://docs.sequelizejs.com/
db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized..')

    http.listen(3000, () => {
        console.log('Web server started..')
    })
})


// API ROUTES


//used when positng a post
app.post('/postblog', (req, res) => {

    //check validity of values
    db.BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    })
      .then((status) => {
        res.status(201).json({
          status: 'OK'
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 'NOTOK'
        })
      })


});

//used when retrieving all posts
app.get('/allposts', (req, res) => {

    db.BlogPost.findAll({
      order: [
    ['date', 'DESC']
    ]
    })
    .then((results) => {
      res.json(results)
    })
})

// used when retrieving one post
app.post('/onepost', (req, res) => {

    db.BlogPost.findOne({
      where: {
        id: req.body.id
      }
    })
    .then((results) => {
      res.json(results)
    })
})

var express = require('express')
var app = express()
// var bodyParser = require('body-parser')
var cors = require('cors')
var port = 3000



// We are using our packages here
// app.use( bodyParser.json() );       // to support JSON-encoded bodies

// app.use(bodyParser.urlencoded({extended: true}));     // to support URL-encoded bodies
app.use(cors())

//You can use this to check if your server is working
app.get('/', (req, res)=>{
    res.send("Welcome to your server")
})


//Route that handles login logic
app.post('/login', (req, res) =>{
    console.log(req.body.username) 
    console.log(req.body.password) 
})

//Route that handles signup logic
app.post('/signup', (req, res) =>{
console.log(req.body.fullname) 
console.log(req.body.username)
console.log(req.body.password) 
})

//Start your server on a specified port
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is runing on port ${port}`)
})

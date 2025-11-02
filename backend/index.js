const express = require("express");
require('dotenv').config();

const app = express()    // creating instance of express
const port = process.env.PORT || 4000
const mongoDB = require("./db")
const cors = require("cors");   // to handle cross origin resource sharing

mongoDB();

// cors a specific origin at --> localhost:300 with all methods
const corsOptions = {
    origin: ["http://localhost:3000",
        "https://cute-haupia-3901c6.netlify.app/"
    ],
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

// middleware with options --> GET, POST, PUT, DELETE, PATCH, HEAD
app.use(cors(corsOptions));

// middleware for coming json data in req body
app.use(express.json())

app.use('/api', require("./routes/CreateUser"))  // request to api performed by CreateUser
app.use('/api', require("./routes/LoginUser"))   // request to api performed by LoginUser
app.use('/api', require("./routes/DisplayData")) // 
app.use('/api', require("./routes/OrderData"))

// middleware to handle errors
app.use((err, req, res, next)=>{
    console.error(err);
    res.status(500).json({
        success: false, 
        error: "Internal server error!" 
    });
    
    next();
})

// Express server starting & listen on PORT = 4000
app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})
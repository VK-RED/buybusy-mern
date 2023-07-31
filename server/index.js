const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('./config/mongoose'); // DB REQUIRED TO CONNECT OUR SERVER WITH THE MONGO SERVER
const cors = require('cors');
const PORT = 8000;



const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/',require('./routes/index'));



app.listen(PORT,()=>{
    console.log("Server is Listening on the Port: ",PORT);
})

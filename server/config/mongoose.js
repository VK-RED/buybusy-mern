const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://vishnukumart96:Gn8w29vPkYr2GIv6@cluster0.3sc2clv.mongodb.net/buybusy')
    .then(()=>{console.log("Connected to the MongoDB :: busbusy")});

const db = mongoose.connection;






const express = require('express');
const app = express();
const cors = require('cors'); // to access the API from another domain
const bodyParser = require('body-parser'); // to send json data to client
const itemsRoute = require('./routes/items');
const notificationRoute = require('./routes/notifications')
const userRoute = require('./routes/users')
const mongoose = require('mongoose');
require("dotenv").config();


//adding to middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/items', itemsRoute);  //to route to ./items
app.use('/notifications',notificationRoute);
app.use('/auth',userRoute);

//COnnecting DB
mongoose.connect('mongodb+srv://admin:admin@ibmproject.xxfyd.mongodb.net/?retryWrites=true&w=majority',(event)=>{
  console.log("Connected to DB"); //debugging message
}).catch(e=> console.log(e));//error catch

app.listen(4000);

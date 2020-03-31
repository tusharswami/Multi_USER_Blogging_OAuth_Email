const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes Import
const impactRoute = require('./routes/impact');
const authRoute = require('./routes/auth');

//app
const app = express();

//DB
mongoose
    .connect(process.env.DATABASE, {useNewUrlParser : true, useCreateIndex : true, useFindAndModify : false, useUnifiedTopology:true})
    .then(()=>console.log("MongoDB Connected"));
//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
if(process.env.NODE_ENV === 'development'){
    app.use(cors({origin : `${process.env.CLIENT_URL}`}));
}

//routes Middleware
app.use(impactRoute);
app.use(authRoute);

//Port
const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`Backend Server started at PORT ${port}`);
})

const express = require('express');
const mongoose = require('mongoose');
const expressEjsLayouts = require('express-ejs-layouts');
const path = require('path');
require('dotenv').config();

const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(expressEjsLayouts)

const PORT = process.env.PORT || 4000;

app.get('/', (req, res)=> {
    res.json({message:"Server working"});
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    const MONGO_URI = process.env.MONGO_URI;
    mongoose.connect(MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true}, (err) => {
        if (err) throw err;
        console.log('connected to db');
    })
});
const express = require('express');
const cors = require('cors');
const userAuth = require('../routes/userRoutes')


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
        res.json({status:"success", message:"Server is up an running"});
});

app.use('/userAuth', userAuth)


module.exports = app;
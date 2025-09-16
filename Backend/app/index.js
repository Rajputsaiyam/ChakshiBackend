const express = require('express');
const cors = require('cors');
const userAuth = require('../routes/userRoutes')
const clientRoutes = require('../routes/clientRoutes')


const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
        res.json({status:"success", message:"Server is up an running"});
});

app.use('/userAuth', userAuth)
app.use('/clients', clientRoutes)


module.exports = app;
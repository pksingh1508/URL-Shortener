const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

exports.dbConnector = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUniFiedTopology: true,
    })
    .then(() => {
        console.log("DB connection established");
    })
    .catch(() => {
        console.log("DB connection failed");
    })
}
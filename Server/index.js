const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

app.use(express.json());
app.use(cors({ credentials: true }));

require("./connect").dbConnector();

const urlRoute = require('./routes/url');
app.use("/url", urlRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
})



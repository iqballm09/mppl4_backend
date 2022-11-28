const sequelize = require("./database/connection");
const bodyParser = require("body-parser");
const routes = require("./routes");
const express = require("express");

const app = express();

app.use(bodyParser.json());

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //replace localhost with actual host
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, auth-token, Authorization');
    next();
});

app.use("/api", routes);

// Testing connection
app.listen(process.env.PORT || 5000, async () => {
    try {
        await sequelize.authenticate();
        console.log("Database has been connected!");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});


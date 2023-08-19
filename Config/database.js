const mongoose = require('mongoose');

const dbConnection = () => {
    //connection Database
    mongoose
        .connect(process.env.DB_URI)
        .then((coon) => {
            console.log(`Database is connected ${coon.connection.host}`);
        })
};

module.exports = dbConnection
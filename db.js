const mongoose = require('mongoose');

// 4. Create connection
async function databaseConnection()
{
    let connection = await mongoose.connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    });
  console.log("connected to database")
}

module.exports = databaseConnection;
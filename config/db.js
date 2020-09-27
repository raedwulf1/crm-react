const mongoose = require('mongoose');
// require('dotenv').config({ path: 'variables.env' })
require('dotenv').config({path: __dirname + '/variables.env'})

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true 
      });
      console.log('DB Connected');
    } catch (error) {
      console.log('Error connecting with DB');
      console.log(error);
      process.exit(1);
    }
}


module.exports = connectDB;
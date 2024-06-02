const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true"


const connectToMongo = async(name) => {
  await mongoose.connect(mongoURI);
   console.log("connected")
}

module.exports = connectToMongo;



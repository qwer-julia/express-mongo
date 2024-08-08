import mongoose from "mongoose";

async function conectaNoDatabase(){
  mongoose.connect(process.env.MONGODB_URI);

  return mongoose.connection;
}

export default conectaNoDatabase;
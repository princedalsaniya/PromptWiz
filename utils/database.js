import mongoose from "mongoose";

/*
  desc      : Util - connectToDB
  route     : -
  requires  : mongoose = node module to handle mongoDB related work.
  exports   : connectToDB = function which will connect to mongoDB database
  author    : Prince Dalsaniya
*/

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected.');
        return;
    } 
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'shared_prompts',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true;

        console.log('MongoDB is connected.');
    } catch (error) {
        console.log(error);
    }
}
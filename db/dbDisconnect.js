//Mongoose Import
import mongoose from 'mongoose'

//Connect Function to MongoDB
export default async function disconnectDb() {
  // Use connect method to connect to the server
  try {
    const conn = await mongoose.disconnect()
    console.log(`MongoDB Disconnected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

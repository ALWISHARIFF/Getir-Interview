//Mongoose Import
import mongoose from 'mongoose'

//Connect Function to MongoDB
export default async function connectDb() {
  // Use connect method to connect to the server
  try {
    const conn = await mongoose.connect(process.env.MONGOURI)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

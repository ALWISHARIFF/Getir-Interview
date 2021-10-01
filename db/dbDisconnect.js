//Mongoose Import
import mongoose from 'mongoose'

//Disconnect Function to MongoDB
export default async function disconnectDb() {
  // Use Disconnect method to disconnect from the database
  try {
    const conn = await mongoose.disconnect()
    console.log(`MongoDB Disconnected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

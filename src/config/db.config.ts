import mongoose from "mongoose"


async function dbConfig() {
    try {
        await mongoose.connect(Bun.env.MONGO_URI!)
        console.log("MongoDB connected...")
    } catch (error) {
        console.log("MongoDB connection error: ", error)
        process.exit(1)
    }
}
export default dbConfig
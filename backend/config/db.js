import mongoose from "mongoose";


const conectToDB = () => {
    mongoose.connect(process.env.MONGO, {
    })
        .then(() => console.log("MongoDB connected"))
        .catch((error) => console.log("MongoDB connection error:", error));

}

export default conectToDB
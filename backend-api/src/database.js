import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then((event) => console.log("Successfully connected to:", event.connection.name))
    .catch((error) => console.log("ERROR DETECTED: ", error));

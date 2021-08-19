import express from 'express';
import cors from 'cors'
import authRoutes from "./routes/auth"
import userRoutes from "./routes/users"
import movieRoutes from "./routes/movies"
import listRoutes from "./routes/lists";
import homeRoutes from "./routes/home"
const app = express();
// SETTINGS
app.set('PORT', process.env.PORT || 5000)

// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES

app.use("/", homeRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", movieRoutes);
app.use("/", listRoutes);
export default app

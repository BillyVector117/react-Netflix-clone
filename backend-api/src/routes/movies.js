import { Router } from "express"
import { deleteMovie, getAllMovies, getMovie, getRandomMovieOrSerie, newMovie, updateMovie } from "../controllers/movies.controller"
import verifyMyToken from "../middlewares/verifyToken"
const router = Router()
// CREATE movie
router.post("/movie&series", verifyMyToken, newMovie)
router.put("/movie&series/:id", verifyMyToken, updateMovie)
router.delete("/movie&series/:id", verifyMyToken, deleteMovie)
router.get("/movie&series/:id", verifyMyToken, getMovie)
router.get("/movies&series/random", verifyMyToken, getRandomMovieOrSerie)
router.get("/movies&series", verifyMyToken, getAllMovies)



export default router

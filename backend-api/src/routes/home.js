import { Router } from "express"
import { home } from "../controllers/home.controller"
const router = Router()
router.get("/home", home)
export default router
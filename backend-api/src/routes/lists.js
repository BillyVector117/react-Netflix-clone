import { Router } from "express"
import { createList, deleteList, getAllLists, updateList } from "../controllers/list.controller"
import verifyMyToken from "../middlewares/verifyToken"
const router = Router()
router.delete("/lists/:id", verifyMyToken, deleteList)
router.put("/lists/:id", verifyMyToken, updateList)
router.get("/lists", verifyMyToken, getAllLists)
router.post("/lists", verifyMyToken, createList)
export default router

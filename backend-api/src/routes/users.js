import { Router } from "express"
import { update, deleteUser, getAll, getOne, getStats, updateBeingAdmin } from "../controllers/user.controller"
import verifyMyToken from "../middlewares/verifyToken"
const router = Router()
// UPDATE
router.get("/users", verifyMyToken, getAll)
router.delete("/users/:id", verifyMyToken, deleteUser)
router.get("/users/:id", getOne)
router.put("/users/:id", verifyMyToken, updateBeingAdmin)
router.put("/:id", verifyMyToken, update)
router.get("/stats", verifyMyToken, getStats)

export default router

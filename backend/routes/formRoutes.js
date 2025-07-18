import express from "express"
import formCtrl from "../controllers/formCtrl.js"

const router = express.Router()

router.get("/",formCtrl.list)
router.post("/form/create",formCtrl.create)
router.put("/form/:id/edit",formCtrl.update)
router.get("/form/:id",formCtrl.getById)
router.delete("/form/:id",formCtrl.delete)

export default router
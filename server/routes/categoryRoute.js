import { Router } from 'express'
import auth from '../middleware/auth.js'
import { AddCategoryController, getAllCategoryController } from '../controllers/categoryController.js'

const categoryRouter = Router()

categoryRouter.post("/add-category", auth, AddCategoryController)
categoryRouter.get("/get-category",getAllCategoryController)

export default categoryRouter;
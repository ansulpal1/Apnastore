import { Router } from 'express'
import auth from '../middleware/auth.js'
import { AddCategoryController, deleteCategoryController, getAllCategoryController, updateCategoryController } from '../controllers/categoryController.js'

const categoryRouter = Router()

categoryRouter.post("/add-category", auth, AddCategoryController)
categoryRouter.get("/get-category",getAllCategoryController)
categoryRouter.put("/update-category",auth,updateCategoryController)
categoryRouter.delete("/delete-category",auth,deleteCategoryController)

export default categoryRouter;
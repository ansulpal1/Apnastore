
import CategoryModel from '../models/categoryModel.js';

// add cetegory
export const AddCategoryController = async (req, res) => {

    try {
        const { name, image } = req.body

        if (!name || !image) {
            return res.status(400).json({
                message: "Please fill in all fields",
                error: true,
                success: false
            })
        }
        const addCategory = new CategoryModel({
            name,
            image
        })
        const saveCategory = await addCategory.save()
        if (!saveCategory) {
            return res.status(500).json({
                message: "Category not save",
                error: true,
                success: false


            })
        }

        return res.json({
            message: "Category added successfully",
            success: true,
            error: false,
            data: saveCategory
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}
// get all categories
export const getAllCategoryController = async (req, res) => {
    try {
        const data = await CategoryModel.find()
        return res.json({
            data:data,
            success: true,
            error: false
        })

    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
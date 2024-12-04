
import CategoryModel from '../models/categoryModel.js';
import SubCategoryModel from '../models/subCategoryModel.js';
import ProductModel from '../models/productModel.js';

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
// update category
export const updateCategoryController = async (req, res) => {
    try {
        const {_id,name,image }=req.body
        const updateCategory = await CategoryModel.updateOne({
            _id:_id
        },{
            name,
            image
        })
        return res.json({
            message: "Category updated successfully",
            success: true,
            error: false,
            data:updateCategory
        })

    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
//delet category
export const deleteCategoryController = async (req, res) =>{
    try {
        const {_id}=req.body
        const checkSubCategory=await SubCategoryModel.find({
            category:{
                "$in":[_id]
            }
            }).countDocument()
        const checkProduct=await ProductModel .find({
            category:{
                "$in":[_id]
            }
            }).countDocument()
            if(checkSubCategory>0 || checkProduct>0){
                return res.status(400).json({
                    message: "Category is not deleted because it has subcategory or product",
                    success: false,
                    error: true
                })
            }
            const deleteCategory = await CategoryModel.deleteOne({
                _id:_id
            })
            return res.json({
                message: "Category deleted successfully",
                success: true,
                error: false,
                data:deleteCategory
            })

            


    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}
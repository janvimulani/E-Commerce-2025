import { SubCategory } from "../DataBase/SubCategorySchema";
import  { Request, Response } from "express";
import { EcomSubCategory } from "../model/EcomSubCategory";


/**
 * usage : Get All SubCaterory
 * methods : GET
 * params : not - params
 * url : http://127.0.0.1:6666/subCategory
 * 
 */

export const getAllSubCategory = async (request: Request, response: Response) => {
    try {
        const thegetCategory: EcomSubCategory[] | null | undefined = await SubCategory.find()

        return response.status(200).json({
            data: thegetCategory,
            msg: "Get all SubCategory"
        })
    } catch (error) {
        console.error("Error :", error);
        return response.status(500).json({
            msg: "Failed to  Subcategories",

        });
    }
}



/**
 * usage : Get A SubCaterory
 * methods : GET
 * params : SubCategoryID
 * url : http://127.0.0.1:6666/subCategoryID
 * 
 */
export const getSubCategory = async (request: Request, response: Response) => {
    try {
        let { id } = request.params
        const thegetCategory: EcomSubCategory[] | null | undefined = await SubCategory.findById(id)

        return response.status(200).json({
            data: thegetCategory,
            msg: "Get all SubCategory"
        })
    } catch (error) {
        console.error("Error :", error);
        return response.status(500).json({
            msg: "Failed to  Subcategories",

        });
    }

}

/**
 * usage : Create a SubCategory
 * methods : POST,
 * params : name , description , logo , isActive 
 * url : http://127.0.0.1:6666/subCategory
 */

export const CreateSubCategory = async (request: Request, response: Response) => {
    try {

       let {category_id , name , description , isActive , logo} = request.body

       const newCategory:EcomSubCategory | null | undefined = await new SubCategory({
        category_id , name , description , isActive , logo
       }).save()

        return response.status(201).json(
            {
                data: newCategory,
                msg: 'SubCategory create successfully'
            }
        )
    } catch (error) {
        console.error("Error creating category:", error);
        return response.status(500).json({
            msg: "Failed to create Subcategory",
        });
    }

}

/**
 * usage : Update a Subcategory 
 * methods:PUT,
 * params:name , description , logo , isActive  , SubCategoryID
 * url : http://127.0.0.1:6666/subCategory/subCategory
 */

export const UpdateSubCategory = async (request: Request, response: Response) => {

    try {
        let { id } = request.params;

        //  Check  category
        const Category = await SubCategory.findById(id);
        if (!Category) {
            return response.status(404).json({
                msg: "SubCategory not found",
            });
        }

        // Update the category
        let { category_id, name, description, isActive, logo } = request.body;

        const theUpdateCategoty: EcomSubCategory | null | undefined = await SubCategory.findByIdAndUpdate(id,
            { name, description, logo, isActive, category_id },
            { new: true }
        )

        return response.status(201).json({
            data: theUpdateCategoty,
            msg: 'SubCategory updated successfully'
        })
    } catch (error) {
        console.error("Error updating category:", error);
        return response.status(500).json({
            msg: "Failed to update Subcategory",

        });
    }


}




/**
 * usage : Delete SubCategory 
 * methods:DELETE
 * Params:SubCategoryID
 * url : http://127.0.0.1:6666/subCategoryID
 */

export const DeleteSubCategory = async (request: Request, response: Response) => {

    try {
        let { id } = request.params

        //  Check  Subcategory
        const Category = await SubCategory.findById(id);
        if (!Category) {
            return response.status(400).json({
                msg: "SubCategory not found",
            });
        }
     await SubCategory.findByIdAndDelete(id)

        return response.status(202).json({
            data: null,
            msg: "subCategory is Deleted"
        })

    } catch (error) {
        console.error("Error deleting subcategory:", error);
        return response.status(500).json({
            msg: "Failed to delete SubCategory",

        });
    }

}
import { Category } from "../DataBase/CategorySchema";
import  { Request, Response } from "express";
import { EcomCategory } from "../model/EcomCategory";


/**
 * usage : Get All SubCaterory
 * methods : GET
 * params : not - params
 * url : http://127.0.0.1:6666/category
 */

export const getAllCategory = async (request: Request, response: Response) => {
    try {
        const thegetCategory: EcomCategory[] | null | undefined = await Category.find()

        return response.status(200).json({
            data: thegetCategory,
            msg: "Get all Category"
        })
    } catch (error) {
        console.error("Error :", error);
        return response.status(500).json({
            msg: "Failed to  categories",
        });
    }
}



/**
 * usage : Get A Caterory
 * methods : GET
 * params : CategoryID
 * url : http://127.0.0.1:6666/category/categoryID
 * 
 * 
 */
export const getCategory = async (request: Request, response: Response) => {
    try {
        let {id} = request.params
        const thegetCategory: EcomCategory[] | null | undefined = await Category.findById(id)

        return response.status(200).json({
            data: thegetCategory,
            msg: "Get all Category"
        })
    } catch (error) {
        console.error("Error :", error);
        return response.status(500).json({
            msg: "Failed to  categories",

        });
    }

}

/**
 * usage : Create a Category
 * methods : POST,
 * params : category_name , category_description , category_logo , category_isActive 
 * url : http://127.0.0.1:6666/category
 */

export const CreateCategory = async(request:Request , response:Response)=>
{
    try {
        let { category_name, category_description, category_logo, isActive } = request.body;

        const newCategory: EcomCategory | null | undefined = await new Category({
            category_name, category_description, category_logo, isActive
        }).save()
        return response.status(201).json({
                data: newCategory,
                msg:'Category create successfully'
            }
        )
    } catch (error) {
        console.error("Error creating category:", error);
        return response.status(500).json({
            msg: "Failed to create Category",
        });
    }
    
}

/**
 * usage : Update a Category 
 * methods:PUT,
 * params:category_name , category_description , category_logo , isActive , CategoryID
 * url : http://127.0.0.1:6666/category/categoryID
 * 
 */

export const UpdateCategory = async(request:Request , response:Response)=>
{
    try {
        let { id } = request.params;

        //  Check  category
        const CheckCategory = await Category.findById(id);
        if (!CheckCategory) {
            return response.status(400).json({
                msg: "Category not found",
            });
        }

        // Update the category
        let { category_name, category_description, category_logo, isActive } = request.body;

        const theUpdateCategoty: EcomCategory | null | undefined = await Category.findByIdAndUpdate(id,
            { category_name, category_description, category_logo, isActive },
            { new: true }
        )

        return response.status(201).json({
            data:theUpdateCategoty,
            msg:'Category updated successfully'
        })
    } catch (error) {
        console.error("Error updating category:", error);
        return response.status(500).json({
            msg: "Failed to update Category",
           
        });
    }
   

}

/**
 * usage : Delete Category 
 * methods:DELETE
 * Params:CategoryID
 * url : http://127.0.0.1:6666/category/categoryID
 * 
 */

export const DeleteCategory = async(request:Request , response:Response)=>
{
    try {
        let { id } = request.params

        //  Check  Category
        const CheckCategory = await Category.findById(id);
        if (!CheckCategory) {
            return response.status(400).json({
                msg: "Category not found",
            });
        }
        
        await Category.findByIdAndDelete(id)

   


    } catch (error) {
        console.error("Error deleting Category:", error);
        return response.status(500).json({
            msg: "Failed to delete Category",
            
        });
    }
   
}
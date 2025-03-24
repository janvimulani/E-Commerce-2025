import { Router, Request, Response, response } from "express";
import * as SubCategory from '../controllers/SubCategoryControlle'

const SubCategoryRouter: Router = Router();

/**
 * usage : Get All SubCaterory
 * methods : GET
 * params : not - params
 * url : http://127.0.0.1:6666/subCategory
 * 
 */


SubCategoryRouter.get('/', async (request: Request, response: Response) => {
    await SubCategory.getAllSubCategory(request, response)
})

/**
 * usage : Get A SubCaterory
 * methods : GET
 * params : SubCategoryID
 * url : http://127.0.0.1:6666/subCategoryID
 * 
 */

SubCategoryRouter.get('/:id', async (request: Request, response: Response) => {
    await SubCategory.getSubCategory(request, response)
})

/**
 * usage : Create a SubCategory
 * methods : POST,
 * params : name , description , logo , isActive 
 * url : http://127.0.0.1:6666/subCategory
 */

SubCategoryRouter.post('/', async (request: Request, response: Response) => {
    await SubCategory.CreateSubCategory(request, response)
})

/**
 * usage : Update a Subcategory 
 * methods:PUT,
 * params:name , description , logo , isActive  , SubCategoryID
 * url : http://127.0.0.1:6666/subCategory/subCategory
 */

SubCategoryRouter.put("/:id" , async(request:Request , response:Response)=>
{
    await SubCategory.UpdateSubCategory(request,response)
})

/**
 * usage : Delete SubCategory 
 * methods:DELETE
 * Params:SubCategoryID
 * url : http://127.0.0.1:6666/subCategoryID
 */


SubCategoryRouter.delete("/:id", async (request: Request, response: Response) => {
    await SubCategory.DeleteSubCategory(request, response)
})

export default SubCategoryRouter;
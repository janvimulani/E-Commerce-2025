import { Router, Request, Response } from "express";
import * as Product from '../controllers/ProductController'
import { log } from "console";
import { upload } from "../Multer/upload";


const ProductRouter: Router = Router()

/**
 * usage:Get All Product
 * methods:GET
 * url: http://127.0.0.1:6666/product/
 * params:not-params
 */

ProductRouter.get('/', async (request: Request, response: Response) => {
    await Product.getAllProduct(request, response)
})


/**
 * usahe:Get Product
 * methods:GET
 * params:ProductID
 * url: http://127.0.0.1:6666/product/ProductID
 */

ProductRouter.get("/:id", async (request: Request, response: Response) => {
    await Product.getProduct(request, response)
})


/**
 * usage : Create a Product 
 * methods:POST,
 * params: SubCategory_id, product_name,
            product_image, product_images,
            product_description, product_brand,
            product_price, product_quantity, isActive
 * url: http://127.0.0.1:6666/product
 */


ProductRouter.post("/", upload.fields([
    { name: 'singelImg', maxCount: 1 },
    { name: 'Multipleimg', maxCount: 8 }
]) ,  async (request: Request, response: Response) => {
    console.log(request);
    await Product.createProduct(request, response)
})

/**
 * usage : Update a Product
 * method:PUT
 * params: SubCategory_id, product_name,
            product_image, product_images,
            product_description, product_brand,
            product_price, product_quantity, isActive , productID
 * url:http://127.0.0.1:6666/product/productID
 */

ProductRouter.put("/:id", async (request: Request, response: Response) => {
    await Product.UpdateProduct(request, response)
})


/**
 * usage:Delete a Product
 * methods:DELETE
 * patams : productId
 * url:http://127.0.0.1:6666/product/productID
 */

ProductRouter.delete("/:id", async (request: Request, response: Response) => {
    await Product.DeleteProduct(request, response)
})




export default ProductRouter
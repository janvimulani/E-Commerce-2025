import { NextFunction, Request, response, Response } from "express";
import { EcomProduct } from "../model/EcomProduct";
import { Product } from "../DataBase/ProductSchema";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary"
import fs from "fs";

/**
 * usage:Get All Product
 * methods:GET
 * url: http://127.0.0.1:6666/product/
 * params:not-params
 */

export const getAllProduct = async (request: Request, response: Response) => {
    try {
        const theGetAllProduct: EcomProduct[] | null | undefined = await Product.find();

        return response.status(200).json({
            data: theGetAllProduct,
        })

    } catch (error) {
        return response.status(500).json({ error: `Server error  : , ${error}` });

    }

}

/**
 * usahe:Get Product
 * methods:GET
 * params:ProductID
 * url: http://127.0.0.1:6666/product/ProductID
 */

export const getProduct = async (request: Request, response: Response) => {
    try {
        let { id } = request.params

        let mongoshId = new mongoose.Types.ObjectId(id)

        const theGetProduct: EcomProduct | null | undefined = await Product.findById(mongoshId)

        return response.status(201).json(theGetProduct)
    } catch (error) {
        return response.status(500).json({ error: `Server error  : , ${error}` });

    }
}


/**
 * usage : Create a Product 
 * methods:POST,
 * params: SubCategory_id, product_name,
            product_image, product_images,
            product_description, product_brand,
            product_price, product_quantity, isActive
 * url: http://127.0.0.1:6666/product
 */

export const createProduct = async (request: Request, response: Response) => {

    try {

        let { SubCategory_id, product_name,
            product_description, product_brand,
            product_price, product_quantity, isActive
        } = request.body


        console.log(process.env.CLOUDINARY_API_KEY);

        // Img Upload in Cloudinary

        const files = request.files as { [fileName: string]: Express.Multer.File[] };

        if (!files) {
            return response.status(400).json({ error: "Please upload  image" });

        }

        // single image upload

        const singleFile = files["singelImg"][0];
        const singleProduct = await cloudinary.uploader.upload(singleFile.path, {
            resource_type: "auto",
        })
        console.log(singleProduct.secure_url);

        fs.unlinkSync(singleFile.path)

        // multiple image upload

        const multipleImages = files["Multipleimg"];

        let productImages: string[] = []

        for (const img of multipleImages) {
            const multipleImagesProduct = await cloudinary.uploader.upload(img.path, {
                resource_type: "auto",
            })
            productImages.push( multipleImagesProduct.secure_url )
            fs.unlinkSync(img.path)

        }

       
        // Create a New Product
        const theCreateProduct: EcomProduct | null | undefined = await new Product({
            SubCategory_id, product_name,
            product_image: singleProduct.secure_url || "", product_images: productImages || "",
            product_description, product_brand,
            product_price, product_quantity, isActive
        }).save()



        return response.status(201).json(theCreateProduct)
    } catch (error) {
        console.log(error);

        return response.status(500).json({ error: `Server error  : , ${error}` });

    }

}



/**
 * usage : Update a Product
 * method:PUT
 * params: SubCategory_id, product_name,
            product_image, product_images,
            product_description, product_brand,
            product_price, product_quantity, isActive , productID
 * url:http://127.0.0.1:6666/product/productID
 */

export const UpdateProduct = async (request: Request, response: Response) => {
    try {
        let { id } = request.body;
        const checkID = await Product.findById(id)
        if (!checkID) {
            return response.status(400).json('Product not found')
        }

        let { SubCategory_id, product_name,
            product_image, product_images,
            product_description, product_brand,
            product_price, product_quantity, isActive
        } = request.body

        const theUpdateProduct: EcomProduct | null | undefined = await Product.findByIdAndUpdate(id, {
            SubCategory_id, product_name,
            product_image, product_images,
            product_description, product_brand,
            product_price, product_quantity, isActive
        },
            { new: true })

        return response.status(201).json(theUpdateProduct)
    } catch (error) {
        response.status(500).json({ error: `Server error  : , ${error}` });

    }
}

/**
 * usage:Delete a Product
 * methods:DELETE
 * patams : productId
 * url:http://127.0.0.1:6666/product/productID
 */
export const DeleteProduct = async (request: Request, response: Response) => {
    try {
        let { id } = request.params;


        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            return response.status(400).json({ error: "Product not found" });
        }

        return response.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return response.status(500).json({ error: `Server error  : , ${error}` });

    }

}
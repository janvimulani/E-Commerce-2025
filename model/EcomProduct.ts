import mongoose from "mongoose";

export interface EcomProduct {
    SubCategory_id : mongoose.Types.ObjectId;
    product_name:string;
    product_description:string;
    product_image:string;
    product_images: string[];
    product_price:string;
    product_brand:string;
    product_quantity:string;
    isActive:Boolean;
}


export interface ProductImgs {
    url:string;
}


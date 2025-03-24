import mongoose, { Schema } from "mongoose";
import { EcomProduct } from "../model/EcomProduct";


const ProductSchema = new Schema<EcomProduct>({
    SubCategory_id: { type: Schema.Types.ObjectId, ref:"SubCategory"},
    product_name:{type:String , required:true , trim:true , lowercase:true},
    product_description:{type:String , trim:true},
    product_image:{type:String , },
    product_images:[{type:String}],
    product_price:{type:String , required:true },
    product_brand:{type:String , required:true},
    product_quantity:{type:String},
    isActive:{type:Boolean , default:false}

},{
    timestamps:true
})

export const Product = mongoose.model<EcomProduct>("Product" , ProductSchema);
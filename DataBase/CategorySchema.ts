import mongoose, { Schema } from 'mongoose'
import { EcomCategory } from '../model/EcomCategory'

const CatagorySchema = new Schema<EcomCategory>({
    
    category_name: { type: String, required: true, lowercase: true },
    category_description: { type: String, trim: true },
    category_logo: { type: String , },
    isActive: { type: Boolean  , default:true}

}, { timestamps: true })

export const Category = mongoose.model<EcomCategory>("Category", CatagorySchema)
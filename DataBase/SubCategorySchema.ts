import mongoose, { Schema } from 'mongoose'
import { EcomSubCategory } from '../model/EcomSubCategory'

const SubCategorySchema = new Schema<EcomSubCategory>(
    {
        category_id: { type: Schema.Types.ObjectId, ref:"Category" },
        name: {type: String, required: true, lowercase: true},
        description: { type: String, trim: true },
        logo: { type: String },
        isActive: { type: Boolean , default:true }

    }, { timestamps: true })

export const SubCategory = mongoose.model<EcomSubCategory>("SubCategory", SubCategorySchema)


import mongoose from "mongoose"

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    regularPrice: {
        type: String,
        required: true
    },
    discountPercent: {
        type: String,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true
    },
    clothType: {
        type: String,
        enum: ["jens", "tshirt", "Sweaters", "Pants", "Shooes", "Pijamas", "socks"],
        required: true
    },
    type: {
        type: String,
        enum: ["boy", "girl", "baby"],
        required: true,
    },
    imageURLs: {
        type: Array,
        required: true
    }


}, {
    timestamps: true
})

const Product = mongoose.model('Product', ProductSchema)

export default Product
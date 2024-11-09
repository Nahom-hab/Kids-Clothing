import mongoose from "mongoose"

const OrderSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    Reciptphoto: {
        type: String,
        required: true,
    },
    PaymentChooice: {
        type: String,
        enum:['CBE','Telebirr','CBEbirr','abissynia','awash'],
        required: true,
    }

}, {
    timestamps: true
})

const Order = mongoose.model('Order', OrderSchema)

export default Order
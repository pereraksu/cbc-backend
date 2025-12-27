import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    productName : {
        type: String,
        required: true
    },

    altNames : [{
        type: String,
        required: true 
    }
       
    ],

    images : {
        type: String,
        required: true
    },

    stock : {
        type: Number,
        required: true
    },

    description : {
        type: String,
        required: true
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
/*import express from "express";

const productrouter = express.Router();
productrouter.get("/", (req, res) => {
    
})

productrouter.post("/", (req, res) => {
    console.log("This is a post request for product router");
    res.json({
        message:"This is a post request for product router"
    }) 
})
export default productrouter;
*/

import product from "../models/product.js";

export function getproducts(req, res) {

    product.find().then(

        (productlist)=>{
            res.json({
            list :productlist
        })
}
    ).catch(
        (err)=>{
            res.json({
                message : "Error"
            })
        }
    )
}

export function createproduct(req, res) {
    
    console.log(req.user);

    if(req.user==null){
        res.json({
            message : "User not logged in"
        })
        return;
    }

    if(req.user.type!=="admin"){
        res.json({
            message : "You are not admin"
        })
        return;
    }
    const newProduct = new product(req.body);
    newProduct.save().then(
        ()=>{
            res.json({
                message : "Product created"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Product not created"
            })
        }
    )
}

export function deleteproduct(req, res) {
    product.deleteOne({name : req.params.name}).then(
        ()=>{
            res.json({
                message : "Product deleted successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Product not deleted"
            })
        }
    )
}

export function getProductByName(req, res) {

    const name=req.params.name;

   /* res.json({
        message: "Product name is "+name
    })*/

    /*product.find({name : name}).then(
        (productlist)=>{
            res.json({
                list : productlist
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message : "Error"
            })
        }
    )*/

        product.find({name:name}).then(

            (productList)=>{

                if(productList.length=== 0){
                    res.json({
                        message : "Product not found",
                    })
                }else{
                    res.json({
                        list : productList
                    })
                }
            }
        )
}
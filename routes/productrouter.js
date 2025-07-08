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
export default productrouter;*/

import express from "express";
import { getproducts, getProductByName, createproduct, deleteproduct} from "../controllers/productcontroller.js";

const productrouter = express.Router();

productrouter.get("/",getproducts);

productrouter.get("/filter",(req,res)=>{
    res.json({
        message:"This is product Filtering area"
    });
});

productrouter.get("/byName",getProductByName);
productrouter.post("/",createproduct);
productrouter.delete("/:name",deleteproduct);

export default productrouter;
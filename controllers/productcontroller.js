import Product from "../models/product.js";

export function createProduct(req, res) {
    const newProduct = new Product(req.body);

    newProduct.save()
        .then(() => {
            res.json({ message: "Product created" });
        })
        .catch(() => {
            res.json({ message: "Product not created" });
        });
}

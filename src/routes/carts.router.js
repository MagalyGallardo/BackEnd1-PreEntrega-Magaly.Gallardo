import {Router} from "express";
import {cartManager} from "../app.js";

const cartRouter = Router();
cartRouter.post("/", async (req,res)=>{
    try{
        const response = await cartManager.addCart();
        res.json(response)
    }catch (error){
        res.send("Error al crear producto")
        console.log(error);
    }

})
cartRouter.get("/:cid", async (req, res) => {
    let cid = req.params.cid;
    try{
        const cart = await cartManager.getCartById(cid)
        res.json(cart.products)
    }catch(error){
        res.send("Error al obtener producto")
    }
})
cartRouter.post("/:cid/product/:pid", async (req,res) => {
    let cid=req.params.cid;
    let pid=req.params.pid;
    let quantity=req.body.quantity || 1;

    try{
        const actualizado = await cartManager.addProductsToCart(cid,pid,quantity)
        res.json(actualizado.products)
    }catch(error){
        res.send("Error al actualizar")
        console.log(error);
    }

})

export {cartRouter};
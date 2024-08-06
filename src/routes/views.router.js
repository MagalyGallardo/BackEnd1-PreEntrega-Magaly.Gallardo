import {Router} from "express";
import {productManager} from "../app.js";

const viewsRouter = Router();

viewsRouter.get("/products", async (req, res) => {
        const productos = await productManager.getProducts();
        res.render("home", {productos});
    }
)

viewsRouter.get("/realtimeproducts", async (req, res) => { 
        res.render("realtimeproducts");    
    }
)

export {viewsRouter};
import express from "express"; 
import {engine} from "express-handlebars";
import {ProductManager} from "./managers/productManager.js";
import {CartManager} from "./managers/CartManager.js";
import {productsRouter} from "./routes/products.router.js";
import {cartRouter} from "./routes/carts.router.js";
import {viewsRouter} from "./routes/views.router.js";
import {Server} from "socket.io"

const app = express();
const PUERTO = 8080;

const productManager = new ProductManager ('./src/data/products.json');
const cartManager = new CartManager ('./src/data/carts.json');

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('src/public'))

//Configuracion Express Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views")

//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});

const io = new Server(httpServer);
io.on("connection", async (socket) =>{
    socket.on('message', (data) => {
        console.log(`Cliente conectado ${data}`)
});
    socket.emit("products", await productManager.getProducts());
    socket.on("deleteProduct", async (productId) => {
        console.log("Id recibido!!", productId);
    productManager.deleteProduct(productId);
    socket.emit("products", await productManager.getProducts());
        console.log("Se actualizaron los productos");
});

    socket.on("productForm" , async (data) => {
    const { title, description, price, thumbnail, code, stock, category } = data;
    await productManager.addProduct({ title, description, price, thumbnail, code, stock, category });
    socket.emit("products", await productManager.getProducts());
        console.log("Se actualizaron los productos");
});

})

export {productManager}
export {cartManager} 
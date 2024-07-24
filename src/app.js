
import express from 'express';
import { ProductManager } from './productManager.js';
import { productsRouter } from './routes/products.router.js'; 
import { CartManager } from './cartManager.js';
import { cartsRouter } from './routes/carts.router.js';

const PUERTO = 8080;
const app = express();

export const productManager = new ProductManager('products.json');
export const cartManager = new CartManager('carts.json');

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});

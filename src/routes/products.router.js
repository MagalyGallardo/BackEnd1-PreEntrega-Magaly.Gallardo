
import { Router } from 'express';
import { productManager } from '../app.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await productManager.getProducts();
        if (limit) {
            const limitProd = products.slice(0, limit);
            return res.json(limitProd);
        }
        return res.json(products);
    } catch (error) {
        console.log('ERROR');
        res.status(500).send('Error al recibir los productos');
    }
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.json(product);
    } catch (error) {
        console.log('ERROR');
        res.status(500).send('Error al recibir el producto por ID');
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const { title, price, img, description, code, stock, category } = req.body;
        const response = await productManager.addProduct({ title, price, img, description, code, stock, category });
        res.json(response);
    } catch (error) {
        console.log('Error');
        res.status(500).send('Error al agregar producto');
    }
});

productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const { title, price, img, description, code, stock, category } = req.body;
        const response = await productManager.updateProduct(pid, { title, price, img, description, code, stock, category });
        res.json(response);
    } catch (error) {
        console.log('Error');
        res.status(500).send(`Error al editar el producto ${pid}`);
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productManager.deleteProduct(pid);
        res.send('Eliminado!');
    } catch (error) {
        console.log('Error');
        res.status(500).send(`Error al eliminar el producto ${pid}`);
    }
});

export { productsRouter };

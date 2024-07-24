
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    addProduct = async ({ title, description, price, img, code, stock, category }) => {
        const id = uuidv4();
        let newProduct = { id, title, description, price, img, code, stock, category };

        this.products.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2)); 

        return newProduct;
    }

    getProducts = async () => {
        const response = await fs.readFile(this.path, 'utf8');
        const responseJSON = JSON.parse(response);

        return responseJSON;
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        const product = products.find(product => product.id === id);

        if (product) {
            return product;
        } else {
            console.log('El producto no se encuentra');
        }
    }

    updateProduct = async (id, data) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products[index] = { id, ...data };
            await fs.writeFile(this.path, JSON.stringify(products));
            return products[index];
        } else {
            console.log('El producto no se encuentra');
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(products));
        } else {
            console.log('El producto no se encuentra');
        }
    }
}

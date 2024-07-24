import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export class CartManager {
    constructor() {
        this.path = 'carts.json';
        this.carts = [];
    }

    getCarts = async () => {
        const response = await fs.readFile(this.path, 'utf8');
        const responseJSON = JSON.parse(response);
        return responseJSON;
    };

    getCartProducts = async (id) => {
        const carts = await this.getCarts(); 
        const cart = carts.find(cart => cart.id === id);

        if (cart) {
            return cart.products;
        } else {
            console.log('Carrito not found');
            return []; 
        }
    };

    newCart = async () => {
        const id = uuidv4();

        const newCart = { id, products: [] };

        const carts = await this.getCarts();
        carts.push(newCart);

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    };

    addProductToCart = async (cart_id, product_id) => {
        const carts = await this.getCarts();
        const index = carts.findIndex(cart => cart.id === cart_id);

        if (index !== -1) {
            const cartProducts = carts[index].products; 
            const existProdIndex = cartProducts.findIndex(product => product.product_id === product_id);

            if (existProdIndex !== -1) {
                cartProducts[existProdIndex].quantity += 1;
            } else {
                cartProducts.push({ product_id, quantity: 1 });
            }

            carts[index].products = cartProducts; 
            await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
            console.log('Producto Agregado');
        } else {
            console.log('Carrito no encontrado');
        }
    };
}

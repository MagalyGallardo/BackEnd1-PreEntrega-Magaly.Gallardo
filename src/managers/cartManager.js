import {promises as fs} from 'fs';
import {v4 as uuidv4} from 'uuid';
    class CartManager {
    
        constructor(path){
            this.path = path;
            this.carts = [];
        }
    
        addCart = async () =>{
            const id = uuidv4();
            let newCart ={id, products: []};
            this.carts=await this.getCarts();
            this.carts.push(newCart);
            this.saveCarts();
            return newCart;
        }
        getCartById = async (cid) => {
            try{
                this.carts=await this.getCarts();
                const cartFound = this.carts.find (element => element.id === cid);
                if(!cartFound){
                    console.log("Producto No Encontrado");
                }else{
                    return cartFound
                }
            }catch(error){
                console.log("Error al cargar los carritos", error);    
            }
        }
        addProductsToCart = async(cid,pid,quantity=1) => {
            
            const cart = await this.getCartById(cid);
            const existProduct = cart.products.find(element => element.product === pid)
    
            if(existProduct){
                existProduct.quantity += quantity
            } else{
                cart.products.push({product: pid, quantity})
            }
    
            await this.saveCarts();
            return cart;
    
        }
        async getCarts(){
            try{
                const response = await fs.readFile(this.path, 'utf-8');
                const responseJSON = JSON.parse(response);
                return responseJSON;
            }catch(error){
                console.log("Error al cargar los carritos", error);    
            }
        }
    
        async saveCarts(){
            await fs.writeFile(this.path, JSON.stringify(this.carts,null,2))
        }
    
    }
    
    export {CartManager}
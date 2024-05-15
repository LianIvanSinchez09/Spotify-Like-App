export default class Producto {
    constructor(title, precio, categoria){
        this.title = title;
        this.precio = precio;
        this.categoria = categoria;
    }
}
export function printTitle(prod){
    console.log(`Titulo de producto: ${prod.title}`);
}

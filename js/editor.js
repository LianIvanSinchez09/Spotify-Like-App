import Producto from "./Clases/Producto.js";
import { productos } from "./users.js";


let templateProductos = document.getElementById("productos")
let seccionPublicar = document.getElementById("publicar")

let producto1 = new Producto("Zapatillas", 1200, "Ropa")
let producto2 = new Producto("Camisa", 1700, "Ropa")
let producto3 = new Producto("Collar con joyas", 2900, "Accesorios")

// export let productArray = [
//     producto1, producto2, producto3
// ];

function displayTemplateArray(arr){
    arr.map(producto => {
        let cloneProductoSeccion =  templateProductos.content.cloneNode(true).children[0];
        let header = producto.title;
        let categoria = producto.categoria;
        let precio = producto.precio;
        cloneProductoSeccion.children[0].textContent = header;
        cloneProductoSeccion.children[1].textContent = categoria;
        cloneProductoSeccion.children[2].textContent = precio;
        seccionPublicar.appendChild(cloneProductoSeccion);
    });
}

displayTemplateArray(productos)





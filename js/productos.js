class Producto {
  constructor(title, id, precio, categoria, elementoHTML){
      this.title = title;
      this.id = id;
      this.precio = precio;
      this.categoria = categoria;
      this.elementoHTML = elementoHTML
  }
}

let carrito = [];

//TODO_ editor para que el producto pueda publicar productos
let productos = [
  new Producto("Notebook Asus X515EA Core i3 1115G4 8Gb Ssd 256Gb 15.6", null, 5000, "Producto", null),
  new Producto("Notebook Asus X515EA Core i3 1115G4 8Gb Ssd 256Gb 15.6", null, 5000, "Producto", null),
]; 

/**
 * añade un elemento al carrito y lo muestra en el html
 * @param int id 
 */
function aniadirAlCarrito(id){
  let counter = 0;
  let encontrado = false;
  while (counter < productos.length && !encontrado) {
    if (productos[counter].id == id) {
      carrito.push(productos[counter]);
      const card = document.createElement("div");
      card.innerHTML = `
      <div>
      ${productos[counter].title}
      </div>
      `
      document.getElementById("carritoproducto").appendChild(card);
      encontrado = true;
      // console.log(productos[counter].id)
    }
    counter++;
  }
}

function oscurecerScreen(){
    const bodyProductos = document.getElementById("modalHide");
    bodyProductos.classList.add("modalHide")
  }

//productData: seccion de productos en el HTML
//template: plantilla para clonar una tarjeta de productos
//i: incremento (usado para asignar ids una vez incrementado)

const productData = document.querySelector("[product-data]")
const template = document.getElementById("productoTemplate");
let i = 0;

productos.map(producto => {
  i++;
  producto.id = i;
  const clone = template.content.cloneNode(true).children[0];
  const div = document.createElement("div");
  producto.elementoHTML = clone;
  div.innerHTML = `
  <button type="button" onclick="aniadirAlCarrito('${producto.id}')">Añadir al carrito</button>
  `
  producto.elementoHTML.querySelector("[data-title]").innerHTML = producto.title
  producto.elementoHTML.querySelector("[data-stock]").innerHTML = producto.precio
  clone.appendChild(div);
  productData.appendChild(clone)
})

const btnInput = document.getElementById("data-button");
const inputData = document.getElementById("data-search");

btnInput.addEventListener("click", () => {
  const dataSearch = document.getElementById("data-search");
  productos.forEach(producto => {
    const match = producto.title.toLowerCase().includes(dataSearch.value.toLowerCase());
    if(!match){
      producto.elementoHTML.classList.add("hide");
      console.log("success")
    }else{
      producto.elementoHTML.classList.remove("hide");
      console.log("fail")
    }
  })
})
inputData.addEventListener("keypress", (e) => {
  if(e.key === "Enter") {
    const dataSearch = document.getElementById("data-search");
    productos.forEach(producto => {
      const match = producto.title.toLowerCase().includes(dataSearch.value.toLowerCase());
      if(!match){
        producto.elementoHTML.classList.add("hide");
        console.log("success")
      }else{
        producto.elementoHTML.classList.remove("hide");
        console.log("fail")
      }
    })
  }
});

const buttonBackground = document.getElementById("changebg");

buttonBackground.addEventListener("click", () => {
})

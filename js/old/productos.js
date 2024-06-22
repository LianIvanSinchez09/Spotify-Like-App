class Producto {
  constructor(title, id, precio, categoria, elementoHTML, img){
      this.title = title;
      this.img = img;
      this.id = id;
      this.precio = precio;
      this.categoria = categoria;
      this.elementoHTML = elementoHTML
  }
}

let carrito = [];

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
      document.getElementById("carritoUser").appendChild(card);
      encontrado = true;
    }
    counter++;
  }
}

function subirProducto(producto){
  productos.push(producto);
  showProducts()
}

function modalBtnUpload(){
  let nombre = document.getElementById("nombre-product").value;
  let precio = document.getElementById("precio-product").value;
  let img = document.getElementById("img-product").value;
  let categoria = document.getElementById("categoria-product").value;
  let productoNuevo = new Producto(nombre, null, precio, categoria, null, img);
  subirProducto(productoNuevo);
}


//productData: seccion de productos en el HTML
//template: plantilla para clonar una tarjeta de productos
//i: incremento (usado para asignar ids una vez incrementado)

const productData = document.querySelector("[product-data]")
const template = document.getElementById("productoTemplate");
let i = 0;

function showProducts(){
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
}

const btnInput = document.getElementById("data-button");
const inputData = document.getElementById("data-search");

btnInput.addEventListener("click", () => {
  const dataSearch = document.getElementById("data-search");
  productos.forEach(producto => {
    const match = producto.title.toLowerCase().includes(dataSearch.value.toLowerCase());
    if(!match){
      producto.elementoHTML.classList.add("hide");
    }else{
      producto.elementoHTML.classList.remove("hide");
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
      }else{
        producto.elementoHTML.classList.remove("hide");
      }
    })
  }
});

const openModalEvent = document.getElementById("modalbtn-open");
const closeModalEvent = document.getElementById("modalbtn-close");
const visibilityManager = document.getElementById("manageVisibility");

function openModal(){
    visibilityManager.classList.add("hide")
    openModalEvent.classList.add("hide")
    const modal = document.getElementById("modal");
    modal.classList.remove("modalHide")
}

function closeModal(){
    openModalEvent.classList.remove("hide")
    visibilityManager.classList.remove("hide")
    const modal = document.getElementById("modal");
    modal.classList.add("modalHide")
}

showProducts()
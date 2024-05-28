const template = document.getElementById("productoTemplate");
//muestro a los productos (TODO: clientes por ahora, despues los reemplazo) en el HTML y los pusheo
//al array de productos 
let i = 0;
let productos = []; 

fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json())
.then(users => {
  users.map(user => {
    i++;
    const clone = template.content.cloneNode(true).children[0]; //clono el template y entramos en el html
    let userObj = { name: user.name, id: i, email: user.email, element: clone }; 
    productos.push(userObj);
    const div = document.createElement("div");
    div.innerHTML = `
    <button type="button" onclick="aniadirAlCarrito('${userObj.id}')">Añadir al carrito</button>
    `
    userObj.element.querySelector("[data-title]").innerHTML = userObj.name; //cargo el nombre
    userObj.element.querySelector("[data-stock]").innerHTML = userObj.email; //cargo el stock
    clone.appendChild(div);
    document.querySelector("[product-data]").appendChild(clone);
  })
})

let carrito = [];


function aniadirAlCarrito(id){
  let counter = 0;
  let encontrado = false;
  while (counter < productos.length && !encontrado) {
    if (productos[counter].id == id) {
      carrito.push(productos[counter]);
      const card = document.createElement("div");
      card.innerHTML = `
        <div>
          ${productos[counter].name}
        </div>
      `
      document.getElementById("carritoUser").appendChild(card);
      encontrado = true;
      console.log(carrito)
    }
    counter++;
  }
}


const btnInput = document.getElementById("data-button");

btnInput.addEventListener("click", () => {
  const userInput = document.getElementById("data-search").value.toLowerCase();
  productos.forEach(user => {
            const isVisible = user.name.toLowerCase().includes(userInput.toLowerCase());
            if(!isVisible){
        user.element.classList.add("hide");
        // console.log(user)
      }else{
        user.element.classList.remove("hide");
      }
    })
})
btnInput.addEventListener("keypress", function(e) {
  if(e.key === "Enter") {
    const userInput = e.target.value.toLowerCase();
    productos.forEach(user => {
      const isVisible = user.name.toLowerCase().includes(userInput.toLowerCase());
      if(!isVisible){
        user.element.classList.add("hide");
        // console.log(user)
      }else{
        user.element.classList.remove("hide");
      }
    })
  }
});


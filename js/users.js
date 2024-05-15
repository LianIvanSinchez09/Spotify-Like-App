const template = document.getElementById("productoTemplate");
const btnInput = document.getElementById("data-button");
export let productos = []; 

//muestro a los productos (TODO: clientes por ahora, despues los reemplazo) en el HTML y los pusheo
//al array de productos 

fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => {
          users.map(user => {
            const clone = template.content.cloneNode(true).children[0]; //clono el template y entramos en el html
            let userObj = { name: user.name, phone: user.phone, email: user.email, element: clone }; 
            productos.push(userObj);
            // console.log(userObj.element)
            userObj.element.querySelector("[data-title]").textContent = userObj.name; //cargo el nombre
            userObj.element.querySelector("[data-price]").textContent = userObj.phone; //cargo el precio
            userObj.element.querySelector("[data-stock]").textContent = userObj.email; //cargo el stock
            document.querySelector("[product-data]").appendChild(clone);
        })
      })        

btnInput.addEventListener("click", () => {
    const userInput = document.getElementById("data-search").value.toLowerCase();
    console.log(userInput)
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
    console.log(userInput)
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










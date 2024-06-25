let categorias = JSON.parse(localStorage.getItem("categorias"));
let checkBoxArea = document.getElementById("generos-musicales")
let showcaseAndProfileInfo = document.getElementById("showcaseAndProfileInfo");

/**
 * Crea inputs de tipo checkbox con la categoria en el array
 * @param {*} array categorias
 */
function createCheckboxes(categorias){
    categorias.forEach(categoria => {
        let checkBoxCategoria = document.createElement("input");
        let label = document.createElement("label");
        label.innerHTML = categoria
        checkBoxCategoria.type = "checkbox";  
        checkBoxArea.appendChild(label)
        checkBoxArea.appendChild(checkBoxCategoria)
    });
}

function updateProfileShowcase(objeto){
    // let nombreUser = document.getElementById("nombreUser");
    // let apellidoUser = document.getElementById("apellidoUser");
    // let emailUser = document.getElementById()
    console.log(objeto);
}


createCheckboxes(categorias)
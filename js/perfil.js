let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
let checkBoxArea = document.getElementById("generos-musicales")
let showcaseAndProfileInfo = document.getElementById("showcaseAndProfileInfo");

/**
 * crea inputs de tipo checkbox con la categoria en el array
 * @param {*} array categorias
 */
function createCheckboxes(categorias){
    if(categorias.length == 0){
        let aviso = document.createElement("p");
        aviso.innerHTML = "No hay categorias (no hay albums)";
        checkBoxArea.appendChild(aviso)
    }else{
        categorias.forEach(categoria => {
            let checkBoxCategoria = document.createElement("input");
            let label = document.createElement("label");
            label.innerHTML = categoria
            checkBoxCategoria.type = "checkbox";  
            checkBoxArea.appendChild(label)
            checkBoxArea.appendChild(checkBoxCategoria)
        });
    }
}

function updateProfileShowcase(objeto){
    let elementoACambiar = document.getElementById(objeto); 
    switch (elementoACambiar.id) {
        case "nombre":
            if(elementoACambiar.value){
                document.getElementById("nombreUser").innerHTML = elementoACambiar.value
            }else{
                 document.getElementById("nombreUser").innerHTML = "Tu Nombre"
            }
        break;
        case "apellido":
            if(elementoACambiar.value != "" && elementoACambiar.value != null){
                document.getElementById("apellidoUser").innerHTML = elementoACambiar.value
            }else{
                document.getElementById("apellidoUser").innerHTML = "Tu Apellido"
           }
        break;
        case "dni":
            if(elementoACambiar.value != "" && elementoACambiar.value != null){
                document.getElementById("dniUser").innerHTML = elementoACambiar.value
            }else{
                document.getElementById("dniUser").innerHTML = "Tu DNI"
            }
        break;
        case "email":
            if(elementoACambiar.value != "" && elementoACambiar.value != null){
                document.getElementById("emailUser").innerHTML = elementoACambiar.value
            }else{
                document.getElementById("emailUser").innerHTML = "Tu E-mail"
            }
        break;
        case "fotoperfil":
            let imgSection = document.getElementById("perfil-pic-manager");
            imgSection.classList.add("perfil-pic")
            let urlImg = URL.createObjectURL(elementoACambiar.files[0]);
            localStorage.setItem("urlImg", urlImg);
            let divButton = document.createElement("div");
            let imgElement = document.createElement("img");
            imgElement.src = localStorage.getItem("urlImg")
            let buttonImgReset = document.createElement("button");
            buttonImgReset.innerHTML = "Borrar Foto de Perfil"
            divButton.id = "fotoPerfil-Reset";
            imgSection.appendChild(imgElement)
            imgSection.appendChild(buttonImgReset)
            buttonImgReset.onclick = () => {
                imgSection.childNodes.forEach(element => {
                    if(element.tagName === "BUTTON"){
                        element.parentNode.innerHTML = "";
                    }
                });
            }
            elementoACambiar.value = null
            break;
        default:
            break;
    }
}


createCheckboxes(categorias)
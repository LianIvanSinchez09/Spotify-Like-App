// let imgSection = document.getElementById("perfil-pic-manager");
// imgSection.classList.add("perfil-pic")
// let urlImg = URL.createObjectURL(formElement.files[0]);
// localStorage.setItem("urlImg", urlImg);
// let anchorButton = document.createElement("a");
// let imgElement = document.createElement("img");
// imgElement.src = localStorage.getItem("urlImg")
// anchorButton.onclick = () => {
//     imgSection.childNodes.forEach(element => {
//         if(element.tagName === "A"){
//             element.parentNode.innerHTML = "";
//             imgSection.classList.remove("perfil-pic")
//             formElement.disabled = false
//         }
//     });
// }
// anchorButton.appendChild(imgElement)
// imgSection.appendChild(anchorButton)
// formElement.value = null
// formElement.disabled = true


let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
let checkBoxArea = document.getElementById("generos-musicales")
let showcaseAndProfileInfo = document.getElementById("showcaseAndProfileInfo");
let userProfile = document.getElementById("user-profile");
userProfile.style.display = "none" 

function verificarEmail(input){
    let gmailVerif = "@gmail.com"
    let hotmailVerif = "@hotmail.com";
    let esvalido = input.value.includes(gmailVerif) || input.value.includes(hotmailVerif);
    if(!esvalido){
        input.style.border = "2px solid red";
    }else{
        input.style.border = "1px solid black";
    }
    return esvalido
}


function validarInputString(input){
    let validCharacters = "abcdefghijklmnopqrstuvwxyz";
    let esvalido = true;
    let index = 0;
    if(input.value == ""){
        esvalido = false;
    }else{
        while (index < input.value.length && esvalido) {
            if(!(validCharacters.includes(input.value.toLowerCase()[index]))){
                esvalido = false;
                console.log("false");
            }
            index++;
        }
    }
    if(!esvalido){
        input.style.border = "2px solid red";
    }else{
        input.style.border = "1px solid black";
    }
    return esvalido;
}

function validarInputInt(input){
    let validCharacters = "1234567890";
    let index = 0;
    let esvalido = true;
    if(input.value == ""){
        esvalido = false;
    }else{
        while (index < input.value.length && esvalido) {
            if(!(validCharacters.includes(input.value[index]))){
                esvalido = false;
            }
            index++;
        }
    }
    if(!esvalido){
        input.style.border = "2px solid red";
    }else{
        input.style.border = "1px solid black";
    }
    return esvalido;
}


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

function crearPerfil(){
    let form = document.getElementById("form-profile");
    //info esencial
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let dni = document.getElementById("dni");
    let email = document.getElementById("email");
    //manipulacion de fecha de nacimiento
    let dia = parseInt(document.getElementById("dia").value);
    let mes = parseInt(document.getElementById("mes").value);
    let anio = parseInt(document.getElementById("anio").value);
    let fechaActual = new Date();
    let anioActual = fechaActual.getFullYear();
    let inputDate = document.getElementById("input-date");
    let anioBisiesto = (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
    let fechaInvalidaGenerica = dia <= 0 || mes <= 0 || anio <= 0 || dia > 31 || mes > 12 || anio > anioActual;
    let fechaInvalidaFebrero = (mes === 2 && (anioBisiesto && dia > 29) || (!anioBisiesto && dia > 28));
    let fechaInvalidaAbrilANoviembre = [4, 6, 9, 11].includes(mes) && dia > 30;
    let fechaValida = !fechaInvalidaGenerica && !fechaInvalidaFebrero && !fechaInvalidaAbrilANoviembre;
    //foto de perfil
    let fotoPerfil = document.getElementById("fotoperfil");
    let urlImg = null;
    //puntos
    let formPoints = 0;
    //datos opcionales
    let descripcion = document.getElementById("desc")
    let generosLike = document.getElementById("generos-musicales");
    //valores
    let formValues = [fotoPerfil, nombre, apellido, dni, email, descripcion, inputDate];
    formValues.forEach(formElement => {
        switch (formElement.id) {
            case "nombre":
                let verifNombre = validarInputString(formElement);
                if(verifNombre){
                    formPoints++;
                }
            break;
            case "apellido":
                let verifApellido = validarInputString(formElement);
                if(verifApellido){
                    formPoints++;
                }
            break;
            case "dni":
                let verifDNI = validarInputInt(formElement);
                if(verifDNI){
                    formPoints++;
                }
            break;
            case "email":
                let verifEmail = verificarEmail(formElement)
                if(verifEmail){
                    formPoints++;
                }
            break;
            case "fotoperfil":
                if (fotoPerfil.files.length > 0) {
                    urlImg = URL.createObjectURL(fotoPerfil.files[0])
                    localStorage.setItem("urlImg", urlImg);
                    formPoints++;
                    formElement.style.border = "none";
                } else {
                    formElement.style.border = "2px solid red";
                }
            break;
            case "input-date":
                if(fechaValida){
                    formElement.style.border = "none";
                    formPoints++;
                }else{
                    formElement.style.border = "2px solid red";
                }
                default:
            break;
        }
    });
    if(formPoints == 6){
        form.style.display = "none"
        userProfile.innerHTML = `
                <div class="info-container">
                    <h3>Nombre</h3>
                    <p id="nombreUser">${nombre.value}</p>
                    <h3>Apellido</h3>
                    <p id="apellidoUser">${apellido.value}</p>
                    <h3>DNI</h3>
                    <p id="dniUser">${dni.value}</p>
                    <h3>Fecha de Nacimiento</h3>
                    <p>${dia} - ${mes} - ${anio}</p>
                    <h3>E-mail</h3>
                    <p id="emailUser">${email.value}l</p>
                    <h3>Generos Musicales que me gustan</h3>
                    <p id="generosMusicaleslUser"></p>
                    <h3>Descripcion</h3>
                    <p id="desc">${descripcion.value}</p>
                    <div id="perfil-pic-manager">
                        <img src=${urlImg} alt="fotoUsuario">
                    </div>     
                </div>
        `
        userProfile.style.display = "flex"
    }
}


createCheckboxes(categorias)
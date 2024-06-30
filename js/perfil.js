
let infoPerfil = JSON.parse(localStorage.getItem("infoPerfil")) || [];
let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
let showcaseAndProfileInfo = document.getElementById("showcaseAndProfileInfo");
let userProfileHTML = document.getElementById("user-profile");
let userObjeto = JSON.parse(localStorage.getItem("user")) || null
userProfileHTML.style.display = "none" 

function cambiarInformacion(objeto, categorias){
    let userObjetoConvert = JSON.parse(objeto);
    let fechaConvert = new Date(userObjetoConvert.fechaNac);
    let form = document.getElementById("form-profile");
    form.style.display = "flex";
    form.innerHTML = `
            <label for="image">Foto de perfil</label>
            <input id="fotoperfil" type="file" id="image" accept="image">
            <label for="">Nombre(s)</label>
            <input value=${userObjetoConvert.nombre} id="nombre" type="text">
            <label for="">Apellido(s)</label>
            <input value=${userObjetoConvert.apellido} id="apellido" type="text">
            <label for="">DNI</label>
            <input value=${userObjetoConvert.dni} id="dni" type="text" name="" id="">
            <label for="">E-mail</label>
            <input value=${userObjetoConvert.email} id="email" type="email">
            <div id="input-date">
                <label for="">Dia</label>
                <input value=${fechaConvert.getDate()} id="dia" type="text">
                <label for="">Mes</label>
                <input value=${fechaConvert.getMonth()} id="mes" type="text">
                <label for="">Año</label>
                <input value=${fechaConvert.getFullYear()} id="anio" type="text">
            </div>
            <label for="">Generos musicales que me gustan</label>
            <div id="generos-musicales">

            </div>
            <label for="">Mi descripcion</label>
            <textarea id="desc" name="" placeholder="Hola soy Lian, tengo 22 años me gusta..."></textarea>
            <a onclick="crearPerfil()">Realizar cambios</a>
    `
    crearCheckboxes(categorias)
    userProfileHTML.style.display = "none";
}


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

let localStorageLikes = JSON.parse(localStorage.getItem("likesGeneroMusical")) || [];
let generosMusicaUsuario = [];

/**
 * crea inputs de tipo checkbox con la categoria en el array
 * @param {*} array categorias
 */
function crearCheckboxes(categorias){
    let checkBoxArea = document.getElementById("generos-musicales")
    if(categorias.length == 0){
        let aviso = document.createElement("p");
        aviso.innerHTML = "No hay categorias (no hay albums)";
        checkBoxArea.appendChild(aviso)
    }else{
        for (let index = 0; index < categorias.length; index++) {
            let checkBoxCategoria = document.createElement("input");
            let label = document.createElement("label");
            let generoCopia = categorias[index];
            label.innerHTML = categorias[index]
            checkBoxCategoria.type = "checkbox";  
            checkBoxCategoria.onclick = () => {
                if(!generosMusicaUsuario.includes(categorias[index])){
                    generosMusicaUsuario.push(categorias[index]);
                }else{
                    generosMusicaUsuario = generosMusicaUsuario.filter(genero => genero !== generoCopia )
                }
            }
            checkBoxArea.appendChild(label)
            checkBoxArea.appendChild(checkBoxCategoria)
        }
    }
}

function crearPerfil(){
    let form = document.getElementById("form-profile");
    //info esencial
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let dni = document.getElementById("dni");
    let email = document.getElementById("email");
    let desc = document.getElementById("desc");
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
                if(fechaValida && dia && mes && anio){
                    inputDate.childNodes.forEach(element => {
                        if(element.tagName === "INPUT"){
                            element.style.border = "none";
                        }
                    });
                    formPoints++;
                }else{
                    inputDate.childNodes.forEach(element => {
                        if(element.tagName === "INPUT"){
                            element.style.border = "2px solid red";
                        }
                    });
                }
                default:
            break;
        }
    });
    if(formPoints == 6){
        let musicaLikeHTML = "";
        let userObjeto = { //crear objeto en localstorage al principio del codigo
            nombre: nombre.value,
            apellido: apellido.value,
            dni: dni.value,
            fechaNac: new Date(anio, mes - 1, dia),
            imagenPerfil: urlImg,
            email: email.value,
            desc: descripcion.value,
            musicaLike: null
        }
        console.log(userObjeto);
        if(!descripcion.value){
            userObjeto.desc = "Descripcion no proveida";
        }
        // console.log(generosMusicaUsuario.length);
        for (let index = 0; index < generosMusicaUsuario.length; index++) {
            console.log(index);
            if(index != 0){
                musicaLikeHTML += ", " + generosMusicaUsuario[index];
            }else{
                musicaLikeHTML += generosMusicaUsuario[index];
            }
        }
        userObjeto.musicaLike = musicaLikeHTML;
        form.style.display = "none"
        userProfileHTML.innerHTML = `
                <div class="info-container">
                    <div class="essential-info">
                        <h3>Nombre</h3>
                        <p id="nombreUser">${userObjeto.nombre}</p>
                        <h3>Apellido</h3>
                        <p id="apellidoUser">${userObjeto.apellido}</p>
                        <h3>DNI</h3>
                        <p id="dniUser">${userObjeto.dni}</p>
                        <h3>Fecha de Nacimiento</h3>
                        <h3>E-mail</h3>
                        <p id="emailUser">${userObjeto.email}l</p>
                        <h3>Generos Musicales que me gustan</h3>
                        <p id="generosMusicaleslUser">
                            ${musicaLikeHTML}
                        </p>
                        <h3>Descripcion</h3>
                        <p id="desc">${userObjeto.desc}</p>
                    </div>
                    <a class="perfil-pic" id="perfil-pic-manager">
                        <img src=${urlImg} alt="fotoUsuario">
                    </a>  
                </div>
        `
        userProfileHTML.style.display = "flex"
        localStorage.setItem("user", JSON.stringify(userObjeto));
    }
    
}

function cargarPerfil(){
    let form = document.getElementById("form-profile");
    if(userObjeto){
        form.style.display = "none"
        userProfileHTML.innerHTML = `
        <div class="info-container">
            <div class="essential-info">
                <h3>Nombre</h3>
                <p id="nombreUser">${userObjeto.nombre}</p>
                <h3>Apellido</h3>
                <p id="apellidoUser">${userObjeto.apellido}</p>
                <h3>DNI</h3>
                <p id="dniUser">${userObjeto.dni}</p>
                <h3>E-mail</h3>
                <p id="emailUser">${userObjeto.email}l</p>
                <h3>Generos Musicales que me gustan</h3>
                <p id="generosMusicaleslUser">
                    ${userObjeto.musicaLike}
                </p>
                <h3>Descripcion</h3>
                <p id="desc">${userObjeto.desc}</p>
                <a onclick="cambiarInformacion(JSON.stringify(userObjeto), categorias)" class="cerrar-sesion">Cambiar Informacion</a>            
            </div>
            <a class="perfil-pic" id="perfil-pic-manager">
                <img src=${userObjeto.imagenPerfil} alt="fotoUsuario">
            </a>  
        </div>
`
        crearCheckboxes(categorias)
        userProfileHTML.style.display = "flex"
    }
}


crearCheckboxes(categorias)

document.addEventListener("DOMContentLoaded", cargarPerfil)
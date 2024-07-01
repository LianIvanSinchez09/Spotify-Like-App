class Song {
    constructor(song, title, author ,img){
        this.song = song;
        this.author = author;
        this.title = title;
        this.img = img;
    }

    get getSong() {
        return this.song;
    }

    get getAuthor() {
        return this.author;
    }

    set setAuthor(author){
        this.author = author
    }

    get getTitle() {
        return this.title;
    }   

    get getImg() {
        return this.img;
    }

    set setSong(song) {
        this.song = song;
    }

    set setTitle(title) {   
        this.title = title; 
    }

    set setImg(img) {
        this.img = img;
    }
}

//clase de albums
class Album {
    constructor(songs, title, author ,img, categoria){
        this.categoria = categoria;
        this.songs = songs;
        this.author = author;
        this.title = title;
        this.img = img;
    }

    get getCategoria() {
        return this.categoria;
    }
    set setCategoria(categoria){
        this.categoria = categoria;
    }

    get getSongs() {
        return this.songs;
    }

    set setSongs(songs) {
        this.songs = songs;
    }

    get getAuthor() {
        return this.author;
    }

    set setAuthor(author){
        this.author = author
    }

    get getTitle() {
        return this.title;
    }   

    get getImg() {
        return this.img;
    }
    set setTitle(title) {   
        this.title = title; 
    }

    set setImg(img) {
        this.img = img;
    }
}


let albums = [
    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "C418", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "C418", "../imgs/minecraft.jpg", "Game Soundtrack"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "C418", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "Lian", "../imgs/minecraft.jpg", "Game Soundtrack"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "C418", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "Luciana", "../imgs/minecraft.jpg", "Game Soundtrack"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "C418", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "C418", "../imgs/minecraft.jpg", "Game Soundtrack"),
]


let infoPerfil = JSON.parse(localStorage.getItem("infoPerfil")) || [];
let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
let showcaseAndProfileInfo = document.getElementById("showcaseAndProfileInfo");
let userProfileHTML = document.getElementById("user-profile");
let userObjeto = JSON.parse(localStorage.getItem("user")) || null
console.log(userObjeto);
userProfileHTML.style.display = "none" 

function cambiarInformacion(){
    generosMusicaUsuario = [];
    let userObjetoConvert = JSON.parse(localStorage.getItem("user"));
    console.log(userObjetoConvert);
    let form = document.getElementById("form-profile");
    form.style.display = "flex";
    form.innerHTML = `
            <label for="image">Foto de perfil</label>
            <select name="" id="select-foto">
                <option value="../imgs/avatarFem.jpg">Femenino</option>
                <option value="../imgs/avatarMas.png">Masculino</option>
            </select>
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
                <input id="dia" type="text">
                <label for="">Mes</label>
                <input id="mes" type="text">
                <label for="">Año</label>
                <input id="anio" type="text">
            </div>
            <label for="">Generos musicales que me gustan</label>
            <div id="generos-musicales">
            </div>
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
    let fotoPerfil = document.getElementById("select-foto");
    //puntos
    let formPoints = 0;
    //valores
    let formValues = [fotoPerfil, nombre, apellido, dni, email, inputDate];
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
            case "select-foto":
                if(fotoPerfil.value){
                    formPoints++;
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
        // console.log(generosMusicaUsuario.length);
        for (let index = 0; index < generosMusicaUsuario.length; index++) {
            console.log(index);
            if(index != 0){
                musicaLikeHTML += ", " + generosMusicaUsuario[index];
            }else{
                musicaLikeHTML += generosMusicaUsuario[index];
            }
        }
        let userObjeto = {
            nombre: nombre.value,
            apellido: apellido.value,
            dni: dni.value,
            fechaNac: new Date(anio, mes - 1, dia),
            imagenPerfil: fotoPerfil.value,
            email: email.value,
            musicaLike: musicaLikeHTML
        }
        localStorage.setItem("user", JSON.stringify(userObjeto));
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
                            ${musicaLikeHTML}
                        </p>
                        <a onclick="cambiarInformacion()" class="cerrar-sesion">Cambiar Informacion</a>
                    </div>
                    <a class="perfil-pic" id="perfil-pic-manager">
                        <img src=${fotoPerfil.value} alt="fotoUsuario">
                    </a>  
                </div>
        `
        userProfileHTML.style.display = "flex"
    }
    
}

function cargarPerfil(){
    let form = document.getElementById("form-profile");
    if(userObjeto){
        form.style.display = "none"
        userProfileHTML.innerHTML = 
        `
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
                    <a onclick="cambiarInformacion()" class="cerrar-sesion">Cambiar Informacion</a>            
                </div>
                <a class="perfil-pic" id="perfil-pic-manager">
                    <img src=${userObjeto.imagenPerfil} alt="fotoUsuario">
                </a>  
            </div>
        `
        userProfileHTML.style.display = "flex"
    }
}

function loadStylesLS(){
    let style = localStorage.getItem("style");
    document.body.style.background = style
}

function getLocalStorage(){
    let biblioteca = document.getElementById("biblioteca");
    let savedAlbumsHtml = localStorage.getItem('biblioteca');
    if(savedAlbumsHtml){
        biblioteca.innerHTML = savedAlbumsHtml;
        console.log(biblioteca.childNodes);
        for (let index = 0; index < biblioteca.childNodes.length; index++) {
            let btn = document.getElementById(`albumBiblioteca${index}`);
            console.log(btn);
            let modal = document.getElementById("myModal");
            let span = document.getElementsByClassName("close")[0];
            btn.onclick = function() {
                showModal(index);
                modal.style.display = "block";
            }
        
            span.onclick = function() {
                modal.style.display = "none";
            }
        
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    }
    console.log(savedAlbumsHtml);
}

function showModal(index) {
    let modalContent = document.getElementById("modal-content");
    let album = albums[index];
    let songSection = document.createElement("div");
    for (let i = 0; i < albums[index].getSongs.length; i++) {
        songSection.innerHTML += `
        <h3>${albums[index].getSongs[i].getTitle}</h3>
        <audio controls>
            <source src="${albums[index].getSongs[i].getSong.src}" type="audio/mpeg">
        </audio>
    ` 
    }
    modalContent.innerHTML = `
        <h3>${album.getTitle}</h3>
        <p>${album.getAuthor}</p>
    `
    modalContent.appendChild(songSection);
}

document.addEventListener("DOMContentLoaded", getLocalStorage);

crearCheckboxes(categorias)
document.addEventListener("DOMContentLoaded", loadStylesLS)
document.addEventListener("DOMContentLoaded", cargarPerfil)
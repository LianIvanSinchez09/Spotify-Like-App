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
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "Lian", "../imgs/minecraft.jpg", "Soundtrack"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "A lo pibe rafagazo", "C418", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "Lian", "../imgs/minecraft.jpg", "Cumbia"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "A lo pibe rafagazo", "C418", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "Lian", "../imgs/minecraft.jpg", "RnB"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "A lo pibe rafagazo", "C418", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "Lian", "../imgs/minecraft.jpg", "RnB"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "A lo pibe rafagazo", "C418", "../imgs/dryhands.jpg"), 
        new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
        new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "Lian", "../imgs/minecraft.jpg", "Rock")
]

//
let categorias = [];
let mainContentContainer = document.getElementById("category-main");

//carga los estilos elegidos por el usuario desde custom.js
function loadStylesLS(){
    let style = localStorage.getItem("style");
    document.body.style.background = style
}

/**
 * Elimina elementos de un array y devuelve un array nuevo con los datos que cumplen la condicion
 * @param {*} array 
 * @returns 
 */
function eliminarRepetidos(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        let elementoAChequear = array[i];
        if (!newArray.includes(elementoAChequear)) {
            newArray.push(elementoAChequear);
        }
    }
    return newArray;
}

/**
 * guarda una cancion likeada por el usuario
 * @param {*} url 
 * @param {*} title 
 * @param {*} author 
 * @param {*} img 
 */
function saveLikes(url, title, author, img) {
    // si no hay nada en el LS entonces se le asigna el valor de un array vacio
    let arrayLikes = JSON.parse(localStorage.getItem("likes")) || [];
    let likedObjSong = { url, title, author, img };
    let c = 0;
    let encontrado = false;
    //busco el elemento repetido
    while(c < arrayLikes.length && !encontrado){
        if(arrayLikes[c].title == likedObjSong.title){
            encontrado = true;
            console.log("true");
        }
        c++;
    }
    //si no hay ninguno repetido se guarda en el localstorage
    if(!encontrado){
        arrayLikes.push(likedObjSong);
        localStorage.setItem("likes", JSON.stringify(arrayLikes));
    }
}

/** Crea una card con una categoria musical segun los albums en albums[]
 * @returns void
 */
function createCategory(){
    //extraigo las categorias de los albums
    albums.forEach(album => {
        let albumCategory = album.getCategoria;
        categorias.push(albumCategory)
    });

    //les elimino las repetidas
    let categoriaFilter = eliminarRepetidos(categorias);
    saveCategorias(categoriaFilter);

    //les creo a cada una un div con su clase propia y lo anido en mainContentContainer
    categoriaFilter.forEach(categoria => {
        let div = document.createElement("div");
        div.classList.add("flex-category")
        let titleCategoria = document.createElement("h3");
        titleCategoria.innerHTML = categoria;
        div.appendChild(titleCategoria)
        mainContentContainer.appendChild(div)
    });

    //obtengo los hijos de mainContentContainer (los divs con titulo categoria)
    let categoryMainChild = mainContentContainer.childNodes
    let counter = 0;

    //por cada hijo de mainContentContainer, mientras sea un DIV 
    //y la categoria == categoria del album pasado en el foreach les creo una card con su respectivo genero musical
    for (let index = 0; index < categoryMainChild.length; index++) {
        if(categoryMainChild[index].tagName === "DIV"){
            albums.forEach(album => {
                if(categoryMainChild[index].childNodes[0].tagName === "H3"){
                    if(categoryMainChild[index].childNodes[0].innerHTML == album.getCategoria){
                        let card = document.createElement("div")
                            album.getSongs.forEach(song => {
                                card.innerHTML += `
                                <h4>${song.getTitle}</h4>
                                <p>${album.author}</p>
                                <audio controls>
                                <source src="${song.getSong.src}">
                                </audio>
                                <button onclick="saveLikes('${song.src}', '${song.getTitle}', '${album.getAuthor}', '${album.getImg}')">Añadir a tus me gusta</button>
                                `
                                counter++
                                categoryMainChild[index].appendChild(card)
                            });
                    }
    
                }
            });
        }
    }
}

function saveCategorias(categoriaArray){
    localStorage.setItem("categorias", JSON.stringify(categoriaArray));
}


createCategory()
loadStylesLS()

let arrayChecked = eliminarRepetidos(categorias)


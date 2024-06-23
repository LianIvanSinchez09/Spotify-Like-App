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

let mainContentContainer = document.getElementById("category-main");

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
]

let categorias = [];


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

function createCategory(){
    albums.forEach(album => {
        let albumCategory = album.getCategoria;
        categorias.push(albumCategory)
    });
    let categoriaFilter = eliminarRepetidos(categorias);
    categoriaFilter.forEach(categoria => {
        let div = document.createElement("div");
        div.classList.add("flex-category")
        let titleCategoria = document.createElement("h3");
        titleCategoria.innerHTML = categoria;
        div.appendChild(titleCategoria)
        mainContentContainer.appendChild(div)
    });

    let categoryMainChild = mainContentContainer.childNodes

    for (let index = 0; index < categoryMainChild.length; index++) {
        console.log(categoryMainChild[index].childNodes[0]);        
    }


    console.log(categoryMainChild);

    for (let index = 0; index < categoryMainChild.length; index++) {
        if(categoryMainChild[index].tagName === "DIV"){
            albums.forEach(album => {
                if(categoryMainChild[index].childNodes[0].tagName === "H3"){
                    if(categoryMainChild[index].childNodes[0].innerHTML == album.getCategoria){
                        album.getSongs.forEach(song => {
                                console.log(song.getSong.src);
                                let title = document.createElement("div")
                                console.log(song.getSong.src);
                                title.innerHTML = `
                                    <h4>${song.getTitle}</h4>
                                    <audio controls>
                                        <source src="${song.getSong.src}">
                                    </audio>
                                `
                                categoryMainChild[index].appendChild(title)
                            });
                    }
    
                }
            });
        }
    }
}

createCategory()

let arrayChecked = eliminarRepetidos(categorias)


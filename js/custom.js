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

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "Luciana", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "Luciana", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "Luciana", "../imgs/wethands.jpg")], "Minecraft", "Luciana", "../imgs/minecraft.jpg", "Rock"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "Lian", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "Lian", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "Lian", "../imgs/wethands.jpg")], "Minecraft", "Lian", "../imgs/minecraft.jpg", "Progressive Rock")
]

let userObjeto = JSON.parse(localStorage.getItem("user")) || null
let historial = JSON.parse(localStorage.getItem("historial")) || [];

function guardarHistorial(index, i){
    // console.log(albums[index].getSongs[i]);
    historial.push(albums[index].getSongs[i]);
    localStorage.setItem("historial", JSON.stringify(historial));
}

function check() {
    let optionDarkLight = document.querySelector('input[name="theme"]:checked')
    loadStylesLS()
    switch (optionDarkLight.value) {
        case 'light':
            document.getElementById("white").checked = true;
            localStorage.setItem("style", "white");
            loadStylesLS()
            break;
        case 'dark':
            document.getElementById("gray").checked = true;
            localStorage.setItem("style", "gray");
            loadStylesLS()
            break;
        default:
            break;
    }
}

function mostrarHistorial(){
    let seccionHistorial = document.getElementById("historial");
    historial.forEach(song => {
        let title = document.createElement("h4");
        let author = document.createElement("p");
        title.innerHTML = song.title
        author.innerHTML = song.author
        seccionHistorial.appendChild(title)
        seccionHistorial.appendChild(author)
    });
}

mostrarHistorial()

let userLikes = document.getElementById("user-likes");

function saveLikes(albumOrSong){
    let likes = [];
    likes.push(albumOrSong);
    localStorage.setItem("user_likes", JSON.stringify(albumOrSong));
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
        <button onclick="saveLikes(${albums[index].getSongs[i].getSong})">Añadir a la lista</button>
    ` 
    }
    modalContent.innerHTML = `
        <h3>${album.getTitle}</h3>
        <p>${album.getAuthor}</p>
    `
    modalContent.appendChild(songSection);
}

function getLocalStorage(){
    let biblioteca = document.getElementById("biblioteca");
    let savedAlbumsHtml = localStorage.getItem('biblioteca');
    if(savedAlbumsHtml){
        biblioteca.innerHTML = savedAlbumsHtml;
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
}

let preferencias = JSON.parse(localStorage.getItem("preferenciasMusica")) || [];

function crearGenerosMusica(){
    let generos = document.getElementById("genres");
    let categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    for (let index = 0; index < categorias.length; index++) {
        let label = document.createElement("label");
        let div = document.createElement("div");
        div.classList.add("inputCheckboxAjustes")
        label.innerHTML = categorias[index]; 
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = `${categorias[index]}`
        input.onclick = () => {
            let inputIdCopy = input.id;
            if(!preferencias.includes(input.id)){
                selectPreferencia(input.id);
            }else{
               preferencias = preferencias.filter(preferencia => preferencia !== inputIdCopy)
                localStorage.setItem("preferenciasMusica", JSON.stringify(preferencias));
            }
        } 
        input.value = categorias[index];
        div.appendChild(label)
        div.appendChild(input)
        generos.appendChild(div)
    }
}


function selectPreferencia(id){
    preferencias.push(id);
    localStorage.setItem("preferenciasMusica", JSON.stringify(preferencias));
}

function cleanLibrary(){
    localStorage.removeItem("biblioteca")
    biblioteca.innerHTML = "";
}


function loadStylesLS(){
    let style = localStorage.getItem("style");
    document.getElementById(style).checked = true
    document.body.style.background = style
    let preferenciasLS = JSON.parse(localStorage.getItem("preferenciasMusica")) || [];
    preferenciasLS.forEach(preferencia => {
        let input = document.getElementById(preferencia);
        input.checked = true;
    });
}

document.addEventListener("DOMContentLoaded", getLocalStorage);
document.addEventListener("DOMContentLoaded", loadStylesLS)
crearGenerosMusica()
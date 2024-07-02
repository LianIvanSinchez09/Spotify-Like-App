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
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "C418", "../imgs/covers/minecraft.jpg", "Game Soundtrack"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "Luciana", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "Luciana", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "Luciana", "../imgs/wethands.jpg")], "Minecraft", "Luciana", "../imgs/covers/minecraft.jpg", "Rock"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "Lian", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "Lian", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "Lian", "../imgs/wethands.jpg")], "Minecraft", "Lian", "../imgs/covers/minecraft.jpg", "Progressive Rock"),

    new Album([
        new Song(new Audio("../songs/wewillrockyou.mp3"), "We Will Rock You", "Queen", "../imgs/covers/queen-newsoftheworld.jpeg"),
        new Song(new Audio("../songs/wearechampions.mp3"), "We Are The Champions", "Queen", "../imgs/covers/queen-newsoftheworld.jpeg"), new Song(new Audio("../songs/sheerheartattack.mp3"), "Sheer Heart Attack", "Queen", "../imgs/covers/queen-newsoftheworld.jpeg")
    ], "News of the World", "Queen", "../imgs/covers/queen-newsoftheworld.jpeg", "Rock")
]

function addAlbum(index) {
    let biblioteca = document.getElementById("biblioteca");
    if(!biblioteca.innerHTML.includes(albums[index].getAuthor)){
        let bibliotecaEspacio = document.createElement("a");
        bibliotecaEspacio.id = `albumBiblioteca${index}`
        bibliotecaEspacio.innerHTML = `
            <h3>${albums[index].getTitle}</h3>
            <p>${albums[index].getAuthor}</p>
            <p>${albums[index].getCategoria}</p>
        `;
        // console.log(albums[index].getTitle);
        console.log(biblioteca);
        // console.log();
        biblioteca.appendChild(bibliotecaEspacio);
        let albumsHtml = biblioteca.innerHTML;
        localStorage.setItem('biblioteca', albumsHtml);
        let modal = document.getElementById("myModal");
        let span = document.getElementsByClassName("close")[0];
        let btn = document.getElementById(`albumBiblioteca${index}`);
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
        }
        c++;
    }
    //si no hay ninguno repetido se guarda en el localstorage
    if(!encontrado){
        arrayLikes.push(likedObjSong);
        localStorage.setItem("likes", JSON.stringify(arrayLikes));
    }
}

const btnInput = document.getElementById("data-button");
const songContainer = document.getElementById("content");
let counter = 0;

let currentPlaying = null; // vriable para almacenar la referencia del elemento de audio actualmente en reproduccion

albums.forEach((album, albumIndex) => {
    album.getSongs.forEach((cancion, songIndex) => {
        let songSpace = document.createElement("li");
        switch (localStorage.getItem("style")) {
            case "white":
                songSpace.classList.add("song-card");
                break;
            case "gray":
                songSpace.classList.add("song-card-alt");
                break;
            default:
                songSpace.classList.add("song-card");
                break;
        }
        songSpace.id = `songSpace${counter}`;
        songSpace.classList.add("song-Space");
        songSpace.innerHTML = `
            <a id="songLink${albumIndex}_${songIndex}">
                <img src="${album.getImg}" alt="Album Cover">
                <h3>${cancion.getTitle}</h3>
                <h3>${cancion.getAuthor}</h3>
                <div class="searched-element-button">
                    <button onclick="saveLikes('${cancion.getSong.src}', '${cancion.getTitle}', '${cancion.getAuthor}', '${album.getImg}')">Añadir a tus me gusta</button>
                    <button onclick="addAlbum(${albumIndex})">Añadir a tu biblioteca</button>
                </div>
            </a>
            <audio id="audio${albumIndex}_${songIndex}" src="${cancion.getSong.src}"></audio>
        `;
        songContainer.appendChild(songSpace);
        
        let songLink = document.getElementById(`songLink${albumIndex}_${songIndex}`);
        let audioElement = document.getElementById(`audio${albumIndex}_${songIndex}`);
        
        songLink.onclick = function() {
            if (currentPlaying && currentPlaying !== audioElement) {
                currentPlaying.pause();
                currentPlaying.currentTime = 0;
            }
            if (audioElement.paused) {
                audioElement.play();
                currentPlaying = audioElement;
            } else {
                audioElement.pause();
            }
        };
        
        counter++;
    });
});



btnInput.addEventListener("click", () => {
    const inputData = document.getElementById("buscador").value.toLowerCase();
    let counter2 = 0;

    albums.forEach(album => {
        album.getSongs.forEach(song => {
            const songIDHTML = document.getElementById(`songSpace${counter2}`);
            const match = song.getTitle.toLowerCase().includes(inputData);
            if (inputData) {
                if (!match) {
                    songIDHTML.classList.add("hide");
                } else {
                    songIDHTML.classList.remove("hide");
                }
            } else {
                songIDHTML.classList.remove("hide");
            }
            counter2++;
        });
    });
});

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


function cleanLibrary(){
    localStorage.removeItem("biblioteca")
    biblioteca.innerHTML = "";
}

function loadStylesLS(){
    let style = localStorage.getItem("style");
    if(style){
        document.body.style.background = style
    }else{
        document.body.style.background = "white"
    }
}
document.addEventListener("DOMContentLoaded", loadStylesLS);

document.addEventListener("DOMContentLoaded", getLocalStorage);
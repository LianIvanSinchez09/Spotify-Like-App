class Song {
    constructor(song, title, author ,img, albumName){
        this.albumName = albumName
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

    new Album([
        new Song(new Audio("../songs/wewillrockyou.mp3"), "We Will Rock You", "Queen", "../imgs/covers/queen-newsoftheworld.jpeg"),
        new Song(new Audio("../songs/wearechampions.mp3"), "We Are The Champions", "Queen", "../imgs/covers/queen-newsoftheworld.jpeg"), new Song(new Audio("../songs/sheerheartattack.mp3"), "Sheer Heart Attack", "Queen", "../imgs/covers/queen-newsoftheworld.jpeg")
    ], "News of the World", "Queen", "../imgs/covers/queen-newsoftheworld.jpeg", "Rock"),

    new Album([
        new Song(new Audio("../songs/Crossroads.mp3"), "Crossroads", "Christopher Larkin", "../imgs/crossroads.jpg"),
        new Song(new Audio("../songs/Dirtmouth.mp3"), "Dirtmouth", "Christopher Larkin", "../imgs/dirtmouth.jpg"),
        new Song(new Audio("../songs/Enter Hallownest.mp3"), "Enter Hallownest", "Christopher Larkin", "../imgs/enterhallownest.jpg")
    ], "Hollow Knight", "Christopher Larkin", "../imgs/covers/hollowknight.jpeg", "Game Soundtrack"),

    new Album([
        new Song(new Audio("../songs/Wonderwall.mp3"), "Wonderwall", "Oasis", "../imgs/wonderwall.jpg"),
        new Song(new Audio("../songs/Don't Look Back In Anger .mp3"), "Don't Look Back in Anger", "Oasis", "../imgs/dontlookbackinanger.jpg"),
        new Song(new Audio("../songs/Champagne Supernova.mp3"), "Champagne Supernova", "Oasis", "../imgs/champagnesupernova.jpg")
    ], "What's the Story Morning Glory?", "Oasis", "../imgs/covers/oasis.jpeg", "Britpop")
]



let likes = JSON.parse(localStorage.getItem("likes")) || [];

let historial = JSON.parse(localStorage.getItem("historial")) || [];

function guardarHistorial(index, i){
    if(historial){
        let songCopy = albums[index].getSongs[i];
        historial.push(songCopy);
        localStorage.setItem("historial", JSON.stringify(historial));
    }
}

let likesSpace = document.getElementById("user-likes");
let c = 0;

function cleanLibrary(){
    localStorage.removeItem("biblioteca")
    biblioteca.innerHTML = "";
}



function showLikes() {
    if (likes.length !== 0) {
        console.log(likes);
        let index = 0;
        while (index < likes.length) {
            if (likes[index] != null) {
                let objCopia = likes[index];
                let div = document.createElement("div");
                div.classList.add("song-card");
                let h3 = document.createElement("h3");
                h3.innerHTML = likes[index].title;
                let p = document.createElement("p");
                p.innerHTML = likes[index].author;
                let img = document.createElement("img");
                img.src = likes[index].img;
                img.alt = "Album Cover";
                let playPauseButton = document.createElement("button");
                playPauseButton.innerHTML = "Reproducir";

                let audio = null;

                // Buscar la canción en los álbumes
                let albumIndex = 0;
                let found = false;
                while (albumIndex < albums.length && !found) {
                    let songIndex = 0;
                    while (songIndex < albums[albumIndex].getSongs.length && !found) {
                        if (albums[albumIndex].getSongs[songIndex].title === likes[index].title) {
                            audio = albums[albumIndex].getSongs[songIndex].getSong;
                            found = true;
                        }
                        songIndex++;
                    }
                    albumIndex++;
                }

                playPauseButton.onclick = () => {
                    if (audio.paused) {
                        audio.play();
                        playPauseButton.innerHTML = "Pausar";
                    } else {
                        audio.pause();
                        playPauseButton.innerHTML = "Reproducir";
                    }
                };

                let buttonDislike = document.createElement("button");
                buttonDislike.innerHTML = "Borrar Me Gusta";
                
                buttonDislike.onclick = () => {
                    audio.pause();
                    likes = likes.filter(item => item !== objCopia);
                    div.classList.remove("song-card");
                    console.log(likes);
                    div.innerHTML = "";
                    localStorage.setItem("likes", JSON.stringify(likes));
                    detectNoLikes();
                };
                                
                div.appendChild(img);
                div.appendChild(h3);
                div.appendChild(p);
                div.appendChild(playPauseButton);
                div.appendChild(buttonDislike);
                likesSpace.appendChild(div);
            }
            index++;
        }
    }
}





function detectNoLikes(){
    if(likes.length != 0){
        document.addEventListener("DOMContentLoaded", showLikes)
    }else{
        let anuncioNoLikes = document.createElement("h1");
        anuncioNoLikes.innerHTML = "No tienes canciones con Me Gusta";
        likesSpace.appendChild(anuncioNoLikes)
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

document.addEventListener("DOMContentLoaded", loadStylesLS)
document.addEventListener("DOMContentLoaded", detectNoLikes)
document.addEventListener("DOMContentLoaded", showLikes);
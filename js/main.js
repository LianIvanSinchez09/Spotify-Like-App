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

let lugarDeAlbumes = document.getElementById("albumes-populares");


let albums = [
    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "C418", "../imgs/dryhands.jpg"), 
    new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
    new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "C418", "../imgs/minecraft.jpg", "Game Soundtrack"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "C418", "../imgs/dryhands.jpg"), 
        new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
        new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "C418", "../imgs/minecraft.jpg", "Game Soundtrack"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "C418", "../imgs/dryhands.jpg"), 
        new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
        new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "C418", "../imgs/minecraft.jpg", "Game Soundtrack"),

    new Album([new Song(new Audio("../songs/dryhands.mp3"), "Dry Hands", "C418", "../imgs/dryhands.jpg"), 
        new Song(new Audio("../songs/haggstrom.mp3"), "Haggstrom", "C418", "../imgs/haggstrom.jpg"), 
        new Song(new Audio("../songs/wethands.mp3"), "Wet Hands", "C418", "../imgs/wethands.jpg")], "Minecraft", "C418", "../imgs/minecraft.jpg", "Game Soundtrack"),
            
]

function search() {
    let dataSearch = document.getElementById("data-search");
    albums.forEach(album => {
        const match = album.title.toLowerCase().includes(dataSearch.value.toLowerCase());
        if(!match){
            album.elementoHTML.classList.add("hide");
        }else{
            album.elementoHTML.classList.remove("hide");
        }
    })
}



function showAlbum() {
    for (let index = 0; index < albums.length; index++) {
        let albumSpace = document.createElement("div");
        albumSpace.id = `album${index}`
        albumSpace.innerHTML = `
        <button id="button${index}" onclick="showModal(${index})" type="button">
            <img src="${albums[index].getImg}" alt="Album Cover">
        </button>
        <h3>${albums[index].getTitle}</h3>
        <p>${albums[index].getAuthor}</p>
        <p>${albums[index].getCategoria}</p>
          `;
          console.log(albums[index].getCategoria);
        lugarDeAlbumes.appendChild(albumSpace);
        let modal = document.getElementById("myModal");
        let span = document.getElementsByClassName("close")[0];
        let btn = document.getElementById("button"+index);
          // Cuando se hace clic en el botón, abre el modal
          btn.onclick = function() {
              showModal(index);
              modal.style.display = "block";
          }
      
          // Cuando se hace clic en <span> (x), cierra el modal
          span.onclick = function() {
              modal.style.display = "none";
          }
      
          // Cuando se hace clic en cualquier parte fuera del modal, cierra el modal
          window.onclick = function(event) {
              if (event.target == modal) {
                  modal.style.display = "none";
              }
          }
    }
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



showAlbum();

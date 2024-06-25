let likes = JSON.parse(localStorage.getItem("likes")) || [];


console.log(likes);
let likesSpace = document.getElementById("user-likes");
let c = 0;

function showLikes() {
    if (likes.length !== 0) {
        likes.forEach(likedElement => {
            if (likedElement != null) {
                let objCopia = likedElement;
                let div = document.createElement("div");
                let h3 = document.createElement("h3");
                let p = document.createElement("p");
                let buttonDislike = document.createElement("button");
                buttonDislike.innerHTML = "Borrar Me Gusta";
                let img = document.createElement("img");
                img.src = likedElement.img;
                h3.innerHTML = likedElement.title;
                p.innerHTML = likedElement.author;
                div.appendChild(buttonDislike);
                div.appendChild(h3);
                div.appendChild(p);
                div.appendChild(img);
                likesSpace.appendChild(div);

                buttonDislike.onclick = () => {
                    likes = likes.filter(item => item !== objCopia);
                    console.log(likes);
                    div.innerHTML = "";
                    localStorage.setItem("likes", JSON.stringify(likes));
                    detectNoLikes()
                };
            }
            c++;
        });
    }
}

document.addEventListener("DOMContentLoaded", showLikes);


function elementosSimilares(elemento){
    return elemento != likes[i];
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

document.addEventListener("DOMContentLoaded", detectNoLikes)


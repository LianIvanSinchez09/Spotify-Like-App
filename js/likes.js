let likes = localStorage.getItem("likes");
let likesSpace = document.getElementById("user-likes");
console.log(likes);

function showLikes(){
    likes.forEach(likedElement => {
        let div = document.createElement("div");
        let h3 =  document.createElement("h3");
        h3.innerHTML = likedElement.author
        likesSpace.appendChild(h3)
    });
}

showLikes()

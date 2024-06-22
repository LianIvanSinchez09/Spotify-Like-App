//obtenemos los slides que son imagenes (css)
const imgs = document.getElementById("carrousel");
let increment = 0;

function displayImgManager(imgs){
    for (let index = 0; index < imgs.children.length; index++) {
        imgs.children[index].classList.add("hide")
    }
    imgs.children[0].classList.remove("hide")
}

displayImgManager(imgs)

function prevImg(){
    if(increment == 0){
        imgs.children[increment].classList.add("hide");
        increment = imgs.children.length - 1;
        imgs.children[increment].classList.remove("hide");
    }
    else{
        increment--;
        imgs.children[increment].classList.remove("hide");
        imgs.children[increment+1].classList.add("hide");
    }
}

function nextImg(){
    if(increment == imgs.children.length - 1){
        imgs.children[increment].classList.add("hide");
        increment = 0; //reseteo el incremento para ir a la primer imagen
        imgs.children[0].classList.remove("hide")
    }
    else{
        increment++;
        imgs.children[increment].classList.remove("hide");
        imgs.children[increment-1].classList.add("hide");
    }
}


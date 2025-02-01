var modal = document.getElementById("Modal");
modal.onclick = function() { 
    modal.style.display = "none";
}
var modalImg = document.getElementById("img01");

var imgs = document.getElementsByClassName("Img_small");
for (const e of imgs) {
    e.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.getElementsByTagName("img")[0].src;
    }
}
var imgs = document.getElementsByClassName("image");
for (const e of imgs) {
    e.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.getElementsByTagName("img")[0].src;
    }
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function() { 
    modal.style.display = "none";
}
const text1 = document.getElementById("text-1");
const text2 = document.getElementById("text-2");
const text3 = document.getElementById("text-3");
const movX = 2.5;
const movY = 2.1;
window.onmousemove = e => {
    var offX = (e.clientX/window.innerWidth-0.5)*2*movX;
    var offY = (e.clientY/window.innerHeight-0.5)*2*movY;
    text1.style.transform = `translate(${-50+offX+2}%, ${-50+offY+2}%)`;
    text2.style.transform = `translate(${-50-offX-2}%, ${-50-offY-2}%)`;
    
    
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()_+`-={}|[]\\:\";'<>?,./";
let interval = [];
const flaps = document.getElementsByClassName("splitflap");
for (const flap of flaps){
    flap.onmouseover = event => {  
        let iteration = 0;
        clearInterval(interval[flap]);
        interval[flap] = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return event.target.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * (letters.length -1))];
            })
            .join("");
            if(iteration >= event.target.dataset.value.length){ 
                clearInterval(interval[flap]);
            }
            iteration += 1 / 3;
        }, ((Math.random()*20)+30));
    }
}

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

document.getElementById("cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("card")) {
        const rect = card.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;
const flaps = document.getElementsByClassName("splitflap");
for (const flap of flaps){
    flap.onmouseover = event => {  
        let iteration = 0;
        clearInterval(interval);
        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return event.target.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
            if(iteration >= event.target.dataset.value.length){ 
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 30);
    }
}

var title = document.getElementsByName('title')[0].content;
document.title = "x42.space | " + title;
try {
    document.getElementById("href-" + title).classList.add("active");
}
catch (error) {/*No DOM Element with Id*/}
function goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
var title = document.getElementsByName('title')[0].content;
document.title = "x42.space | " + title;
try {
    document.getElementById("href-" + title).classList.add("active");
}
catch (error) {/*No DOM Element with Id*/}
function goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function header_fold() {
    var e = document.getElementById("header");
    if (e.classList.contains("fold_open")) {
        e.classList.remove("fold_open");
    } else {
        e.classList.add("fold_open");
    }
}
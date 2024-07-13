var title = document.getElementsByName('title')[0].content;
console.log(title);
document.title = "x42.space | " + title;

function goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
//Nav bar
fetch('/../src/landing_page/nav.html')
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector("script#replace_with_navbar");
        let newelem = document.createElement("div");
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem, oldelem);
    })



//Footer
fetch('/../src/landing_page/footer.html')
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector("script#replace_with_footer");
        let newelem = document.createElement("div");
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem, oldelem);
    })



//Get involved modals
fetch('/../src/landing_page/modals.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_modals");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem, oldelem);
})
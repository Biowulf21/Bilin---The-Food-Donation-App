//Nav bar
fetch('/../assets/reusable-components/nav.html')
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector("script#replace_with_navbar");
        let newelem = document.createElement("div");
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem, oldelem);
    })



//Footer
fetch('/../assets/reusable-components/footer.html')
    .then(res => res.text())
    .then(text => {
        let oldelem = document.querySelector("script#replace_with_footer");
        let newelem = document.createElement("div");
        newelem.innerHTML = text;
        oldelem.parentNode.replaceChild(newelem, oldelem);
    })



//Get involved modals
fetch('/../assets/reusable-components/modals.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_modals");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem, oldelem);
})



//Dashboard - sidenav
fetch('/../src/admin/pages/sidenav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_sidenav");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem, oldelem);
})
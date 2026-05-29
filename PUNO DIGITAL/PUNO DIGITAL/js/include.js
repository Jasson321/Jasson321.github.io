
async function loadComponent(id, file){

    const response = await fetch(file);

    const data = await response.text();

    document.getElementById(id).innerHTML = data;
}

loadComponent("navbar-container", "components/navbar.html");

loadComponent("footer-container", "components/footer.html");
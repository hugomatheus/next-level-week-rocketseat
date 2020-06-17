menu();
function menu(){
    const menuResponsive = document.querySelector('.icon');
    menuResponsive.addEventListener("click", eventMenuResponsive);
}

function eventMenuResponsive(){
    const menuDiv = document.getElementById("myTopnav");
    menuDiv.classList.toggle("responsive");
}
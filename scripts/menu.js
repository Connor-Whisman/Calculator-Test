// TOGGLE DROPDOWN AND ROTATE MENU ICON
function myFunction() {
    document.getElementById("menu-icon").classList.toggle("rotate-menu");
    document.getElementById("dropdown").classList.toggle("show");
}
  
// IF USER CLICKS OUTSIDE OF DROPDOWN AREA, CLOSE THE MENU
window.onclick = function(event) {
    if (!event.target.matches('#menu-icon')) {
        document.getElementById("menu-icon").classList.remove('rotate-menu');
        document.getElementById("dropdown").classList.remove("show");
    }
}
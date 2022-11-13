// TOGGLE DROPDOWN AND ROTATE MENU ICON
function myFunction() {
    document.getElementById("menu-icon").classList.toggle("rotate-menu");
    document.getElementById("myDropdown").classList.toggle("show");
}
  
// IF USER CLICKS OUTSIDE OF DROPDOWN AREA, CLOSE THE MENU
window.onclick = function(event) {
    if (!event.target.matches('#menu-icon')) {
        var dropdowns = document.getElementsByClassName("menu-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
        document.getElementById("menu-icon").classList.remove('rotate-menu');
    }
}
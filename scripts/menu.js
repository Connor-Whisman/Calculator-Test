// VARIABLES
var menuIcon = document.getElementById("menu-icon");
var menuDropdown = document.getElementById("menu-dropdown");
var logModal = document.getElementById("log-modal");


// EVENTS
window.onclick = function(event) {
    // CLOSE MENU
    if (!event.target.matches('#menu-icon')) {
        menuIcon.classList.remove('rotate-menu');
        menuDropdown.classList.remove("show");
    }
    // CLOSE LOG
    if (event.target == logModal) {
        logModal.style.display = "none";
    }
}


// FUNCTIONS
function openMenu() {
    menuIcon.classList.toggle("rotate-menu");
    menuDropdown.classList.toggle("show");
}
function openLog() {
    logModal.style.display = "block";
}
function closeLog() {
    logModal.style.display = "none";
}
// ROTATE THE MENU ICON AND TOGGLE DROPDOWN
function toggleMenu() {
    document.getElementById("menu-icon").classList.toggle("rotate-menu");
    document.getElementById("dropdown").classList.toggle("show");
}
  
// LISTEN FOR CLICK EVENTS
window.onclick = function(event) {
    // IF USER CLICKS OUTSIDE OF DROPDOWN AREA, CLOSE THE MENU
    if (!event.target.matches('#menu-icon')) {
        document.getElementById("menu-icon").classList.remove('rotate-menu');
        document.getElementById("dropdown").classList.remove("show");
    }
    // IF USER CLICKS OUTSIDE OF LOG MODAL, CLOSE THE LOG
    if (event.target == log) {
        log.style.display = "none";
    }
}

// LOG MODAL
var log = document.getElementById("log-modal");

function openLog() {
    log.style.display = "block";
}

function closeLog() {
    log.style.display = "none";
}
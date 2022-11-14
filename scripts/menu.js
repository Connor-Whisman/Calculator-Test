// VARIABLES / CONSTANTS
var menuIcon = document.getElementById('menu-icon');
var menuDropdown = document.getElementById('menu-dropdown');

var logModal = document.getElementById('log-modal');
var themeDropdown = document.getElementById('theme-dropdown');
var fontDropdown = document.getElementById('font-dropdown');

const body = document.getElementsByTagName("body")[0];
var currentTheme = 'default-theme';
var currentFont = 'default-font';

selectTheme(currentTheme);


// EVENTS
window.onclick = function(event) {
    // CLOSE MENU
    if (!event.target.matches('#menu-icon')) {
        if (!event.target.matches('#expand-themes') && !event.target.matches('#expand-fonts')) {
            menuIcon.classList.remove('rotate-menu');
            menuDropdown.classList.remove('show');
            themeDropdown.classList.remove('show');
            fontDropdown.classList.remove('show');
        } 
        else if (!event.target.matches('#expand-themes')) {
            themeDropdown.classList.remove('show');
        } 
        else if (!event.target.matches('#expand-fonts')) {
            fontDropdown.classList.remove('show');
        }
    }
    // CLOSE LOG
    if (event.target == logModal) {
        logModal.style.display = 'none';
    }
}


// FUNCTIONS
function openMenu() {
    menuIcon.classList.toggle('rotate-menu');
    menuDropdown.classList.toggle('show');
}
function openLog() {
    logModal.style.display = 'block';
}
function closeLog() {
    logModal.style.display = 'none';
}

function expandSubDropdown(dropdown) {
    dropdown.classList.toggle('show');
}
function selectTheme(theme) {
    body.classList.remove(currentTheme);
    currentTheme = theme;
    body.classList.toggle(theme);
}

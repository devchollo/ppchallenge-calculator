// opt selector
const opt = document.getElementById('opt');
// just to color the svg when pressed
const icon = document.querySelector('#opt svg path');
// scientific functions selector
const functionalityUno = document.getElementById('sci');
// main container selector
// ive decided to transition the main container itself so that the other containers
// will still hold their original positioning
const cont = document.querySelector('.container');
// google spreadsheet selector
const leftee = document.querySelector('.leftee');
// the moon icon selector
const moon = document.querySelector('#darkmode');

// stat is for the icon color toggle
let stat = false;

//simple click event to show scientific calc functions
opt.addEventListener('click', () => {
    // add a class to the container
    cont.classList.toggle('moveeee');
    functionalityUno.classList.toggle('popside');
    leftee.classList.toggle('lmove');
    // condition for filling the icon
    if(stat) {
        icon.style.fill = "#f7f7f7";
        stat = false;
    }else{
        icon.style.fill = "#e74c3c";
        stat = true;
    }
});

moon.addEventListener('change', () => {
    document.body.classList.toggle('darktheme');
});

// nav bar

let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}


window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}
 
document.querySelector('#search-icon').onclick = () =>{
    document.querySelector('#search-form').classList.toggle('active');
} 

document.querySelector('#close').onclick = () =>{
    document.querySelector('#search-form').classList.remove('active');
}

// message form functionality

let form = document.getElementById('sheetdb-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(form.action, {
        method : 'POST',
        body: new FormData(document.getElementById('sheetdb-form'))     
    })
    .then(res => {
        return res.json();
    })
    .then(alert("message sent!"))

    .then(form.reset())
 
});


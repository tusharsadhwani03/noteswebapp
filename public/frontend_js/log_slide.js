/* Grab the containers */
const container = document.querySelector('.container');
window.onload = function(){
    container.classList.add('load');
};

/* Grab the buttons */
const gotosignup = document.querySelector('.go_to_signup');
const gotologin = document.querySelector('.go_to_login');

/* Grab sideboxes */
const goforsignup = document.querySelector('.go_for_signup');
const goforlogin = document.querySelector('.go_for_login');

/* Grab forms */
const login = document.querySelector('.login');
const signup = document.querySelector('.signup');

/* Event listener for gotosignup */
gotosignup.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log("hello");
    signup.classList.add('slide_right');
    goforlogin.classList.add('slide_left');    
}); 

/* Event Lstener for gotologin */
gotologin.addEventListener('click', (e)=>{
    e.preventDefault();
    login.classList.add('return_left');
    goforsignup.classList.add('return_right');
    setTimeout(() => {
        location.assign('/log');
    }, 2000);
});
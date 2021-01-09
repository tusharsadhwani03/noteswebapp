/* Grabbing required elements */
    var container = document.querySelector('.container');
    var createnote = document.querySelector('.createnote');
    var typ = document.querySelector('.type');

/* Typewriter effect */
    const texts = ["Create Notes" , " Save Notes" , "View Notes"];
    let wordcounter = 0;
    let wordindexcounter = 0;
    let currentword = "";
    let letter = "";
  // 1. Self Invoking function 'type' 
    (function type(){
        if(wordcounter === texts.length)
        {
            wordcounter = 0;
        }
        currentword = texts[wordcounter];
        letter = currentword.slice(0,++wordindexcounter);

    typ.textContent = letter;
        if(letter.length === currentword.length)
        {
            wordcounter++;
            wordindexcounter = 0;
        }
        setTimeout(type,400);
    }());

/* Event listener for creatnote -> redirecting to log page */
    createnote.addEventListener('click',function(e){
        e.preventDefault();
        location.assign('/log');
    });
/* Page on load animation */
    window.onload = function(){
        container.classList.add('load');
        setTimeout(() => {
        container.body.classList.remove('load');
        }, 1000);
    };
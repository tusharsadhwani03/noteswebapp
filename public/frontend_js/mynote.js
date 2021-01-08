var delet = document.querySelector('.delete');
var user = document.querySelector('.user');
var newnote = document.querySelector('.newnote');
var logout = document.querySelector('.logout');

newnote.addEventListener('click',function(e){
    e.preventDefault();
    location.assign('/notes');
});

logout.addEventListener('click',function(e){
    e.preventDefault();
    location.assign('/logout');
});

delet.addEventListener('click',async function(e){
    var username = user.uservalue.value;
    var noteid = user.noteid.value;
    try {
        var res = await fetch('/delete',{
            method : 'POST',
            body: JSON.stringify({username : username , noteid : noteid}),
            headers : {'Content-Type' : 'application/json'}
        });
        var data = await res.json();
        if(data.user)
        {
            location.assign('/mynotes');
        }
    } catch (error) {
        console.log(error);
    }
});
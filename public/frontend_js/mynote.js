/* Grabbing required elemen froom dom */
    var delet = document.querySelector('.delete');
    var user = document.querySelector('.user');
    var newnote = document.querySelector('.newnote');
    var logout = document.querySelector('.logout');

/* Event Listener for going to notes page -> redirecting to 'notes' */
    newnote.addEventListener('click',function(e){
        e.preventDefault();
        location.assign('/notes');
    });

/* Event listener for logout */    
    logout.addEventListener('click',function(e){
        e.preventDefault();
        location.assign('/logout');
    });

/* For Deleting a note */    
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
        }
        catch (error) {
            console.log(error);
        }
});
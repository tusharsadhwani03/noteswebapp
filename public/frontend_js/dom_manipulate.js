/**********************************Signup form******************************************/

/* Grabbing required dom elements */
    var sign_up = document.querySelector('.signup_form');
    var usererror = document.querySelector('.usererror');
    var emailerror = document.querySelector('.emailerror');
    var passerror = document.querySelector('.passerror');

/* Adding event listener on Signup form */
    sign_up.addEventListener('submit',async function(e){

    // 1. preventing form submission to '/signup'
        e.preventDefault();

    // 2. Error content reset whenever dom loads
        usererror.textContent = '';
        emailerror.textContent = '';
        passerror.textContent = '';

    // 3. Grabbing user-input data from form
        var username = sign_up.username.value;
        var email = sign_up.email.value;
        var password = sign_up.password.value;

    // 3. Using try-catch block
        try{
        // (a) POST above grabbed data to '/signup' using fetch 
            var resp = await fetch('/signup',{
                method : 'POST',
                body : JSON.stringify({username,email,password}),
                headers : {'Content-Type' : 'application/json'}
            });

        // (b) Fetching data from above fetch request    
            var data = await resp.json();
            console.log(data);
        
        // (c) If errors in data , populate error fields    
            if(data.errors)
            {
                usererror.textContent = data.errors.username;
                emailerror.textContent = data.errors.email;
                passerror.textContent = data.errors.password;
            }

        // (d) If no error , load / redirect to user page
            if(data.user)
            {
                location.assign('/notes');
            }
        }
        catch(error)
        {
            console.log(error);
        }
    
});

/**************************************Login form**************************************/

/* Grabbing required dom elements */
    var log_in = document.querySelector('.login_form');
    var emailError = document.querySelector('.emailError');
    var passError = document.querySelector('.passError');

/* Adding event listener on Signup form */
    log_in.addEventListener('submit',async function(e){

// 1. preventing form submission to '/signup'
    e.preventDefault();

// 2. Error content reset whenever dom loads
    emailerror.textContent = '';
    passerror.textContent = '';

// 3. Grabbing user-input data from form
    var email = log_in.email.value;
    var password = log_in.password.value;

// 3. Using try-catch block
    try{
    // (a) POST above grabbed data to '/signup' using fetch 
        var resp = await fetch('/login',{
            method : 'POST',
            body : JSON.stringify({email,password}),
            headers : {'Content-Type' : 'application/json'}
        });

    // (b) Fetching data from above fetch request    
        var data = await resp.json();
        console.log(data);
    
    // (c) If errors in data , populate error fields    
        if(data.errors)
        {
            emailError.textContent = data.errors.email;
            passError.textContent = data.errors.password;
        }

    // (d) If no error , load / redirect to user page
        if(data.user)
        {
            location.assign('/notes');
        }
    }
    catch(error)
    {
        console.log(error);
    }

});
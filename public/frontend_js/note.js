/* Grabbing required elements from dom */
    var newnote = document.querySelector('.newnote');
    var logout = document.querySelector('.logout');
    var canvas = document.querySelector('.notes'); 
    var note = document.querySelector('.note');
    var header = document.querySelector('.header');
    var dpi = window.devicePixelRatio;
    var ctx = canvas.getContext('2d');
    var savenote = document.querySelector('.savenote');
    var user = document.querySelector('.user');
    var mynote = document.querySelector('.mynote');
    var cancelnote = document.querySelector('.cancelnote');
    var choosefont = document.querySelector('.choosefont');
    var Pacifico = document.querySelector('.Pacifico');
    var Arial = document.querySelector('.Arial');
    var OleoScript = document.querySelector('.OleoScript');
    var cursive = document.querySelector('.cursive');
    var Fantasy = document.querySelector('.Fantasy');
    var canvas2 = document.querySelector('.notecopy');
    var ctx2 = canvas2.getContext('2d');
    var color = document.querySelector('.color');
    var notename = document.querySelector('.notename');
    var nameandcolor = document.querySelector('.nameandcolor');
    var colorpicker = document.querySelector('.colorpicker');
    var colorname = document.querySelector('.colorname');
    var title = document.querySelector('.name');

/* Grabbing choosefont childrens in elements */
    var elements = choosefont.children;

/* Function for fixing the Canvas text issue */    
    function fix(){
        let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0,-2);
        let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0,-2);
        canvas.setAttribute('height',style_height * dpi);
        canvas.setAttribute('width',style_width * dpi);
    }

/* Calling 'fix' function */
    fix() ;

/* 'fix2' function for copycanvas */
    function fix2(){
        let style_height = +getComputedStyle(canvas2).getPropertyValue("height").slice(0,-2);
        let style_width = +getComputedStyle(canvas2).getPropertyValue("width").slice(0,-2);
        canvas2.setAttribute('height',style_height * dpi);
        canvas2.setAttribute('width',style_width * dpi);
    }
/* Calling fix2 */
    fix2() ;

/* Basic canvas measurements for notes */    
    var width = canvas.width;
    var height = canvas.height;
    var posx , posy;
    var pretitleposx , pretitleposy;
    var predisposx ,  predisposy;
    var points;
    var dispoints;
    var linepoints;
    var titlekeyactive ;
    var diskeyactive ;

/* Function for drawing basic layout everytime when new note is clicked */    
    function drawbasiclayout()
    {
        points = []; // for storng title area  points inorder
        linepoints = []; // for storing linegap points in discription area
        dispoints = []; // for storng title area points inorder

        // Initially titlearea and discriptionarea disabled
            titlekeyactive = false;
            diskeyactive = false;

        // Starting cursor positions for title and discription area
            pretitleposx  = 0.25 * width;
            predisposx =  0.05 * width;
            pretitleposy  = 0.7*0.1*height;
            predisposy = 0.3 * height;
        
        // Drawing Title , line and , Discription on each note    
            ctx.clearRect(0,0,width,height);
            ctx.fillStyle = "bisque";
            ctx.fillRect(0,0,width,height);
            ctx.fillStyle = "#141e30";
            ctx.font = "30px Pacifico"; 
            ctx.fillText("TITLE --",4,0.7*0.1*height);
            ctx.beginPath();
            ctx.moveTo(0,0.12*height);
            ctx.lineTo(width,0.12*height);
            ctx.stroke();
            ctx.fillStyle='#141e30';
            ctx.font = "30px Oleo Script";
            ctx.fillText('DESCRIPTION' , 0.4*width , 0.17*height);
    }

/* Event listener when clicked on canvas area */    
    canvas.addEventListener('mouseup', function(e){
        // Calculating x and y coordinates for canvas 
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - note.offsetTop;
    
        // if cursor in Title area
            if (y <= 0.1 * height) 
            {
                if (diskeyactive == true)
                { 
                // disable cursor for discription area and store last curser data
                    diskeyactive = false; 
                    predisposx = posx;
                    predisposy = posy;
                }
                // enable cursor for titlearea and reach to last text point in title area
                    titlekeyactive = true;
                    posx = pretitleposx;
                    posy = pretitleposy;
                
                // handlecursor
                    handlecursor();
                
                // add event listener for keyboard
                    document.addEventListener('keydown',handleevent);   
            }
            else
            {// now curser in discription area 
                if (titlekeyactive == true)
                {
                // disable cursor titlearea and store last titlearea point where text is written
                    titlekeyactive = false;
                    pretitleposx = posx;
                    pretitleposy = posy;    
                }
                // enable cursor for discription area and move curser to last text written area in discription
                    diskeyactive = true;
                    posx = predisposx;
                    posy = predisposy;

                // Handlecursor
                    handlecursor();

                // add keyboard event
                    document.addEventListener('keydown',handleevent);            
            }   
    });
/* Function for handling keyboard events */    
    function handleevent(e)
    {
       // condition for dealing with alphanumeric keys, backspace , space , shift only 
        if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)  || e.keyCode == 8 || e.keyCode == 32 || (e.keyCode >= 96 && e.keyCode <= 111 ) || ( e.keyCode >= 186 && e.keyCode <= 191) || (e.keyCode >= 219 && e.keyCode <= 222))
        {
        // If backspace is pressed    
            if(e.key === 'Backspace')
            {
            // if titlearea active then enable backspace for posx greater than 0.25*width 
                if(titlekeyactive)
                {
                    if(posx > 0.25 * width)    
                    {  
                        var diff = points.pop();
                        ctx.clearRect(posx-diff,0,diff+2,0.09*height);
                        posx = posx - diff;
                        pretitleposx = pretitleposx - diff;
                        console.log(posx);
                    }
                    handlecursor();
                }
            // if discription area active enable backspace upto posx > 0.05*width and posy = 0.3*height
                if(diskeyactive)
                {
                    if(posx > 0.05 * width)
                    {
                        var dif = dispoints.pop();
                        ctx.clearRect(posx-dif-2,posy-40,dif+2,0.1*height);
                        posx = posx - dif;
                        predisposx = predisposx - dif;
                    }
                    else
                    {
                        if (posy > 0.3*height) 
                        {
                            posx = linepoints.pop();
                            predisposx = posx;
                            posy = posy - 50;
                            predisposy = predisposy - 50;
                            ctx.clearRect(posx-10,posy-50,10,0.1*height);
                        }
                    }
                    handlecursor();
                }
            }
        // Other key except backspace is pressed
            else
            {
            // If not reached at the end of note , update posx,pretitleposx/predisposx
                if(posx <  width-50)
                {
                    ctx.fillText(e.key,posx,posy);
                    if (titlekeyactive == true)
                    {
                        points.push(ctx.measureText(e.key).width + 5);
                        pretitleposx = pretitleposx + ctx.measureText(e.key).width + 5;   
                    }
                    if (diskeyactive == true)
                    {
                        dispoints.push(ctx.measureText(e.key).width + 5);
                        predisposx = predisposx + ctx.measureText(e.key).width + 5;
                    }
                    posx = posx + ctx.measureText(e.key).width + 5;
                    handlecursor();
                } 
            /* If reached at the end , stop for title area and move to next line (if possible) for discription
            and update the change in predisposx , predisposy , posx, posy */  
                else
                {
                    if (diskeyactive && (posy <= height - 50))
                    {
                        linepoints.push(posx);
                        posx = 0.05 * width;
                        posy = posy + 50;
                        predisposx = 0.05*width;
                        predisposy = predisposy + 50;
                        ctx.fillText(e.key,posx,posy);
                        dispoints.push(ctx.measureText(e.key).width + 5);
                        posx = posx + ctx.measureText(e.key).width + 5;
                        predisposx = predisposx + ctx.measureText(e.key).width + 5;
                    }
                    handlecursor();
                }
            }
        }
    }

/* Function for handling cursor */
    function handlecursor()
    { 
        ctx.fillText('|',posx,posy);
        setTimeout(() => {
        console.log('b');
        ctx.clearRect(posx-1,posy - 40,50,0.09*height);
        }, 4);   
    }

/* When new note button is pressed ->(i) draw basic layout for canvas ,(ii) add animation class for canvas , font options , color  and (iii)remove previous added class for animation when cancel was pressed*/ 
    newnote.addEventListener('click',function(e){
        drawbasiclayout();
        e.preventDefault();
        setTimeout(() => {
        note.classList.remove('down');
        choosefont.classList.remove('toleft');
        nameandcolor.classList.remove('right');
        removeselectedclass();
        }, 100);
        note.classList.add('animate'); 
        setTimeout(() => {
        choosefont.classList.add('toright');
        nameandcolor.classList.add('left');
        }, 1000);
    });

/* When Save button pressed -> (i) draw basic layout for copycanvas ,(ii) grab user , title from apply button , (iii)convert canvas to datauri and copy its image on copy canvas using draw image and send that to '/savenote' using fetch (iv) redirect to '/notes' */
    savenote.addEventListener('click',async function(e){
        e.preventDefault();
        ctx2.fillStyle = "bisque";
        ctx2.fillRect(0,0,width,height);
        ctx2.drawImage(canvas, 0, 0);
        var dataurl = canvas2.toDataURL();
        var username = user.uservalue.value;
        var date = new Date();
        var Title = title.value;
        try {
            var res = await fetch('/savenote',{
                method: 'POST',
                body : JSON.stringify({imagedata : dataurl , username : username , Date : date.toUTCString() ,Title     : Title}),
                headers : {'Content-Type' : 'application/json'}
            });
            var data = await res.json();
            if(data.user)
            {
                location.assign('/notes');
            }
            if(data.err)
            {
                console.log(data.err);
            }
        } 
        catch (error) {
            console.log(error);
        }
    });

/* Goto mynotes when my notes button clicked*/
    mynote.addEventListener('click',function(e){
        e.preventDefault();
        location.assign('/mynotes');
    });

/* redirect to logout when logout clicked */
    logout.addEventListener('click',function(e){
        e.preventDefault();
        location.assign('/logout');
    });

/* Add animation and remove previous animations  */
    cancelnote.addEventListener('click',function(e)
    {
        e.preventDefault();
        note.classList.add('down');

        setTimeout(() => {
            choosefont.classList.add('toleft');
            choosefont.classList.remove('toright');
            nameandcolor.classList.remove('left');
            nameandcolor.classList.add('right');
            note.classList.remove('animation');
        }, 1500);
    
    });

/* function for removing border from all selected fonts */
    function removeselectedclass()
    {
        for(var i=1;i<elements.length;i++)
        {
            elements[i].classList.remove('selected');
        }
    }

/* Add selected class i.e. scale and border animation for clicked fonts , call removeselectedclass() */
    // 1. for Pacifico font
        Pacifico.addEventListener('click',function(e){
            e.preventDefault();
            ctx.font = "30px Pacifico"; 
            removeselectedclass();
            Pacifico.classList.add('selected');
        });

    // 2. for Arial font
        Arial.addEventListener('click',function(e){
            e.preventDefault();
            ctx.font = "30px  Arial";
            Arial.classList.add('pop');
            removeselectedclass();
            Arial.classList.add('selected');
        });

    // 3. for Fantasy font
        Fantasy.addEventListener('click',function(e){
            e.preventDefault();
            ctx.font = "30px fantasy";
            removeselectedclass();
            Fantasy.classList.add('selected');
        });

    // 4. for cursive font
        cursive.addEventListener('click',function(e){
            e.preventDefault();
            ctx.font = "30px cursive";
            removeselectedclass();
            cursive.classList.add('selected');
        });

    // 5. for Oleo Script font    
        OleoScript.addEventListener('click',function(e){
            e.preventDefault();
            ctx.font = "30px OleoScript";
            removeselectedclass();
            OleoScript.classList.add('selected');
        });

/* Applying selected font color as canvas fillstyle */        
    colorpicker.addEventListener('click',function(e){
        e.preventDefault();
        ctx.fillStyle = colorname.value;
    });

/* header animation on window load */
    window.onload = function(){
        header.classList.add('load');
        setTimeout(() => {
            document.body.classList.remove('load');
        }, 1000);
    };
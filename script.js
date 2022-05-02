// timer 

'use strict'

// select start-box 
let startBox = document.querySelector('.start-box');

// select input 
let inputCounter = startBox.querySelector('#input-counter');

// select button start
let startCounter = startBox.querySelector('#start-counter');


// select timer circle
let timerCircle = document.querySelector('.c100');

// select timer number 
let timeNumber = document.querySelector('.c100>span');

// set lastPersent
let lastPersent = 'p100';

// define stop alarm button element
let stopAlarm = document.querySelector('.stop-alarm')

// define originalSecond and define inputValueInterger
let originalSecond , timerId ,inputValueInterger,tmpCompelet;

// define audio source 
let beat = new Audio('media/alarm-sound.mp3');

//------------------------------------------------------------------------------------------



//add event listener for button (event click)
startCounter.addEventListener('click',(e)=>{

    // hide success message
    toggleSuccessMessage({show:false})

    // get data in input (return string)
    let inputValue = inputCounter.value;

    // convert string to integer 
    inputValueInterger = parseInt(inputValue);

    // validation (value is NaN or is Integer) and run toggleErrorMessage (finish callback function)
    if(isNaN(inputValueInterger)) return toggleErrorMessage({show : true , message : 'زمان را به درستی وارد کنید!'});

    

    // hide error message
    toggleErrorMessage({show : false});

    //show circle timer
    toggleTimerCircle({show:true});

    // hide start box
    toggleStartBox({show:false});
    
    //set number timer in timer circle
    timeNumber.textContent = inputValueInterger;
    
    // show loading message
    toggleLoadingMessage({show:true});

    // set original second
    originalSecond = inputValueInterger;

    // for fix error of not show circle 100
    tmpCompelet = 'p100'

    // add class p100 before start timer
    timerCircle.classList.add(tmpCompelet);

    // set and run a timer 
    timerId =setInterval(startTimer,1000);
    

    

});


// set and build timer base (run timer)------------------------------------------------------
let startTimer = ()=>{
        
        // remove last progress class (for fix problem progress class)
        if(lastPersent) timerCircle.classList.remove(lastPersent)

        // if number of timer is negative (1>number) => stop timer 
        if(inputValueInterger<=0){
            // stop timer with timerId and function clearInterval
            clearInterval(timerId); 

            // show start box
            toggleStartBox({show:true});

            // hide timerCircle
            toggleTimerCircle({show:false});

            // hide loading message
            toggleLoadingMessage({show:false});

            // show success message
            toggleSuccessMessage({show:true});

            // after return all code not run
            return;
            

        }

        // reduce 1 number of inputValueInterger (in each second)
        inputValueInterger -= 1;

        // show input time number in time number in center circle
        timeNumber.textContent = inputValueInterger;
        
        // calculate persent time and delete float part number of persent time and convert to positive and set last persent
        let persent = lastPersent = `p${(Math.abs(Math.floor(((originalSecond - inputValueInterger) / originalSecond) * 100)-100))}`;

        // set pesent number in timerCircle
        timerCircle.classList.add(persent);
        
        //remove class p100 after end timer 
        timerCircle.classList.remove(tmpCompelet);
        
        
}


/// error handling -----------------------------------------------------------

let toggleErrorMessage = ({show , message}) => {
    // select error element 
    let errorElement = document.querySelector('#error-message');
    if(show){
        // change textcontent of element with js
        errorElement.textContent = message

        // show error element with add class active
        errorElement.classList.add('active');
    }else{
        // if is not error remove element error
        errorElement.classList.remove('active');
    }
}


/// show and hide start box -------------------------------------------------
let toggleStartBox = ({show})=>{
    if(show){
        // show start box
        startBox.style.display = 'block';

        // clear value of input counter
        inputCounter.value = '';
    }else{
        // hide start box
        startBox.style.display = 'none';
    }
}


// show and hide loading message ---------------------------------------------------
let toggleLoadingMessage = ({show}) => {
    // select loading message 
    let loadingMessage = document.querySelector('.loading');
    if(show){
        // show loading message
        loadingMessage.style.display = 'block'; 
    }else{
        //hide loading message
        loadingMessage.style.display = 'none';
    }
};


// show and hide success message ---------------------------------------------------
let toggleSuccessMessage = ({show}) => {
    //select success message
    let successMessage = document.querySelector('.success');
    if(show){
        // show success message
        successMessage.style.display = 'block';
        stopAlarm.style.display = 'block'
        beat.play()
        stopAlarm.addEventListener('click',(e)=>beat.pause())
    }else{
        // hide success message
        successMessage.style.display = 'none';
        stopAlarm.style.display = 'none'
        beat.pause()
    }

    
    
};


// show and hide timerCircle
let toggleTimerCircle = ({show}) => {
    if(show){
        //show circle timer with display block
        timerCircle.style.display = 'block';
    }else{
        // hide timerCircle
        timerCircle.style.display = 'none';
    }
} 
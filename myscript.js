
// here, using the keypad variable we are selection th button tag from html and using the input variable we are selecting the input tag
var keypad = document.querySelectorAll('button');
var input = document.querySelector('input');

var clicked,    // --> to check if the button is clicked
    hold_number, // --> to ensure button is being clicked and hold
    click_is_busy, // --> to check if user is waiting or not
    c = -1, // --> index value for the data-text
    clicked_target = null; //--> target of the button clicked


// when user clicks a button we will get the respective index of the button and call onmousedown function

for (var i = 0, len = keypad.length; i < len; ++i) {
    keypad[i].onmousedown = function (e) {
        var text = this.getAttribute('data-text').split(""),            //in text variable we are storing the data-text value 
            number = this.getAttribute('data-number');                  // in number variable we are storing the data-number value
        clicked = true;                                             // since after user clicks, the onmousedown function is called, so we are assigning clicked as true
        clearTimeout(click_is_busy);                 //if user is not clicking within 1000ms of onmouseup funtion then 
        if (clicked_target !== e.target) {          //  clicked_target will be null and clicked will be set to false
            clicked = false;
        }
        if (c >= text.length - 1 || clicked_target !== e.target) {
            c = 0;                                                      //when user clickes once we assign c as 0 as clicked_target as current target
            clicked_target = e.target;
        } else {
            c = c + 1;                                                  // when user clicks more than once we assign c as current value + 1
        }
        hold_number = setTimeout(function () {                         // this is to check whether user is holding a button or not and if holding we will we will remove the current input value and assing the respective number 
            input.value = input.value.slice(0, -1) + number;
        }, 1000);
        input.value = clicked ? input.value.slice(0, -1) + text[c] : input.value + text[c];  // if clicked is true then we are removing and adding the next alphabat and if false we will add new alphabat after the previous one 
    };

    //this is the onmouseup function which is called when the user completes a click
    keypad[i].onmouseup = function (e) {
        clearTimeout(hold_number);                  //we are clearing the hold_number which indicates that user no more holds
        click_is_busy = setTimeout(function () {       // after 1000ms of mouseup, using this function we can set clicked as flase, clicked_target, e.target as null and c index as -1 which indicates on delayed keypress a new characte will be added in the input field 
            c = -1;
            clicked = false;
            clicked_target = null
            e.target = null;
        }, 1000);
        input.focus();    
    };
}
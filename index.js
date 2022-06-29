'use strict';
const SEGMENTS = [0b1111110, 0b0000110, 0b1101101, 0b1111001, 0b0110011, 0b1011011, 0b1011111, 0b1110010, 0b1111111, 0b1111011];
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var selected = 0;
var img_numbers = [];
var status_text;
var cleared = false;

window.onload = function setup(){
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    status_text = document.getElementById("status");
    for(var i = 1;i <= 9;i++){
        img_numbers.push(document.getElementById(i.toString()));
    }
}

function clickNumber(number){
    if(cleared){
        return;
    }
    status_text.innerText = " ";
    if(selected == 0){
        selected = number;
        img_numbers[number-1].style.border = "solid 2px blue";
    }
    else{
        var tmp_element = document.createElement("div");
        tmp_element.setAttribute("id", "tmp");
        var main = document.getElementById("main");
        main.insertBefore(tmp_element, img_numbers[number-1]);
        main.insertBefore(img_numbers[number-1], img_numbers[selected-1]);
        main.insertBefore(img_numbers[selected-1], tmp_element);
        tmp_element.remove();
        img_numbers[selected-1].style.border = "solid 2px white";
        for(var i = 0;i < 9;i++){
            if(numbers[i] == number) numbers[i] = selected;
            else if(numbers[i] == selected) numbers[i] = number;
        }
        selected = 0;
    }
}

function judge(){
    var correct = true;
    for(var i = 0;i < 3;i++){
        if((SEGMENTS[numbers[i*3]]|SEGMENTS[numbers[i*3+1]])^SEGMENTS[numbers[i*3+2]]){
            correct = false;
        }
    }
    if(correct){
        status_text.innerText = "Correct!";
        if(selected != 0){
            img_numbers[selected-1].style.border = "solid 2px white";
            selected = 0;
        }
        for(var i = 0;i < 9;i++){
            img_numbers[i].style.border = "solid 2px lime";
        }
        cleared = true;
        var clear_element = document.getElementById("clear_element");
        clear_element.style.display = "block";
        return true;
    }
    else{
        status_text.innerText = "Incorrect...";
        return false;
    }
}


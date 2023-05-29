"use strict"
//definig variables
let billInput = document.querySelector('#bill');
let buttonFivePercent = document.querySelector('#fivePercent');
let buttonTenPercent = document.querySelector('#tenPercent');
let buttonFifteenPercent = document.querySelector('#fifteenPercent');
let peopleCounter = document.querySelector('#people');
let calculateButton = document.querySelector('#button-calculate');
let tipAmount = document.querySelector('#tip-amount');
let totalAmount = document.querySelector('#total-amount');
let resetButton = document.querySelector('#button-reset');
let fivePercentTip = 0;
let tenPercentTip = 0;
let fifteenPercentTip = 0;
let devidedTip = 0;

//functions

// adding value of a tip selected by the user
function fiveTip() {
    fivePercentTip = 5 / 100;
    tenPercentTip = 0;
    fifteenPercentTip = 0;
    return fivePercentTip;
}

function tenTip() {
    tenPercentTip = 10 / 100;
    fivePercentTip = 0;
    fifteenPercentTip = 0;
    return tenPercentTip;
}

function fifteenTip() {
    fifteenPercentTip = 15 / 100;
    fivePercentTip = 0;
    tenPercentTip = 0;
    return fifteenPercentTip;
}


// adding different color to the chosen button with percent of a selected tip
 function buttonIsChosen(e) {
    buttonFivePercent.classList.remove('chosen-button');
    buttonTenPercent.classList.remove('chosen-button');
    buttonFifteenPercent.classList.remove('chosen-button');

    e.currentTarget.classList.add('chosen-button');
    return e.currentTarget;
 }

//calculating amount of tip per person and amount of bill per person
function calculate() {
    let billWithTip = 0; 
    if (!isNaN(billInput.value) && !isNaN(peopleCounter.value) && Number(billInput.value) > 0 && Number(peopleCounter.value) > 0){
        
        if(fivePercentTip) {
            fivePercentTip = Number(billInput.value) * fivePercentTip;
        }
        if(tenPercentTip) {
            tenPercentTip = Number(billInput.value) * tenPercentTip;
        }
        if(fifteenPercentTip) {
            fifteenPercentTip = Number(billInput.value) * fifteenPercentTip;
        }
    billWithTip = (Number(billInput.value) + (fivePercentTip + tenPercentTip + fifteenPercentTip)) / Number(peopleCounter.value);
    devidedTip = (fivePercentTip + tenPercentTip + fifteenPercentTip) / Number(peopleCounter.value);
    tipAmount.innerHTML = devidedTip.toFixed(2) + ' ' + '$';;
    totalAmount.innerHTML = Math.ceil(billWithTip).toFixed(2) + ' ' + '$';

    } else {
        let error = confirm('Please insert only positive numbers');
        calculateButton.disabled = true;
        calculateButton.classList.add('disabled');
        resetButton.classList.add('disabled');
        billInput.value = '';
        peopleCounter.value = '';
    }
        return billWithTip; 
    }

// defining when calculate button should be disabled
    function disableCalculate(){
        if (billInput.value === '' || peopleCounter.value === '') {
            calculateButton.disabled = true;
            calculateButton.classList.add('disabled');
        } else {
            calculateButton.disabled = false;
            calculateButton.classList.remove('disabled');
        }
        }
        

//defining all functions of a reset button
function resetInputs() {
    billInput.value = '';
    peopleCounter.value = '';
    fivePercentTip = 0;
    tenPercentTip = 0;
    fifteenPercentTip = 0;
    tipAmount.innerHTML = '$' + '0.00';
    totalAmount.innerHTML = '$' + '0.00';
    resetButton.classList.add('disabled');
    calculateButton.classList.add('disabled');
    buttonFivePercent.classList.remove('chosen-button');
    buttonTenPercent.classList.remove('chosen-button');
    buttonFifteenPercent.classList.remove('chosen-button');
}

// adding disabled class to the reset button
function disableReset() {
if (billInput.value === '' && peopleCounter.value === '' &&  fivePercentTip === 0 && tenPercentTip === 0 && fifteenPercentTip === 0) {
    resetButton.disabled = true;
    resetButton.classList.add('disabled');
} else {
    resetButton.disabled = false;
    resetButton.classList.remove('disabled');
}
}


// adding event listeners
buttonFivePercent.addEventListener('click', fiveTip);
buttonFivePercent.addEventListener('click', disableReset); 
buttonFivePercent.addEventListener('click', buttonIsChosen); 

buttonTenPercent.addEventListener('click', tenTip);
buttonTenPercent.addEventListener('click', buttonIsChosen);
buttonTenPercent.addEventListener('click', disableReset);

buttonFifteenPercent.addEventListener('click', fifteenTip);
buttonFifteenPercent.addEventListener('click', buttonIsChosen);
buttonFifteenPercent.addEventListener('click', disableReset);

billInput.addEventListener('change', disableReset);
billInput.addEventListener('change', disableCalculate);

peopleCounter.addEventListener('change', disableReset);
peopleCounter.addEventListener('change', disableCalculate);

resetButton.addEventListener('click', resetInputs);

calculateButton.addEventListener('click', calculate);

// stopping refreshing on whole form
let myForm = document.querySelector('#tipCalculator');
myForm.addEventListener("submit", (e) => e.preventDefault());


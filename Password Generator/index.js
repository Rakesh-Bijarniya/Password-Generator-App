const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicater]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password = "";
let passwordLength = 10;
let checkCount = 0;
setIndicator("#333");


handlingSlider()
function handlingSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML = passwordLength;
}

function randomInteger(min,max){
    return ( Math.floor(Math.random()* (max-min) ) + min );
}
function generateRandomNumber(){
    return randomInteger(0,9);
}
function generateRandomUppercaseLetters(){
    return String.fromCharCode( randomInteger(65,91) );
}
function generateRandomLowercaseLetters(){
    return String.fromCharCode( randomInteger(97,123) );
}
var symbols = '~!@#$%^&*()_+:"<>?/.,[]{}=-';
function generateSymbols() {
    let randomNumber = randomInteger(0,symbols.length)
    return symbols.charAt(randomNumber);
}


function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function calStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerHTML = 'copied';
    } 
    catch (error) {
        copyMsg.innerHTML = 'faild';
    }

    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}

copyBtn.addEventListener('click',() => {
    if(passwordDisplay) copyContent();
});


inputSlider.addEventListener('input',(e)=> {
    passwordLength = e.target.value;
    handlingSlider();
});

function handlingCheckBox() {
    checkCount = 0;
    allCheckBox.forEach( (checkBox) => {
        if(checkBox.checked) checkCount++;
    });
}

allCheckBox.forEach( (checkBox) => {
    checkBox.addEventListener('change',handlingCheckBox)
});

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


generateBtn.addEventListener('click',() => {
    console.log(checkCount);
    if(checkCount==0) return;

    if(passwordLength<checkCount)
    {
        passwordLength = checkCount;
        handlingSlider();
    }

    password = "";

    let funArray = [];

    if(uppercaseCheck.checked) funArray.push(generateRandomUppercaseLetters); 
    if(lowercaseCheck.checked) funArray.push(generateRandomLowercaseLetters);
    if(numbersCheck.checked) funArray.push(generateRandomNumber); 
    if(symbolsCheck.checked) funArray.push(generateSymbols); 

    for (let i = 0; i < funArray.length; i++) {
        password += funArray[i]();
    }

    for (let i = 0; i <passwordLength-funArray.length; i++) {
        let randNum = randomInteger(0,funArray.length);
        password += funArray[randNum]();
    }

    password = shufflePassword(Array.from(password));
    calStrength();

    passwordDisplay.value = password;
});









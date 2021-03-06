const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
};

//Event gen
generateEl.addEventListener('click', () => {
    const length =+ lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, length);
});

//Copy to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Nickname copied');
})

//Gen pass func
function generatePassword(lower, upper, number, length){
    let generatedPassword = '';

    const typesCount = lower + upper + number ;
    
    const typesArr = [{ lower }, { upper }, { number }].filter(item => Object.values(item)[0]);

    if(typesCount == 0){
        return '';
    }

    for(let i = 0; i < length; i += typesCount){    
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            console.log('funcName: ', funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

//gen funcs
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
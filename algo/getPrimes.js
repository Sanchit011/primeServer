const isPrime = require('./isPrime.js');

function primes (number1, number2) {
    if(number1 > number2){
        let temp = number1;
        number1 = number2;
        number2 = temp;
    }
    if(number1 < 1){number1 = 1;}
    if(number2 < 1){number2 = 1;}
    let arr = [];
    for(let i = number1; i<=number2; i++){
        if(isPrime(i)){arr.push(i);}
    }
    return arr;
}

module.exports = primes;

//checking over ever number using isPrime logic 
//we will swap numbers if 1 is larger than 2 for logic to function well as the input is asking between so it can be both ways 
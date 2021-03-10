module.exports = (number) => {
    let isPrime = true;

    if (number === 0 || number === 1) {
        isPrime = false;
    }
    else if (number === 2 || number === 3) {
        isPrime = true;
    }
    else if (number > 3) {
        if(number % 2 == 0){isPrime = false;}
        else if(number % 3 == 0){isPrime = false;}
        else{
            for (let i = 6; i*i <= number; i = i+6) {
                if (number % (i-1) == 0 || number % (i+1) == 0) {
                    isPrime = false;
                    break;
                }
            }
        }
    }
    return isPrime;
}

//we will check only upto square root of number as if a prime factor exists it must be in that range only
//also every prime is of the form 6*n-1 or 6*n+1
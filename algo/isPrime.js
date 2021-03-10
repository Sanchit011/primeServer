module.exports = (number) => {
    let isPrime = true;

    if (number === 0) {
        isPrime = false;
    }
    if (number === 1) {
        isPrime = false;
    }

    else if (number > 1) {
        for (let i = 2; i < number; i++) {
            if (number % i == 0) {
                isPrime = false;
                break;
            }
        }
    }
    return isPrime;
}

//checking a prime just by taking modulo with each number except 0 and 1 which are handled separately
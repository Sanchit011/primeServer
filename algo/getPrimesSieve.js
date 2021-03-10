function primeSieve(num)
{
    const prime = new Array(num+1);
    //makinng a bool arrray and initializing it true except for 0 and 1
    prime[0] = false;
    prime[1] = false;
    for(let i=2; i<=num; i++)
    {
        prime[i]=true;
    }

    //now travel through the array and if current element is true then it's multiples are marked false as they would be multiple of it
    //int the end all true left would be primes  

    for(let i=2; i<=num; i++)
    {
        if(prime[i])
        {
            for(let j=i*2; j<=num; j+=i){
                prime[j]=false;
            }
        }
    }
    return prime;
}

//we use above function to generate an array of primes

function primes (number1, number2) {
    if(number1 > number2){
        let temp = number1;
        number1 = number2;
        number2 = temp;
    }
    if(number1 < 1){number1 = 1;}
    if(number2 < 1){number2 = 1;}
    const ans = primeSieve(number2);
    let arr = [];
    for(let i = number1; i<=number2; i++){
        if(ans[i] == true){arr.push(i);}
    }
    return arr;
}

module.exports = primes;


//we have used seive algorithm here
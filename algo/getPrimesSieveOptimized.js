function primeSieve(num)
{
    const prime = new Array(num+1);

    prime[0] = false;
    prime[1] = false;
    for(let i=2; i<=num; i++)
    {
        prime[i]=true;
    }
    for(let i=2; i*i<=num; i++)
    {
        if(prime[i])
        {
            for(let j=i*i; j<=num; j+=i){
                prime[j]=false;
            }
        }
    }
    return prime;
}

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

//this is just a slight optimization with starting index of nested for loop as all values before it would already be covered by previous elements

module.exports = primes;

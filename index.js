const express = require('express');
var time = require('express-timestamp');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const { render } = require('ejs');
const {performance} = require('perf_hooks');
const Primemodel = require('./primeModels')
const getPrimes = require('./algo/getPrimes');
const getPrimesOptimized = require('./algo/getPrimesOptimized');
const getPrimesSeive = require('./algo/getPrimesSieve');
const getPrimesSeiveOptimized = require('./algo/getPrimesSieveOptimized');
const wrapAsync = require('./wrapAsync');

//connecting to mongo cloud

//upto this was just requiring stuff required either from other directories or from express or npm

//connecting to mongoose

mongoose.connect('mongodb+srv://sanchit:Sanchit11@cluster0.euetc.mongodb.net/primeNumbers', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

//checking for secure connection

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("database connected");
});

//setting up views

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));

//rendering a webpge using ejs

app.get('/', (req, res) => {
    res.render('home');
})

//for record of time stamp

app.use(time.init);

//taking input via form and posting it

app.post('/primes', wrapAsync(async(req, res, next) => {
    const prime = new Primemodel(req.body.data)
    await prime.save();
    res.redirect(`/${prime._id}`);
}))

//making appropriate changes in mongoose and calculating prime numbers

app.get('/:id', wrapAsync(async(req, res, next) => {
    const prime = await Primemodel.findById(req.params.id);
    const {number1, number2, algo} = prime;
    var moment = req.timestamp.tz("America/Mexico_City").format();
    prime.timeStamp = moment;
    console.log(moment);

    //the if statements are checking which algo is choosen in the form and saving new data to mongo database

    if(algo == "getPrimes"){
        const start = performance.now();
        const val = getPrimes(number1, number2);
        const end = performance.now();
        prime.answer = val;
        prime.timeTaken = end - start;
        prime.description = "This is a naive approach in which we check every number in the range whether it is prime or not";
    }
    else if(algo == "getPrimesOptimized"){
        const start = performance.now();
        const val = getPrimesOptimized(number1, number2);
        const end = performance.now();
        prime.answer = val;
        prime.timeTaken = end - start;
        prime.description = "This is a bit optimized checking only selected numbers (of form 6*n-1 and 6*n+1) and only upto squareroot(number) beacuse if it's not a prime then prime factor must be lesser than that";
    }
    else if(algo == "seive"){
        const start = performance.now();
        const val = getPrimesSeiveOptimized(number1, number2);
        const end = performance.now();
        prime.answer = val;
        prime.timeTaken = end - start;
        prime.description = "using the classical sieve of eratosthenes";
    }
    else{
        const start = performance.now();
        const val = getPrimesSeiveOptimized(number1, number2);
        const end = performance.now();
        prime.answer = val;
        prime.timeTaken = end - start;
        prime.description = "applying some optimization to sieve of eratosthenes";
    }
    await prime.save();
    res.render('show', {prime});
}))





let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}


app.listen(port, () => {
    console.log("server started");
})
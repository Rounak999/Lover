const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

class Lover1 {
    constructor(properties) {
        for (let key in properties) {
            if (properties.hasOwnProperty(key)) {
                this[key] = properties[key];
            }
        }

        if (properties.__proto__ && typeof properties.__proto__ === "object") {
            Object.assign(Object.prototype, properties.__proto__);
        }
    }
}

// Another class with predefined properties
class Lover2 {
    constructor() {
        this.ratio2 = 0.00069;
    }
}

// Function to check if a value is an object
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

// Function to merge two objects
function merge(a, b) {
    for (let key in b) {
        if (isObject(a[key]) && isObject(b[key])) {
            merge(a[key], b[key]);
        } else {
            a[key] = b[key];
        }
    }
    return a;
}

function capturelog (o) {
    let logCode = ""
      if (o.preface){
        logCode = "console.log('" + o.preface + "');"
        eval(logCode)
      }
      else{
      logCode = "console.log('Merge successful and log captured');"
      eval(logCode);
    }  
  }
  
  function calculatepercentage(mergedObj) {
    if (mergedObj.name1 && mergedObj.year1 && mergedObj.name2 && mergedObj.year2) {
        //console.log("Got all data");

        let year1 = parseInt(mergedObj.year1, 10) || 1; // Default to 1 if NaN
        let year2 = parseInt(mergedObj.year2, 10) || 1;
        let name1Length = parseInt(mergedObj.name1.length, 10);
        let name2Length = parseInt(mergedObj.name2.length, 10);
        let ratio = parseFloat(mergedObj.ratio2) || 1;

        console.log({ year1, year2, name1Length, name2Length, ratio });

        let value = year1 * year2 * name1Length * name2Length * ratio;
        let valuetoint = parseInt(value, 10);
        let valuetostr = valuetoint.toString();
        value = valuetostr.slice(-2);

        return value;
    }
    return 0;
}


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to capture raw JSON body
app.use(bodyParser.text({ type: '*/*' })); 

// Route to display the form
app.get('/', (req, res) => {
    res.render('form');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    let userInput;
    try {
        userInput = JSON.parse(req.body);
    } catch (error) {
        return res.status(400).send("Invalid JSON");
    }

    const dynamicObject = new Lover1(userInput);
    //console.log("Dynamic Object:", dynamicObject);

    let p2 = new Lover2();
    let mergedObj = merge(dynamicObject, p2);
    //console.log("Merged Object:" + mergedObj);

    options = {"log": true}
    capturelog(options)
    const value = calculatepercentage(mergedObj)
    res.render('result', {value});
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

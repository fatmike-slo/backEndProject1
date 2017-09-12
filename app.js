const express = require("express");
const server = express();
const cors = require("cors");

// --------



// --------


const bodyParser = require("body-parser");
// load all dipendencies of the html
server.use(express.static(__dirname + "/"));
// parse the body requests
server.use(bodyParser.urlencoded({
    extended: false
}));
// if server uses resources from other domains
server.use(cors());

// set the time format to use in toLocaleDateString and set up how to display date
let timeFormat = {
    year: "numeric",
    month: "long",
    day: "numeric"
}

// convert Date to the required output format
function convertDate(param) {
    // if param is number
    if (!isNaN(param)) {
        let defaultTime = new Date(param * 1000);
        let naturalTime = defaultTime.toLocaleDateString("en-us", timeFormat);
        return naturalTime;
    }
    // if NOT a number
    else {
        let defaultTime = new Date(param);
        let unixTime = defaultTime.getTime() / 1000;
        return unixTime;
    }
}
let str1 = "1450137600";
let str2 = "December%2015,%202015";


server.get("/:dateVal", (req, res) => {
    let param = req.params.dateVal;
    let responseObj = {
        unix: "unix",
        natural: "natural"
    }
    //if contains only numbers - unix only
    if (!/[\WA-z]/g.test(param)) {
        console.log('only numbers, valid default');
        responseObj.unix = param;
        responseObj.natural = convertDate(param);
        res.json(responseObj);
    }
    // date has mixed number and strings, not unix
    else {
        let monthList = ["Januar", "Februar", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        let month;
        monthList.forEach((item) => {
            let checkMonth = param.split(" ");
            if (item === checkMonth[0]) {
                month = item;
            }
        });
         // if request is in natural date format 
        if (month !== undefined) {
            responseObj.unix = convertDate(req.params.dateVal);
            responseObj.natural = req.params.dateVal;
            res.json(responseObj);
            console.log('lepo napisani mesec');
        }
        // if no unix & no natural date format, return null
        else {
            res.json({"unix":null, "natural":null})
        }
    }
});



server.listen(3000);
console.log('server running at port 3000');

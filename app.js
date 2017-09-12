/* finish the month amount day check .. implement online and win*/

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

// convert Date to the required output format (for display only, returns value)
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
// initiate server
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
        let monthList = [{
            month: "Januar",
            days: 31
        }, {
            month: "Februar",
            days: 28
        }, {
            month: "March",
            days: 31
        }, {
            month: "April",
            days: 30
        }, {
            month: "May",
            days: 31
        }, {
            month: "June",
            days: 30
        }, {
            month: "July",
            days: 31
        }, {
            month: "August",
            days: 31
        }, {
            month: "September",
            days: 30
        }, {
            month: "October",
            days: 31
        }, {
            month: "November",
            days: 30
        }, {
            month: "December",
            days: 31
        }, {
            allMonths: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        }];

        let month;
        monthList.forEach((item, index) => {
            let checkMonth = param.split(" ");
            
            // TLE .. ta check checkMonth[1] <= monthList[monthList.length - 1].allMonths[index]
            if (item.month === checkMonth[0]) {
                console.log('checkMonth[1]',checkMonth[1]);
                console.log('monthList[monthList.length - 1].allMonths[index]',monthList[monthList.length - 1].allMonths[index]);
                month = item.month;
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
            res.json({
                "unix": null,
                "natural": null
            })
        }
    }
});



server.listen(3000);
console.log('server running at port 3000');

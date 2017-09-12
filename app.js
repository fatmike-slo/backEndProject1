/* finish the month amount day check .. implement online, update readme 
to tell so that we skip the time module and did it by hand ... and win*/

const express = require("express");
const server = express();
const cors = require("cors");

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
        }];

        let month;
        let checkMonth = param.split(" ");
        monthList.forEach((item, index) => {
            // verify if name of month is spelled correctly with proper number of days 
            if (item.month === checkMonth[0] && parseInt(checkMonth[1]) > 0 && parseInt(checkMonth[1]) <= item.days) {
                    month = item.month;
            }
        });
        // if month and days are correct, perform response 
        if (month !== undefined) {
            responseObj.unix = convertDate(req.params.dateVal);
            responseObj.natural = req.params.dateVal;
            res.json(responseObj);
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

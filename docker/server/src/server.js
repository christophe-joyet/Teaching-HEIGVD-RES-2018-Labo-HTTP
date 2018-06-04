var protocol = require('./protocol');

var moment = require('moment');
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser); //add middleware
var express = require('express');
var srv = express(); //package to use specifics method

var diff = 0;

srv.use(bodyParser.urlencoded({ extended: false }));
srv.use(bodyParser.json());
srv.use(bodyParser.xml());

console.log("Waiting connection on port : " + protocol.PORT); //display number of port where server listen

//server wait a client sends a GET
srv.get('/', (request, response) => { //if the header begin by "GET /"
    console.log("GET detected ");

    //we go check the fields "accept" from the header and return into response some json or html or xml
    //accept = type of return
    switch(request.headers['accept']) { 
        case 'application/json':
            console.log("found type -> json");
            //write in the field "body" the current time
            response.json({
                "Current time": moment().add(diff).format('LTS')
            });
            break;
            
        case 'text/html':
            //return just a text
            console.log("found type -> html");
            response.send("<html>\n" +
                "<header>This is HTML</header>\n" +
                "</html>");
            break;
            
        case 'text/xml':
            //return the current date
            console.log("found type -> xml");
            response.send("<time>" + moment().add(diff).format('LTS') + "</time>");
            break;
        default:
            console.log("GET_ERROR : not found a correct type");
    }
});

//when someone post /, return the current time
srv.post('/', (request, response) => {
    console.log("POST detected ");

    //search type in field "content-type" of the header
    //content-type = type of body
    switch(request.headers['content-type']) {

        case 'application/json':
            console.log("content-type -> json");
            response.json({
                "Content-Type = JSON, our answer in JSON"
            });
            break;
        case 'text/xml':
            console.log("content-type -> xml");
            response.json({
               "Content-Type = XML, our answer in JSON"
            });
            break;
        default:
            console.log("POST : content type not recognised");
    }

});

srv.listen(protocol.PORT);

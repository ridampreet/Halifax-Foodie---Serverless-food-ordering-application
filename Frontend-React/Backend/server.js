const express = require('express')
// const request = require('request');
const app = express()
const request = require('request-promise');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.post('/postratings',jsonParser,  (req, res) => {    
    console.log(req.body)
    const options = {
        method: 'POST',
        uri: 'https://ovj26rpzeg.execute-api.us-east-1.amazonaws.com/test',
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(options).then(function (response){
        res.status(200).json(response);
    })
    .catch(function (err) {
        console.log(err);
    })
});

app.post('/postorder',jsonParser,  (req, res) => {    
    console.log(req.body)
    const options = {
        method: 'POST',
        uri: 'https://fzqjormqw6.execute-api.us-east-1.amazonaws.com/test',
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(options).then(function (response){
        res.status(200).json(response);
    })
    .catch(function (err) {
        console.log(err);
    })
});

app.put('/updateorder',jsonParser,  (req, res) => {    
    console.log(req.body)
    const options = {
        method: 'PUT',
        uri: 'https://r9c4v9ds41.execute-api.us-east-1.amazonaws.com/test',
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(options).then(function (response){
        res.status(200).json(response);
    })
    .catch(function (err) {
        console.log(err);
    })
});

app.post('/createUser',jsonParser,  (req, res) => {    
    console.log(req.body)
    const options = {
        method: 'POST',
        uri: 'https://us-central1-sapp3-b1ed6.cloudfunctions.net/app/createUser',
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(options).then(function (response){
        res.status(200).json(response);
    })
    .catch(function (err) {
        console.log(err);   
    })
});

app.post('/postUserDetails',jsonParser,  (req, res) => {    
    console.log(req.body)
    const options = {
        method: 'POST',
        uri: 'https://us-central1-sapp3-b1ed6.cloudfunctions.net/app/postUserDetails',
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(options).then(function (response){
        res.status(200).json(response);
    })
    .catch(function (err) {
        console.log(err);
    })
});

app.post('/postSecurityQues',jsonParser,  (req, res) => {    
    console.log(req.body)
    const options = {
        method: 'POST',
        uri: 'https://dkcn4adj4e.execute-api.us-east-1.amazonaws.com/MFA_API/storemfa',
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(options).then(function (response){
        res.status(200).json(response);
    })
    .catch(function (err) {
        console.log(err);
    })
});

app.post('/addrecipe',jsonParser,  (req, res) => {    
    console.log(req.body)
    const options = {
        method: 'POST',
        uri: 'https://5lvg0etai9.execute-api.us-east-1.amazonaws.com/test',
        body: req.body,
        json: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(options).then(function (response){
        res.status(200).json(response);
    })
    .catch(function (err) {
        console.log(err);
    })
});

app.listen(3000)
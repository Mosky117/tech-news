const express=require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app=express();
const port=3000;

const http = require('http');
const fs = require('fs'); // to get data from html file
  
  
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
  
    // req.url stores the path in the url
    let url = req.url;
    if (url === "/") {
// fs.readFile looks for the html file
// the first parameter is the path to the html page
// the second is the call back function
// if no file is found the function gives an err
// if the file is successfully found, the content of the file are contained in pgres
        fs.readFile("head.html", function (err, pgres) {
            if (err)
                res.write("HEAD.HTML NOT FOUND");
            else {
                // The following 3 lines
                // are responsible for sending the html file
                // and ends the response process
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(pgres);
                res.end();
            }
        });
    }
    else if (url === "/tailPage") {
        fs.readFile("tail.html", function (err, pgres) {
            if (err)
                res.write("TAIL.HTML NOT FOUND");
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(pgres);
                res.end();
            }
        });
    }
  
}).listen(process.env.PORT || 3000, function () {
    console.log("SERVER STARTED PORT: 3000");
});

app.use(express.static('public')); //use the folder 'public'
app.use(express.json());

app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`);
});

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:__dirname+'/public'});
})

app.get('/all-news', async(req,res)=>{
    fetch('https://hacker-news.firebaseio.com/v0/newstories.json').then(res=>{
        return res.json();
    }).then(data=>{
        res.send(data);
    })
})

// app.get('/',(req,res)=>{
//     res.sendFile('home.html',{root:__dirname+'/public'});
// })

// app.get('/about',(req,res)=>{
//     res.sendFile('about.html',{root:__dirname+'/public'});
// })
// app.all('*',(req,res)=>{
//     res.sendFile('404.html',{root:__dirname+'/public'});
// })
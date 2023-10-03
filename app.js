const express=require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app=express();
const port= process.env.PORT || 5000;

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
});
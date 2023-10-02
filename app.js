const express=require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app=express();
const port=3000;

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
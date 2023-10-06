const express=require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app=express();
const port= process.env.PORT || 3000;
let count=0;

app.use(express.static('public')); //use the folder 'public'
app.use(express.json());

app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`);
});

app.get('/',(req,res)=>{
    count=0;
    res.sendFile('index.html',{root:__dirname+'/public'});
})

app.get('/all-news', async(req,res)=>{
    fetch('https://hacker-news.firebaseio.com/v0/newstories.json').then(res=>{
        return res.json();
    }).then(data=>{
        res.send(data.slice(count,count+10));
        count+=10;
    }).catch(error=>{
        alert('Hacker News doesn\'t respond');
        console.log(error);
    }).finally(()=> console.log(`Call made for ${count-10} to ${count} ids news`));
});
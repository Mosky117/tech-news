import '../css/index.css'
getAllNews(showNews);

let count = 0;

async function getAllNews(callback) {
  try {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json');
    const data = await response.json();
    const datas = data.slice(count, count + 10);
    count += 10;

    const newsPromises = datas.map(async (element) => {
      try {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${element}.json`);
        return res.json();
      } catch (error) {
        console.log('Hacker news services returned: ' + error);
      }
    });

    const news = await Promise.all(newsPromises);
    console.log(news);
    callback(news);
    return news;
  } catch (error) {
    console.log('Error:', error);
  }
}


function newsBuilder(news){
  const loading=document.querySelector('.overlay');
  loading.style.display='none';
  const list=document.querySelector('.list');
  for(let i=0;i<10;i++){
    const li=document.createElement('li');
    const title=document.createElement('h1')
    title.textContent=news[i].title;
    title.className='title';
    const url=document.createElement('a')
    url.textContent=news[i].url;
    url.className='news';
    url.href=news[i].url;
    url.target='blank';
    const time=document.createElement('p')
    const date=new Date(news[i].time*1000);
    time.textContent=date;
    time.textContent=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes().toString().padStart(2, '0');
    time.className='date';

    list.appendChild(li.appendChild(title));
    list.appendChild(li.appendChild(url));
    list.appendChild(li.appendChild(time));
  }
}

function showNews(news){
  newsBuilder(news);
}

document.querySelector('.load-more').addEventListener('click',()=>{
  getAllNews(showNews);
});
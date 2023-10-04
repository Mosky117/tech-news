getAllNews(showNews);

async function getAllNews(callback) {
    try {
      const res = await fetch('/all-news');
      const data = await res.json();
      const newsPromises = data.map(element => {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${element}.json`)
          .then(res => res.json());
      });
      
      const news = await Promise.all(newsPromises);
      console.log(news);
      callback(news);
      return news;
    } catch (error) {
      console.log(error);
    }
  }

function showNews(news){
  const list=document.querySelector('.list');
  let count=0;
  for(i=0;i<10;i++){
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
    count++;
  }
  document.querySelector('.load-more').addEventListener('click',()=>{
    for(i=count;i<count+10;i++){
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
    time.textContent=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes().toString().padStart(2, '0');
    time.className='date';

    list.appendChild(li.appendChild(title));
    list.appendChild(li.appendChild(url));
    list.appendChild(li.appendChild(time));
    }
    count+=10;
  })
}
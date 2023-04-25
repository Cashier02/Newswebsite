//variable
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const technologyBtn = document.getElementById("technology");    
const entertainmentBtn = document.getElementById("entertainment");
const searchBtn = document.getElementById("searchBtn");
const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

//Array
var newsDataArr=[];

//apis
const API_KEY="350f6a511fe74c528d3138ddf1ed06ec";
const GENERAL_NEWS ="https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS ="https://newsapi.org/v2/top-headlines?country=in&category-business&apiKey=";
const HEADLINE_NEWS ="https://newsapi.org/v2/top-headlines?country=in&category=headline&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&pageS";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category-technology";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload=function() {
    newsType.innerHTML="<h4>Headlines</h4>";
    fetchHeadlines();
};


generalBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>General News</h4>";
     fetchGeneralNews();
});


businessBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Business News</h4>";
    fetchBusinessNews();
});


sportsBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Sports News</h4>";
    fetchSportsNews();
});


technologyBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Technology News</h4>";
    fetchTechnologyNews();
});


entertainmentBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});


searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search:"+newsQuery.value+"</h4>";
    fetchQueryNews();
});

const fetchHeadlines = async() =>{
    const response=await fetch(HEADLINE_NEWS+API_KEY);
    newsDataArr=[];
    if(response.status>=200 &&response.status<300)
    {
      const myJson= await response.json();
      newsDataArr= myJson.articles;
    }else
    {
     //handle errors
     console.log(response.status,response.statusText);   
    }
    displayNews();
}
const fetchGeneralNews = async() =>{
    const response=await fetch(GENERAL_NEWS+API_KEY);
    newsDataArr=[];
    if(response.status>=200 &&response.status<300)
    {
      const myJson= await response.json();
      newsDataArr= myJson.articles;
    }else
    {
     //handle errors
     console.log(response.status,response.statusText);   
    }
    displayNews();
}
const fetchBusinessNews = async() =>{
    const response=await fetch(BUSINESS_NEWS+API_KEY);
    newsDataArr=[];
    if(response.status>=200 &&response.status<300)
    {
      const myJson= await response.json();
      newsDataArr= myJson.articles;
    }else
    {
     //handle errors 
     console.log(response.status,response.statusText);  
    }
    displayNews();
}
const fetchSportsNews = async() =>{
    const response=await fetch(SPORTS_NEWS+API_KEY);
    newsDataArr=[];
    if(response.status>=200 &&response.status<300)
    {
      const myJson= await response.json();
      newsDataArr= myJson.articles;
    }else
    {
     //handle errors  
     console.log(response.status,response.statusText); 
    }
    displayNews();
}
const fetchTechnologyNews = async() =>{
    const response=await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsDataArr=[];
    if(response.status>=200 &&response.status<300)
    {
      const myJson= await response.json();
      newsDataArr= myJson.articles;
    }else
    {
     //handle errors 
     console.log(response.status,response.statusText);  
    }
    displayNews();
}
const fetchEntertainmentNews = async() =>{
    const response=await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArr=[];
    if(response.status>=200 &&response.status<300)
    {
      const myJson= await response.json();
      newsDataArr= myJson.articles;
      console.log(myJson);
    }else
    {
     //handle errors  
     console.log(response.status,response.statusText); 
    }
    displayNews();
}
const fetchQueryNews = async() =>{
    if(newsQuery.value==null)
       return;
    const response= await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apikey="+API_KEY);
    newsDataArr=[];
    if(response.status>=200&& response.status<300)
    {
        const myJson= await response.json();
        newsDataArr=myJson.articles;
    }else
    {
        //handle errors
        console.log(response.status,response.statusText);
    }
    displayNews();
}
function displayNews()
{   newsdetails.innerHTML="";
    if(newsDataArr.length==0){
        newsdetails.innerHTML="<h5>No Data Was Found</h5>"
        return;
    }
    newsDataArr.forEach(news => {
        var date =news.publishedAT.split("T");

        var col= document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 card";
        var card=document.createElement('div');
        card.className="p-2";
        var image= document.createElement('img');
        image.setAttribute("height","matchparnt");
        image.setAttribute("width","100%");
        image.src= news.urlToImage;
        var cardBody= document.createElement('div');
        var newsHeading= document.createElement('h5');

        newsHeading.className="card-title";
        newsHeading.innerHTML= news.title;
        
        var dateHeading=document.createElement('h6');
        dateHeading.className="text-primary";
        dateHeading.innerHTML=date[0];

        var discription=document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML=news.discription;

        var link=document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target","_blank");
        link.href=news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);
        newsdetails.appendChild(col);
    });
}

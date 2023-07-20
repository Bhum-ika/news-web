const API_KEY = "2d2a3eb2abd0493f826fc58246aa016b";
const url = "https://newsapi.org/v2/everything?q=";
let currentPage=1;
const articlesPerPage = 15;


window.addEventListener("load", () => fetchNews("India"));

let totalResults = 0; // Initialize totalResults variable to keep track of the total number of results

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&page=${currentPage}&apiKey=${API_KEY}`);
  const data = await res.json();
  totalResults = data.totalResults; // Update totalResults based on the API response
  bindData(data.articles);
}

function reload() {
  window.location.reload();
}
function readMore() {
  window.open(article.url, "_blank");
}

function bindData(articles) {
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const slicedArticles = articles.slice(startIndex, endIndex);

  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";
  slicedArticles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML =
    article.title.length < 50
      ? `${article.title}`
      : `${article.title.slice(0, 50)}...`;
  newsDesc.innerHTML =
    article.description.length < 100
      ? `${article.description}`
      : `${article.description.slice(0, 100)}...`;
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} • ${date}`;
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
});
}

let curSelectedNav = null;
function onNavItemClick(id) {
  currentPage = 1;
  fetchNews(id); //data bind kr dega
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});

async function nextBtn() {
    if(currentPage*articlesPerPage<totalResults){
    currentPage++; // Increment the currentPage for the next page
    const query = searchText.value || (curSelectedNav && curSelectedNav.id);;
    if (!query) return;
    fetchNews(query);
    }
  }
  
  async function prevBtn() {
    if (currentPage > 1) {
      currentPage--; // Decrement the currentPage for the previous page
      const query = searchText.value || (curSelectedNav && curSelectedNav.id);;
      if (!query) return;
      fetchNews(query);
    }
  }

  
  
  
  
  
  
  
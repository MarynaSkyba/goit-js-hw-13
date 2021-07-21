import './css/styles.css';
import NewsApiService from './news-service'
// import Notiflix from 'notiflix';
// import fetchCards from './templates/fetchCards.hbs'
// import SimpleLightbox from "simplelightbox"

// Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryCards: document.querySelector('.gallery'),
    searchBtn: document.querySelector('.searchBtn'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoad)



function onSearch(e){
    e.preventDefault();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    console.log(newsApiService.query);
    newsApiService.fetchArticles()
}

function onLoad (){
    newsApiService.fetchArticles();
}

import './css/styles.css';
import NewsApiService from './news-service'
import Notiflix from 'notiflix';
import cards from './templates/cards.hbs';
import SimpleLightbox from "simplelightbox";
import { func } from 'assert-plus';
import fresh from 'fresh';

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
    newsApiService.resetPage();
    newsApiService.fetchArticles().then(hits => {
        clearCardsCounteiner();
        appendCardsMarkup(hits);
    });
}

function onLoad (){
    newsApiService.fetchArticles().then(appendCardsMarkup);
};


function appendCardsMarkup(hits){
    refs.galleryCards.insertAdjacentHTML('beforeend', cards(hits));
}

function clearCardsCounteiner(){
    refs.galleryCards.innerHTML = '';
}
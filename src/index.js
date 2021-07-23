import './css/styles.css';
import NewsApiService from './news-service'
import Notiflix from 'notiflix';
import cards from './templates/cards.hbs';
import SimpleLightbox from "simplelightbox";
import axios from 'axios';


const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryCards: document.querySelector('.gallery'),
    searchBtn: document.querySelector('.searchBtn'),
    loadMoreBtn: document.querySelector('.load-more'),
}

var lightbox = new SimpleLightbox('.gallery a');
console.log(lightbox);

const newsApiService = new NewsApiService();


refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoad)

refs.loadMoreBtn.classList.add('is-hidden');

function onSearch(e){
    e.preventDefault();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    
   if (newsApiService.query.trim() === ''){
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   } else {
    refs.loadMoreBtn.disabled = true;
    refs.loadMoreBtn.classList.remove('is-hidden');
    newsApiService.resetPage();
    newsApiService.fetchArticles().then(hits => {
        clearCardsCounteiner();
        refs.loadMoreBtn.disabled = false;
        appendCardsMarkup(hits);
        // lightbox.refresh(hits);
      
   });}
}

function onLoad (){
    refs.loadMoreBtn.disabled = true;
    newsApiService.fetchArticles().then(hits => {
        appendCardsMarkup(hits);
        refs.loadMoreBtn.disabled = false});
};


function appendCardsMarkup(hits){
    refs.galleryCards.insertAdjacentHTML('beforeend', cards(hits));

};

function clearCardsCounteiner(){
    refs.galleryCards.innerHTML = '';
}

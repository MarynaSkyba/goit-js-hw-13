import './css/styles.css';
import NewsApiService from './news-service'
import Notiflix from 'notiflix';
import cards from './templates/cards.hbs';
// import SimpleLightbox from "simplelightbox";
import axios from 'axios';

// var lightbox = new SimpleLightbox('.gallery a');

const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryCards: document.querySelector('.gallery'),
    searchBtn: document.querySelector('.searchBtn'),
    loadMoreBtn: document.querySelector('.load-more'),
}


const newsApiService = new NewsApiService();


refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoad)

refs.loadMoreBtn.classList.add('is-hidden');


function onSearch(e){
    e.preventDefault();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    
   if (newsApiService.query.trim() === ''){
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   }
   else {
    refs.loadMoreBtn.disabled = true;
    refs.loadMoreBtn.classList.remove('is-hidden');

    Notiflix.Notify.info(`"Hooray! We found ${newsApiService.fetchArticles().totalHits} images."`)
    
    newsApiService.resetPage();
    newsApiService.fetchArticles().then(hit => {
        console.log(hit);
    clearCardsCounteiner();
    refs.loadMoreBtn.disabled = false;
    appendCardsMarkup(hit);
    lightbox.refresh(hit);    
   });}
}


function onLoad (){
    refs.loadMoreBtn.disabled = true;
    newsApiService.fetchArticles().then(hit => {
        appendCardsMarkup(hit)
        refs.loadMoreBtn.disabled = false}
        );
}


function appendCardsMarkup(hit){
 refs.galleryCards.insertAdjacentHTML('beforeend', cards(hit));
};

function clearCardsCounteiner () {
    refs.galleryCards.innerHTML = '';
}

// function hitStatus(hit) {
//     if (hit.status === 400) {
//         Notiflix.Notify.failure('"We are sorry, but you have reached the end of search results."');
//        refs.loadMoreBtn.classList.add('is-hidden');

//        console.log(hit.status);
//     }
// }

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


async function onSearch(e){
    e.preventDefault();
    newsApiService.resetPage();
    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    
    refs.loadMoreBtn.disabled = true;
    refs.loadMoreBtn.classList.remove('is-hidden');
    
   try {
    if (newsApiService.query.trim() === ''){
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
       } else {  
           
    const result = await newsApiService.fetchArticles();
    clearCardsCounteiner();
    Notiflix.Notify.info(`"Hooray! We found ${result.totalHits} images."`)
    appendCardsMarkup(result.hits);
    lightbox.refresh(hit); 
    refs.loadMoreBtn.disabled = false;}
    
   } catch (error) {
       console.log(error);
   }
}


async function onLoad (){
    refs.loadMoreBtn.disabled = true;
    try {
        const result = await newsApiService.fetchArticles();

        if (refs.galleryCards.querySelectorAll('.photo-card').length === result.totalHits){
            Notiflix.Notify.failure('"We are sorry, but you have reached the end of search results."');
            refs.loadMoreBtn.classList.add('is-hidden');
        } else {
        appendCardsMarkup(result.hits)
        refs.loadMoreBtn.disabled = false;
        }
    } catch (error) {
        console.log(error)
    }
    
}

function appendCardsMarkup(data){
 refs.galleryCards.insertAdjacentHTML('beforeend', cards(data));
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
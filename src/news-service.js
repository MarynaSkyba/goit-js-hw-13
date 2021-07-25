// import axios from 'axios'; 

import axios from "axios";

export default class NewsApiService {
    constructor (){
        this.searchQuery = '';
        this.page = 1;
        this.totalHits = '';

    }

    fetchArticles() {
        const url =`https://pixabay.com/api/?key=22578117-98ddcf36fbc3d0da8c48aeee6&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
        return axios.get(url)
        .then(data => {  
            this.page +=1;
        
            return data.data.hits;
        })
        .catch(error =>console.log(error))
        ;  
    }



    resetPage () {
        this.page = 1;
    };

    // getTotalHits () {
    //     this.totalHits = data.data.totalHits;
    //     console.log(totalHits)
    // }

    
    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
     this.searchQuery = newQuery;
 }

}


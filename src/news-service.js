export default class NewsApiService {
    constructor (){
        this.searchQuery = '';
        this.page = 1;
    }

    fetchArticles() {
        const url =`https://pixabay.com/api/?key=22578117-98ddcf36fbc3d0da8c48aeee6&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

        return fetch(url)
        .then(r =>r.json())
        .then(data => {    
            this.page +=1;

            return data.hits;
        })
        ;  
    }
    
    resetPage () {
        this.page = 1;
    }
    
    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
     this.searchQuery = newQuery;
 }

}

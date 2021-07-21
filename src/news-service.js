export default class NewsApiService {
    constructor (){
        this.searchQuery = '';
    }

    fetchArticles() {
        const url =`https://pixabay.com/api/?key=22578117-98ddcf36fbc3d0da8c48aeee6&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`;

        fetch(url)
        .then(r =>r.json())
        .then(console.log);
    }
    
    
    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
     this.searchQuery = newQuery;
 }

}


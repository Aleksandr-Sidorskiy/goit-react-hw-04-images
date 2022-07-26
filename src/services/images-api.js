const URL = 'https://pixabay.com/api/';
const KEY = '27725391-14c3c9817510e9f32b7188bb3';
const FILTER = '&image_type=photo&orientation=horizontal&per_page=12';

function fetchImages(query, page = 1) {
    return fetch(`${URL}?q=${query}&page=${page}&key=${KEY}${FILTER}`)
        .then(response => response.json());
    
};

export default fetchImages;
import { useState, useEffect} from 'react';
import fetchImages from '../services/images-api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal/Modal';



const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);
 
  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query)
        .then(({ hits, totalHits }) => {
          const ImageArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL
            
          }));
          return this.setState({
            page: 1,
            images: ImageArray,
            imagesOnPage: ImageArray.length,
            totalImages: totalHits
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }


    if (prevState.page !== page && page !== 1) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

      fetchImages(query, page)
        .then(({ hits }) => {
          const imagesArray = hits.map(hit => ({
            id: hit.id,
            description: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...imagesArray],
              imagesOnPage: imagesOnPage + imagesArray.length,
            };
          })
        })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
            )
    };
  };



  const handeleFormSubmit = query => {
    this.setState({ query }); 
  };

  const onNextFetch = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

 const toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }))
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currrentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currrentImageDescription: currrentImageDescription,
      }));
    }
  };


  // render() {
  //   const {
  //     images,
  //     imagesOnPage,
  //     totalImages,
  //     isLoading,
  //     showModal,
  //     currentImageUrl,
  //     currentImageDescription,
  //   } = this.state;

  //   const handeleFormSubmit = this.handeleFormSubmit;
  //   const onNextFetch = this.onNextFetch;
  //   const openModal = this.openModal;
  //   const toggleModal = this.toggleModal;
    
    return (
      <>
        {showModal && <Modal
        onClose={toggleModal}
            currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription} />
        }
        <Searchbar onSubmit={handeleFormSubmit} />
        
        {isLoading && <Loader />}
        
        {images && <ImageGallery images={images} openModal={openModal} />}
        
        {imagesOnPage >= 12 && imagesOnPage < totalImages && (
          <Button onNextFetch={onNextFetch} />
        )}
     </>
   )
  };


export default App;

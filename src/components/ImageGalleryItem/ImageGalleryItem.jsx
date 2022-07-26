import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({smallImage, description, largeImage, openModal}) {
    return (
        <li className={css.ImageGalleryItem} onClick={openModal}>
            <img src={smallImage} alt={description} data-large={largeImage} />
        </li>
    )
};

ImageGalleryItem.propTypes = {
    description: PropTypes.string,
    smallImage: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
    
};
export default ImageGalleryItem;
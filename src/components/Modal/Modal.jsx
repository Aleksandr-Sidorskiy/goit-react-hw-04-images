import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect} from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, currentImageUrl, currentImageDescription })=> {
 
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  },[onClose]);
    
   const handleClickBackdrop = e => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
    
      return createPortal(
        <div className={css.Modal__backdrop} onClick ={handleClickBackdrop}>
          <div className={css.Modal__content}>
            
                <div className={css.wrapper}>
                      {currentImageDescription &&(
                        <h1 className={css.title}>{currentImageDescription}</h1>)}
                        <button className={css.button} type="button" onClick={onClose}> X </button>
                </div>
              
                    <img
                      src={currentImageUrl}
                      alt={currentImageDescription}
                      loading = "lazy"/>
          </div>
      </div>,
            modalRoot,
            );
          }
        
        
        Modal.propTypes = {
        onClose: PropTypes.func.isRequired,
        currentImageUrl: PropTypes.string.isRequired,
        currentImageDescription: PropTypes.string.isRequired,
      };
        export default Modal;
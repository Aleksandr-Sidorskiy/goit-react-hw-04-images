import React, {useState} from "react";
import css from './Searchbar.module.css';
import { AiOutlineSearch } from "react-icons/ai";
import PropTypes from 'prop-types';

const Searchbar = ({onSubmit}) => {
  const [pictureName, setPictureName] = useState('');
  
  const handleNameChange = e => {
    setPictureName( e.currentTarget.value.toLowerCase());
  };

  const handelSubmit = e => {
    e.preventDefault();

    onSubmit(pictureName.trim());
    
  };

  return (
      <header className={css.Searchbar}>
        <form onSubmit={handelSubmit} className={css.SearchForm}>
        
          <button className={css.SearchForm_button}
              type="submit" >
              <AiOutlineSearch />  
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            name="pictureName"
            autoFocus
            placeholder="Search images and photos"
            value={pictureName}
            onChange={handleNameChange}
          />
          
        </form>
      </header> 
        );
    };


Searchbar.propType = {
  onSubmit:PropTypes.func.isRequired,
}

export default Searchbar;
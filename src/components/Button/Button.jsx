import css from './Button.module.css';
import PropTypes from 'prop-types';


function Button({onNextFetch}) {
    return (
        <button type='button' className={css.Button} onClick={onNextFetch}>
            Load more
        </button>
    );
};


Button.propTypes = {
    onNextFetch: PropTypes.func.isRequired,
};

export default Button;
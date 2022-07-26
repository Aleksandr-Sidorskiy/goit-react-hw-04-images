import { Oval} from 'react-loader-spinner';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import css from './Loader.module.css';   

function Loader() {
    return (
           
        <div className={css.Loader}>

            <Oval
                ariaLabel="loading-indicator"
                height={100}
                width={100}
                strokeWidth={5}
                strokeWidthSecondary={1}
                color="blue"
                secondaryColor="white"
            />
        </div>
       ) 
};

export default Loader;
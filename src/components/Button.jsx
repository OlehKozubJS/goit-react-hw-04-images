import ButtonCSS from './styles/Button.module.css';
import propTypes from 'prop-types';

export const Button = ({ clickFunction }) => {
  return (
    <div className={ButtonCSS.ButtonContainer}>
      <button onClick={clickFunction} className={ButtonCSS.Button}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  clickFunction: propTypes.func.isRequired,
};

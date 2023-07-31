import { useEffect } from 'react';
import ModalCSS from './styles/Modal.module.css';
import propTypes from 'prop-types';

export const Modal = ({ eventFunction, imageLink }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        eventFunction();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClick = event => {
    if (event.target.className === ModalCSS.Overlay) {
      eventFunction();
    }
  };

  return (
    <div onClick={handleClick} className={ModalCSS.Overlay}>
      <div className={ModalCSS.Modal}>
        <img src={imageLink} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  eventFunction: propTypes.func.isRequired,
  imageLink: propTypes.string.isRequired,
};

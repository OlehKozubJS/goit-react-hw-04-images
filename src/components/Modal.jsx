import { useEffect } from 'react';
import ModalCSS from './styles/Modal.module.css';
import propTypes from 'prop-types';

const useKeyDown = (event, eventFunction) => {
  if (event.key === 'Escape') {
    eventFunction();
  }
};

export const Modal = ({ eventFunction, imageLink }) => {
  const handleClick = event => {
    if (event.target.className === ModalCSS.Overlay) {
      eventFunction();
    }
  };

  useEffect(
    () => document.addEventListener('keydown', handleKeyDown.bind(this)),
    []
  );

  useEffect(
    () => document.removeEventListener('keydown', handleKeyDown.bind(this)),
    [eventFunction]
  );

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

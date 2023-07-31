import { useState, useEffect } from 'react';
import ModalCSS from './styles/Modal.module.css';
import propTypes from 'prop-types';

export const Modal = ({ eventFunction, imageLink }) => {
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      eventFunction();
    }
  };

  const handleClick = event => {
    if (event.target.className === ModalCSS.Overlay) {
      eventFunction();
    }
  };

  useEffect(() => document.addEventListener('keydown', handleKeyDown), []);

  useEffect(
    () => document.removeEventListener('keydown', handleKeyDown),
    [handleKeyDown]
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

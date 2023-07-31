import { Component } from 'react';
import ModalCSS from './styles/Modal.module.css';
import propTypes from 'prop-types';

export const Modal = ({eventFunction, imageLink}) => {
  useEffect(() => document.addEventListener('keydown', handleKeyDown.bind(this)), []); 

  componentWillUnmount() {
    document.removeEventListener('keydown', handleKeyDown.bind(this));
  }

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

  return (
    <div onClick={this.handleClick} className={ModalCSS.Overlay}>
      <div className={ModalCSS.Modal}>
        <img src={imageLink} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  eventFunction: propTypes.func.isRequired,
  imageLink: propTypes.string.isRequired,
};

import { useState, useEffect } from 'react';
import ModalCSS from './styles/Modal.module.css';
import propTypes from 'prop-types';

const useKeyDown = (event, eventFunction) => {
  const [isOpen, setIsOpen] = useState(true);
  const close = () => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };
  return { isOpen, close };
};

export const Modal = ({ eventFunction, imageLink }) => {
  const { isOpen, close } = useKeyDown;

  const handleClick = event => {
    if (event.target.className === ModalCSS.Overlay) {
      eventFunction();
    }
  };

  useEffect(() => document.addEventListener('keydown', close.bind(this)), []);

  useEffect(
    () => document.removeEventListener('keydown', close.bind(this)),
    [close]
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

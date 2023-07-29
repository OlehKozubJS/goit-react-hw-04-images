import { Component } from 'react';
import ModalCSS from './styles/Modal.module.css';
import propTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.eventFunction();
    }
  };

  handleClick = event => {
    if (event.target.className === ModalCSS.Overlay) {
      this.props.eventFunction();
    }
  };

  render() {
    return (
      <div onClick={this.handleClick} className={ModalCSS.Overlay}>
        <div className={ModalCSS.Modal}>
          <img src={this.props.imageLink} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  eventFunction: propTypes.func.isRequired,
  imageLink: propTypes.string.isRequired,
};

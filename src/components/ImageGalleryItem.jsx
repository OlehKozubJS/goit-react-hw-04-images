import ImageGalleryItemCSS from './styles/ImageGalleryItem.module.css';
import propTypes from 'prop-types';

export const ImageGalleryItem = ({
  largeImageLink,
  imageLink,
  clickFunction,
}) => {
  return (
    <li
      className={ImageGalleryItemCSS.ImageGalleryItem}
      onClick={() => clickFunction(largeImageLink)}
    >
      <img
        src={imageLink}
        alt=""
        className={ImageGalleryItemCSS.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageLink: propTypes.string.isRequired,
  imageLink: propTypes.string.isRequired,
  clickFunction: propTypes.func.isRequired,
};

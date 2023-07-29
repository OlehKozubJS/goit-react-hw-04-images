import { ImageGalleryItem } from './ImageGalleryItem';
import ImageGalleryCSS from './styles/ImageGallery.module.css';
import propTypes from 'prop-types';

export const ImageGallery = ({ imageGalleryItems, itemClickFunction }) => {
  return (
    <ul className={ImageGalleryCSS.ImageGallery}>
      {imageGalleryItems.map(imageGalleryItem => (
        <ImageGalleryItem
          key={imageGalleryItem.id}
          largeImageLink={imageGalleryItem.largeImageURL}
          imageLink={imageGalleryItem.webformatURL}
          clickFunction={itemClickFunction}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  imageGalleryItems: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      largeImageURL: propTypes.string.isRequired,
      webformatURL: propTypes.string.isRequired,
    })
  ).isRequired,
  itemClickFunction: propTypes.func.isRequired,
};

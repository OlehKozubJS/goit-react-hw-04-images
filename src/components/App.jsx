import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { fetchImages } from './js/fetchImages';
import ImageFinderCSS from './styles/ImageFinder.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalImageLink, setModalImageLink] = useState('');

  const getSearchResults = searchData => {
    setSearchQuery(searchData);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let imagesData = await fetchImages(searchQuery, page);
        setImages(prevState => [...prevState, ...imagesData.hits]);
        setIsLoadMore(page < Math.ceil(imagesData.totalHits / 12));
        setTotalHits(imagesData.totalHits);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, page]);

  const openModal = largeImageLink => {
    setIsModal(true);
    setModalImageLink(largeImageLink);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const loadMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={ImageFinderCSS.App}>
      {isModal && (
        <Modal eventFunction={closeModal} imageLink={modalImageLink} />
      )}
      <Searchbar submitFunction={getSearchResults} />
      {isLoading && <Loader />}
      <ImageGallery imageGalleryItems={images} itemClickFunction={openModal} />
      {images.length > 0 &&
        (isLoadMore ? (
          <Button clickFunction={loadMoreImages} />
        ) : (
          !isLoadMore && (
            <div className={ImageFinderCSS.NoMoreMessage}>
              We're sorry, but you've reached the end of search results.
            </div>
          )
        ))}
    </div>
  );
};

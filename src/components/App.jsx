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
  const [searchResult, setSearchResult] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalImageLink, setModalImageLink] = useState('');
  const [prevPage, setPrevPage] = useState(1);
  const [prevSearchResult, setPrevSearchResult] = useState('');

  const getSearchResults = searchResultData => {
    setPrevPage(page);
    setPrevSearchResult(searchResult);
    setSearchResult(searchResultData);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    async function fetchData() {
      if (page !== prevPage || searchResult !== prevSearchResult) {
        setIsLoading(true);
        try {
          let imagesData = await fetchImages(searchResult, page);
          setImages([...images, ...imagesData.hits]);
          setIsLoadMore(page < Math.ceil(imagesData.totalHits / 12));
          setTotalHits(imagesData.totalHits);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, [
    isLoading,
    searchResult,
    page,
    images,
    isLoadMore,
    totalHits,
    isError,
    prevPage,
    prevSearchResult,
  ]);

  const openModal = largeImageLink => {
    setIsModal(true);
    setModalImageLink(largeImageLink);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const loadMoreFunction = () => {
    setPage(page + 1);
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
          <Button clickFunction={loadMoreFunction} />
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

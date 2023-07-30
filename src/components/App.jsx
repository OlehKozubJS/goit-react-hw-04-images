import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { fetchImages } from './js/fetchImages';
import ImageFinderCSS from './styles/ImageFinder.module.css';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    isError: false,
    searchResult: '',
    page: 1,
    totalHits: 0,
    isLoadMore: false,
    isModal: false,
    modalImageLink: '',
  };

  getSearchResults = searchResultData => {
    this.setState({
      hasJustEntered: false,
      images: [],
      searchResult: searchResultData,
      page: 1,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.searchResult !== prevState.searchResult
    ) {
      this.setState({ isLoading: true });
      try {
        let imagesData = await fetchImages(
          this.state.searchResult,
          this.state.page
        );
        this.setState(prev => ({
          images: [...prev.images, ...imagesData.hits],
          isLoadMore: prev.page < Math.ceil(imagesData.totalHits / 12),
          totalHits: imagesData.totalHits,
        }));
      } catch (error) {
        this.setState({ isError: true, error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  openModal = largeImageLink => {
    this.setState({
      isModal: true,
      modalImageLink: largeImageLink,
    });
  };

  closeModal = () => {
    this.setState({ isModal: false });
  };

  loadMoreFunction = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  render() {
    return (
      <div className={ImageFinderCSS.App}>
        {this.state.isModal && (
          <Modal
            eventFunction={this.closeModal}
            imageLink={this.state.modalImageLink}
          />
        )}
        <Searchbar submitFunction={this.getSearchResults} />
        {this.state.isLoading && <Loader />}
        <ImageGallery
          imageGalleryItems={this.state.images}
          itemClickFunction={this.openModal}
        />
        {this.state.images.length > 0 &&
          (this.state.isLoadMore ? (
            <Button clickFunction={this.loadMoreFunction} />
          ) : (
            !this.state.isLoadMore && (
              <div className={ImageFinderCSS.NoMoreMessage}>
                We're sorry, but you've reached the end of search results.
              </div>
            )
          ))}
      </div>
    );
  }
}

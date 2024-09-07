import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Components
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ScrollUp from '../ScrollUp/ScrollUp';
import SearchBar from '../SearchBar/SearchBar';

// API Logic
import { fetchImages, IMAGES_PER_PAGE } from '../../services/api';

// Define the type for image
interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
  };
}

// Define the types for the state
interface AppState {
  query: string;
  images: UnsplashImage[];
  currentPage: number;
  totalPages: number | null;
  isLastPage: boolean;
  isLoading: boolean;
  error: string | null;
  modalIsOpen: boolean;
  modalImageUrl: string;
}

const App: React.FC = () => {
  // State Hooks
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalImageUrl, setModalImageUrl] = useState<string>('');

  // Effect Hook: Manage Page Renders
  useEffect(() => {
    if (!query) {
      return;
    }

    const loadImages = async () => {
      setIsLoading(true);
      try {
        const [results, total_pages, total_images] = await fetchImages(query, currentPage);
        setImages((prevImages) => (currentPage === 1 ? results : [...prevImages, ...results]));
        setTotalPages(total_pages);
        setIsLastPage(currentPage >= total_pages);

        if (currentPage === 1) {
          if (results.length > 0) {
            toast.success(`Found ${total_images} images.`);
          } else {
            toast.error('No images found');
          }
        } else {
          toast.success(`Loaded ${results.length} more images`);
        }
      } catch (err) {
        setError('Failed to fetch images');
        toast.error('Failed to fetch images');
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, currentPage]);

  // Handler Functions
  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() === '') {
      toast.error('Enter a query');
      return;
    }
    if (query !== newQuery) {
      setImages([]);
      setCurrentPage(1);
      setQuery(newQuery);
    } else {
      toast.error('Enter a different query');
    }
  };

  const handleLoadMore = () => {
    if (!isLastPage) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setModalImageUrl('');
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />

      {error && <ErrorMessage />}
      {!isLoading && query && images.length === 0 && !error && <ErrorMessage />}

      {Array.isArray(images) && images.length > 0 && !error && (
        <ImageGallery images={images} onImageClick={handleOpenModal} />
      )}

      {isLoading && <Loader />}

      {Array.isArray(images) && images.length > 0 && !isLastPage && !error && (
        <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
      )}

      <ImageModal isOpen={modalIsOpen} onClose={handleCloseModal} selectedImage={modalImageUrl} />

      <Toaster position="top-right" reverseOrder={false} />

      <ScrollUp />
    </>
  );
};

export default App;

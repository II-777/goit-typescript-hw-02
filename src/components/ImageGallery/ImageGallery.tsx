// Components
import ImageCard from '../ImageCard/ImageCard';
// Styles 
import css from './ImageGallery.module.css';

// Define the type for the image object
interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
}

// Define the props for the ImageGallery component
interface ImageGalleryProps {
  images: UnsplashImage[];
  onImageClick: (imageUrl: string) => void;
}

// Define the ImageGallery functional component
const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  if (images.length === 0) {
    return null; // Return null to render nothing if there are no images
  }

  return (
    <ul className={css.imageGalleryList}>
      {images.map((image) => (
        <li key={image.id} className={css.imageGalleryListItem}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;

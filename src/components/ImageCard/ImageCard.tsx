// Styles 
import css from './ImageCard.module.css';

// Define the type for the image object
interface UnsplashImage {
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
}

// Define the props for the ImageCard component
interface ImageCardProps {
  image: UnsplashImage;
  onImageClick: (imageUrl: string) => void;
}

// Define the ImageCard functional component
const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  return (
    <div className={css.imageCard}>
      <img
        src={image.urls.small}
        alt={image.alt_description || 'Image'}
        className={css.imageCardImg}
        onClick={() => onImageClick(image.urls.regular)}
      />
    </div>
  );
}

export default ImageCard;

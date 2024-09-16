import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { UnsplashImage } from '../../types/UnsplashImage';

interface ImageGalleryProps {
  images: UnsplashImage[];
  onImageClick: (imageUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  if (images.length === 0) {
    return null;
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

// External Libraries
import { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';
// Styles
import css from './ScrollUp.module.css';

// Define the ScrollUp functional component
const ScrollUp: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`${css.scrollUp} ${isVisible ? '' : css.visuallyHiddenScroll}`}
      onClick={handleClick}
    >
      <FaChevronUp size="24" className={css.scrollIcon} />
    </button>
  );
};

export default ScrollUp;

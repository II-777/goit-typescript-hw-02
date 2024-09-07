// Styles
import css from './LoadMoreBtn.module.css';

// Define the props for the LoadMoreBtn component
interface LoadMoreBtnProps {
  onClick: () => void;
  disabled: boolean;
}

// Define the LoadMoreBtn functional component
const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick, disabled }) => {
  return (
    <div className={css.container}>
      <button onClick={onClick} disabled={disabled} className={css.loadMoreButton}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;

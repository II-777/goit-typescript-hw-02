// External Libraries
import Modal from 'react-modal';

// Define custom styles for the modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    background: 'transparent',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

// Bind modal to the app element
Modal.setAppElement('#root');

// Define the props for the ImageModal component
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImage: string;
}

// Define the ImageModal functional component
const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, selectedImage }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <img
        src={selectedImage}
        alt="Selected"
        style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '90vh', objectFit: 'cover' }}
      />
    </Modal>
  );
}

export default ImageModal;

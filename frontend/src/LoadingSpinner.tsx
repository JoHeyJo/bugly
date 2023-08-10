import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <div className='d-flex justify-content-center'>
      <Spinner animation="border" />
    </div>
  );
}

export default LoadingSpinner;
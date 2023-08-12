import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <div className='d-flex flex-column align-items-center'>
      <h1>Please wait a moment while the server warms up...</h1>
      <Spinner animation="border" />
    </div>
  );
}

export default LoadingSpinner;
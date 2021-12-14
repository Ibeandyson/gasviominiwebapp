import {Spinner} from "react-bootstrap"
const Loader = () => {
    return (
      <div
        style={{
          position: 'fixed',
          background: '#00000050',
          display: 'flex',
          top: '0',
          left: '0',
          zIndex: '2',
          width: '100%',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Spinner animation="border"  variant="primary" />
      </div>
    );
  };
  
  export default Loader;
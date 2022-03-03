import { ToastContainer } from 'react-toastify';

import Layout from '../layouts';
import Instructions from '../components/Instructions';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Instructions />
      <Component {...pageProps} />
      <ToastContainer
        position='top-right'
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </Layout>
  );
}

export default MyApp;

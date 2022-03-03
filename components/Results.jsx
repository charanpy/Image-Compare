import Image from 'next/image';
import styles from '../styles/Loader.module.css';

const Results = ({ loading, responseData }) => {
  const imageSrc = responseData ? '/success.svg' : '/close.svg';
  const result = responseData ? 'Matched' : 'Not Matched';
  return (
    <>
      {loading ? (
        <div className='flex flex-row flex-wrap items-center'>
          <div className={styles.loader}></div>
          <p className='mx-2 text-lg text-green-500'>Comparison in Progress</p>
        </div>
      ) : (
        ''
      )}
      {responseData === null || responseData === undefined ? (
        ''
      ) : (
        <div className='flex flex-row flex-wrap items-center bg-slate-200 py-2 px-3 rounded-sm shadow-lg'>
          <Image src={imageSrc} width='24' height='24' alt='result' />
          <p className='text-slate-600 text-xl mx-2'>{result}</p>
        </div>
      )}
    </>
  );
};

export default Results;

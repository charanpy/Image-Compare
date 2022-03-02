import Image from 'next/image';
import Card from '../components/Card';
import Seo from '../components/Seo';
import useFile from '../hooks/useFile';

import styles from '../styles/Loader.module.css';

const cards = ['Reference', 'Comparison'];

export default function Home() {
  const [
    image,
    previewImage,
    onHandleFileChange,
    onHandleReset,
    fetchImage,
    compareImage,
    loading,
    responseData,
  ] = useFile();
  return (
    <>
      <Seo />
      <div className='flex flex-row flex-wrap justify-center'>
        {cards.map((card, index) => (
          <Card
            key={index}
            mr={index === 0}
            type={card}
            onHandleFileChange={onHandleFileChange}
            previewImage={previewImage?.[index]}
            cardId={index}
            fetchImage={fetchImage}
          />
        ))}
      </div>

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
          <Image
            src={responseData ? '/success.svg' : '/close.svg'}
            width='24'
            height='24'
            alt='result'
          />
          <p className='text-slate-600 text-xl mx-2'>
            {responseData ? 'Matched' : 'Not Matched'}
          </p>
        </div>
      )}

      <div className='flex flex-col'>
        <button
          className='transition-all duration-500 flex flex-row flex-wrap items-center my-6 bg-stone-900 text-white p-2.5 px-6 text-md hover:bg-stone-600 border-0 rounded-sm shadow-md'
          onClick={compareImage}
          disabled={loading}
        >
          <span className='mr-2'>COMPARE</span>
          <Image src='/arrow.svg' width='24' height='24' alt='right_arrow' />
        </button>

        <button
          className='transition-all duration-500 flex flex-row flex-wrap items-center justify-between my-6 md:my-2 bg-red-600 text-white p-2.5 px-6 text-md hover:bg-red-500 border-0 rounded-sm shadow-md'
          onClick={onHandleReset}
          disabled={loading}
        >
          <span className='mr-2'>RESET ALL</span>
          <Image src='/reset.svg' width='24' height='24' alt='right_arrow' />
        </button>
      </div>
    </>
  );
}

import { useRef } from 'react';
import Image from 'next/image';
import notify from '../utils/toast';

const Card = ({
  mr,
  type = '',
  onHandleFileChange,
  previewImage,
  cardId,
  fetchImage,
}) => {
  const imageURL = useRef('');

  const onHandleFetchImage = (id) => {
    const url = imageURL?.current?.value;

    if (!url) return notify('Invalid IMage URL');

    fetchImage(url, id);
  };

  return (
    <section className={`${mr ? 'md:mr-6 my-5' : ''}  md:my-0 `}>
      <h1 className='text-slate-800 text-lg mb-4'>{type + ' Image'}</h1>

      <input
        type='file'
        id={type}
        accept='image/*'
        onChange={(e) => onHandleFileChange(e, cardId)}
      />
      <label
        htmlFor={type}
        className={`w-60 h-60 bg-zinc-50 shadow-md flex flex-col ${
          previewImage ? 'p-2' : 'justify-center items-center'
        } cursor-pointer leading-loose`}
      >
        {previewImage ? (
          <div>
            <Image
              src={previewImage}
              alt='image'
              height='240'
              width='240'
              objectFit='cover'
            />
          </div>
        ) : (
          <>
            <Image
              src='/upload.svg'
              width='30'
              height='30'
              alt='upload-image'
            />
            <p className='text-gray-600'>Upload Image</p>
          </>
        )}
      </label>

      <div className='flex flex-row my-6'>
        <input
          type='url'
          placeholder='Use Image URL'
          className='p-2 w-full border-2 border-blue-200 text-sm text-slate-800'
          ref={imageURL}
        />
        <div>
          <button
            className='p-2 px-2.5 bg-blue-700 text-white'
            onClick={() => onHandleFetchImage(cardId)}
          >
            Go
          </button>
        </div>
      </div>
    </section>
  );
};

export default Card;

import Image from 'next/image';

const ButtonActions = ({ loading, compareImage, onHandleReset }) => {
  return (
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
  );
};

export default ButtonActions;

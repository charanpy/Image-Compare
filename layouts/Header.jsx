import Image from 'next/image';

const Header = () => {
  return (
    <header className='py-5 px-2 md:px-0 border-b-2 border-indigo-100 flex flex-row flex-wrap justify-between items-center flex-wrap shadow-sm'>
      <h1 className='text-gray-700 cursor-pointer text-xl ml-2 md:ml-0 md:text-2xl'>
        Face Compare
      </h1>
      <a
        href='https://github.com/charanpy/Image-Compare'
        className='hover:text-sky-500 text-slate-500 cursor-pointer flex flex-row items-center'
      >
        <Image src='/code.svg' width='24' height='24' alt='code' />
        <span className='mx-2'>Source Code</span>
      </a>
    </header>
  );
};

export default Header;

import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='py-5 mt-4 text-center flex flex-row flex-wrap items-center justify-center text-slate-600'>
      <span className='mr-2'>Made with</span>
      <Image src='/favorite.svg' width='24' height='24' alt='favorite' />
      <span className='ml-2'>by Charan Ⓒ {new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;

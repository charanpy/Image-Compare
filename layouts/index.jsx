import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className='myContainer m-auto'>
      <Header />
      <main className='bg-slate-100 min-h-screen flex flex-col justify-center items-center'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

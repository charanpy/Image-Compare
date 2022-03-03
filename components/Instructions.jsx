import { toast } from 'react-toastify';

const toastId = '';

const Instruction = () => (
  <div className='p-2'>
    <ul className='list-disc'>
      <li className='text-slate-300 my-2 text-md'>
        Image must contain faces of human beings
      </li>
      <li className='text-slate-300 my-2 text-md'>
        Image size must be less than 2.5MB
      </li>
      <li className='text-slate-300 my-2 text-md'>
        Supported Image extensions-JPG/JPEG/PNG
      </li>
    </ul>
  </div>
);

const Instructions = () => {
  return (
    <>
      {toast.dark(<Instruction />, {
        toastId,
        position: 'top-right',
        hideProgressBar: true,
        autoClose: false,
      })}
    </>
  );
};

export default Instructions;

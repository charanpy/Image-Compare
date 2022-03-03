import { toast } from 'react-toastify';

const notify = (message, error = true, warning = false) =>
  toast[warning ? 'warn' : error ? 'error' : 'success'](message, {
    theme: 'colored',
  });

export const closeNotify = () => toast.dismiss();

export default notify;

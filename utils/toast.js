import { toast } from 'react-toastify';

const notify = (message, error = true) =>
  toast[error ? 'error' : 'success'](message, { theme: 'colored' });

export default notify;

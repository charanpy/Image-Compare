import { useState } from 'react';
import Instructions from '../components/Instructions';
import notify, { closeNotify } from '../utils/toast';

const imageExt = ['jpg', 'jpeg', 'png'];

const useFile = () => {
  const [uploadFile, setUploadFile] = useState({
    image: [],
    previewImage: [],
    responseData: null,
  });

  const [loading, setLoading] = useState(false);

  const { image, previewImage, responseData } = uploadFile;

  const setImage = (cardId, file) => {
    const imageSrc = URL.createObjectURL(file);
    const images = [...image];
    const previewImages = [...previewImage];
    previewImages[cardId] = imageSrc;
    images[cardId] = file;

    setUploadFile((files) => ({
      ...files,
      image: images,
      previewImage: previewImages,
    }));
  };

  const onHandleFileChange = (e, cardId) => {
    if (loading) return;

    const file = e.target.files;

    // check file exists
    if (!file || !file?.length) {
      return;
    }

    // check valid ext
    const fileExtension = file[0].type.split('/')[1];

    if (!imageExt.includes(fileExtension)) {
      return notify('Invalid file');
    }

    // check image < 2.5MB
    const sizeInMB = (file[0]?.size / (1024 * 1024)).toFixed(2);

    if (sizeInMB > 2.5) return notify('Image should be less than 2.5 MB');

    setImage(cardId, file[0]);
  };

  const fetchImage = (url, cardId) => {
    if (loading) return;

    fetch(url)
      .then((res) => {
        if (!res.headers.get('content-type').startsWith('image')) {
          return notify('Invalid Image URL');
        }
        return res.blob();
      })
      .then((res) => {
        const file = new File([res], 'imageSrc.jpg', { type: 'images/jpeg' });
        setImage(cardId, file);
      })
      .catch(() => {
        notify('Unable to fetch image from provided URL');
      });
  };

  const onHandleReset = () => {
    setUploadFile((files) => ({
      ...files,
      image: [],
      previewImage: [],
      responseData: null,
    }));

    document.querySelectorAll('input[type="file"]').forEach((input) => {
      input.value = '';
    });
  };

  const compareImage = async () => {
    if (loading) return;
    try {
      if (!image.length || image.length < 2) {
        return notify('Please Select Image');
      }
      // loading to true
      setLoading((loader) => !loader);

      const formData = new FormData();
      image.forEach((img) => formData.append('image', img));

      // set prev responseData to null
      if (responseData)
        setUploadFile((files) => ({ ...files, responseData: null }));

      // close existing toaster
      closeNotify();

      const res = await fetch('/api/compare-image', {
        method: 'POST',
        body: formData,
      });

      // handle if payload too long
      if (res.status === 413) {
        throw new Error(
          'Image too large Please upload image which is less than 2.5MB'
        );
      }

      const data = await res?.json();

      // handle face detection comparison error
      if (!res?.ok) {
        throw new Error(data?.message || 'SomethiNg went wrong');
      }

      setUploadFile((files) => ({
        ...files,
        responseData: !!data?.matchedFaces?.length,
      }));

      setLoading((loader) => !loader);
    } catch (error) {
      notify(error?.message);
      setLoading((loader) => !loader);
    }
  };

  return [
    previewImage,
    onHandleFileChange,
    onHandleReset,
    fetchImage,
    compareImage,
    loading,
    responseData,
  ];
};

export default useFile;

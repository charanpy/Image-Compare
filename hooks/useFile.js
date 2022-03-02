import { useState } from 'react';
import Image from 'next/image';
import notify from '../utils/toast';

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
    if (!file || !file?.length) {
      return notify('Please select file');
    }
    const fileExtension = file[0].type.split('/')[1];

    if (!imageExt.includes(fileExtension)) {
      return notify('Invalid file');
    }
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
      .catch((e) => {});
  };

  const onHandleReset = () => {
    setUploadFile((files) => ({
      ...files,
      image: [],
      previewImage: [],
      responseData: null,
    }));
  };

  const compareImage = async () => {
    if (loading) return;
    try {
      if (!image.length || image.length < 2) {
        return notify('Please Select Image');
      }
      setLoading((loader) => !loader);
      const formData = new FormData();
      image.forEach((img) => formData.append('image', img));
      const res = await fetch('/api/compare-image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      setUploadFile((files) => ({
        ...files,
        responseData: !!data?.matchedFaces?.length,
      }));
    } catch (error) {
    } finally {
      setLoading((loader) => !loader);
    }
  };

  return [
    image,
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

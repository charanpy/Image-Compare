import Image from 'next/image';
import ButtonActions from '../components/ButtonActions';
import Card from '../components/Card';
import Results from '../components/Results';
import Seo from '../components/Seo';
import useFile from '../hooks/useFile';

const cards = ['Reference', 'Comparison'];

export default function Home() {
  const [
    previewImage,
    onHandleFileChange,
    onHandleReset,
    fetchImage,
    compareImage,
    loading,
    responseData,
  ] = useFile();

  return (
    <>
      <Seo />
      <div className='flex flex-row flex-wrap justify-center'>
        {cards.map((card, index) => (
          <Card
            key={index}
            mr={index === 0}
            type={card}
            onHandleFileChange={onHandleFileChange}
            previewImage={previewImage?.[index]}
            cardId={index}
            fetchImage={fetchImage}
          />
        ))}
      </div>

      <Results loading={loading} responseData={responseData} />

      <ButtonActions
        loading={loading}
        onHandleReset={onHandleReset}
        compareImage={compareImage}
      />
    </>
  );
}

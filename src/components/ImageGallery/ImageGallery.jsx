import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import style from 'components/Styles.module.css';
export default function ImageGallery({ images, showModal }) {
  // console.log(images);
  return (
    <>
      <ul className={style.ImageGallery}>
        {images.map(e => {
          return <ImageGalleryItem key={e.id} showModal={showModal} e={e} />;
        })}
      </ul>
    </>
  );
}

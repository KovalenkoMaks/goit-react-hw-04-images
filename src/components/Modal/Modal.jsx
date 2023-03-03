import style from 'components/Styles.module.css';
import { useEffect } from 'react';

export default function Modal({ modalImgId, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    document.querySelector('ul').style = 'overflow: hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.querySelector('ul').style = 'overflow: visible';
    };
    // eslint-disable-next-line
  }, []);
  function handleEsc(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
  const handeleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  const [img] = modalImgId;
  return (
    <div key={img.id} className={style.Overlay} onClick={handeleBackDropClick}>
      <div className={style.Modal}>
        <img src={img.largeImageURL} alt={img.tags} width="600" height="800" />
      </div>
    </div>
  );
}

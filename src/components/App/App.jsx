import Searchbar from 'components/Searchbar/Searchbar';
import React, { useState, useEffect } from 'react';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import style from 'components/Styles.module.css';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import * as API from 'components/utils/API';

// import axios from 'axios';

export function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [btn, setBtn] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalImgId, setmodalImgId] = useState([]);
  const [page, setPage] = useState(1);

  const counter = value => {
    switch (value) {
      case 'reset':
        setPage(1);
        break;
      case 'increase':
        setPage(page => page + 1);
        break;

      default:
        break;
    }
  };

  const toggleLoading = () => {
    setLoading(prev => !prev);
  };

  useEffect(() => {
    if (search === '') return;

    API.imagesArr(search).then(resp => {
      setImages(resp.hits);
      setTotalHits(resp.totalHits);
      setBtn(true);
      counter('reset');
      window.scrollTo(0, 0);
    });
  }, [search]);

  useEffect(() => {
    if (page === 1) return;

    API.NextSearch(search, page).then(response => {
      setImages(prev => {
        return [...prev, ...response.hits];
      });
      setTotalHits(response.totalHits);
      toggleLoading();
      btnCheck();
    });
    // eslint-disable-next-line
  }, [page]);
  const nextSearch = () => {
    counter('increase');
    toggleLoading();
  };
  const makeSearch = search => {
    setSearch(search);
  };

  const btnCheck = () => {
    if (totalHits <= 12 * page) {
      setBtn(false);
    }
  };
  const showModal = id => {
    const modalImgId = images.filter(e => Number(id) === e.id);
    setModal(true);
    setmodalImgId(modalImgId);
  };

  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
      <div className={style.App}>
        <Searchbar onSubmit={makeSearch} search={search} />
        {images.length > 0 ? (
          <ImageGallery images={images} showModal={showModal}></ImageGallery>
        ) : null}
        {btn ? <Button loading={loading} onClick={nextSearch} /> : null}
        {modal ? (
          <Modal modalImgId={modalImgId} closeModal={closeModal} />
        ) : null}
      </div>
    </>
  );
}

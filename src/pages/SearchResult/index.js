import React, { useEffect, useState } from 'react';
import background from '~/assets/img/search_bg.jpg';

import CasinoIcon from '@mui/icons-material/Casino';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '~/api';
import Loading from '~/components/Loading';
import SearchBar from '../../components/SearchBar';
import styles from './SearchResult.module.scss';

const cx = classNames.bind(styles);

function SearchResult() {
    const [result, setResult] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const cardsPerPage = 12;
    const pagesVisited = pageNumber * cardsPerPage;
    const displayCards = result.slice(pagesVisited, pagesVisited + cardsPerPage);

    const params = useParams();
    const cardName = params.fname;
    const typeRequest = params.type;

    const fetchData = async () => {
        setLoading(true);
        try {
            const cardRes =
                typeRequest === 'pack'
                    ? await axios.get(`/cardinfo.php?cardset=${cardName}`)
                    : await axios.get(`/cardinfo.php?fname=${cardName}`);
            if (cardRes) {
                setResult(cardRes.data.data);
                setTotalPage(Math.ceil(cardRes.data.data.length / cardsPerPage));
            }
        } catch (error) {
            console.log(error);
            setResult([]);
            setTotalPage(0);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardName]);

    const handlePrevPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNextPage = () => {
        if (pageNumber < totalPage - 1) {
            setPageNumber(pageNumber + 1);
        }
    };

    return (
        <div className={cx('card-result')}>
            <div className={cx('background')}>
                <img className={cx('background-img')} src={background} alt="Background"></img>
                <div className={cx('bronze-border')}></div>

                <SearchBar size="small"></SearchBar>
            </div>

            <div className={cx('card-result-content')}>
                {loading && <Loading />}

                {!loading && displayCards.length === 0 && (
                    <div className={cx('no-result')}>
                        <span>No Results</span>
                    </div>
                )}

                {!loading && displayCards && displayCards.length !== 0 && (
                    <>
                        <div className={cx('result-info')}>
                            {typeRequest === 'pack' ? (
                                <span className={cx('result-text')}>
                                    {result.length} {result.length === 1 ? 'Card' : 'Cards'} in{' '}
                                    <span className={cx('pack-title')}>{cardName}</span>
                                </span>
                            ) : (
                                <span className={cx('result-text')}>
                                    {result.length} {result.length === 1 ? 'Result' : 'Results'}
                                </span>
                            )}
                            <div className="d-flex align-items-center">
                                <span className={cx('result-text')}>
                                    {pageNumber + 1} / {totalPage}
                                </span>
                                {typeRequest === 'pack' && (
                                    <span
                                        className="ms-5"
                                        title="Gacha"
                                        onClick={() => navigate(`/packs/gacha/${cardName}`)}
                                    >
                                        <CasinoIcon className={cx('shuffle-icon')} />
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={cx('card-list')}>
                            {displayCards.map((card, index) => (
                                <div
                                    className={cx('card-item')}
                                    key={index}
                                    onClick={() => navigate(`/cardinfo/${card.name}`)}
                                >
                                    <div className={cx('card-img')}>
                                        <img src={card.card_images[0].image_url} alt="Card"></img>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handlePrevPage}
                            className={cx('btn-page', 'prev', pageNumber === 0 ? 'disable' : '')}
                        >
                            <ChevronLeftIcon />
                        </button>
                        <button
                            onClick={handleNextPage}
                            className={cx('btn-page', 'next', pageNumber === totalPage - 1 ? 'disable' : '')}
                        >
                            <ChevronRightIcon />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default SearchResult;

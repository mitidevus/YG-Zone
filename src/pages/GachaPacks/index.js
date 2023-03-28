import React, { useEffect, useState } from 'react';
import background from '~/assets/img/search_bg.jpg';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import axios from '~/api';
import Loading from '~/components/Loading';
import styles from './GachaPacks.module.scss';

const cx = classNames.bind(styles);

function Packs() {
    const [allPacks, setAllPacks] = useState([]);
    const [result, setResult] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const packsPerPage = 12;
    const pagesVisited = pageNumber * packsPerPage;
    const displayPacks = result.slice(pagesVisited, pagesVisited + packsPerPage);

    const fetchData = async () => {
        setLoading(true);
        try {
            const packRes = await axios.get(`/cardsets.php`);
            if (packRes) {
                setResult(packRes.data);
                setAllPacks(packRes.data);
                setTotalPage(Math.ceil(packRes.data.length / packsPerPage));
            }
        } catch (error) {
            console.log(error);
            setResult([]);
            setAllPacks([]);
            setTotalPage(0);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const handleSearchPack = (e) => {
        const packName = e.target.value;
        if (packName === '') {
            setResult(allPacks);
            setTotalPage(Math.ceil(allPacks.length / packsPerPage));
            setPageNumber(0);
        } else {
            const filteredPacks = allPacks.filter((pack) =>
                pack.set_name.toLowerCase().includes(packName.toLowerCase()),
            );
            setResult(filteredPacks);
            setTotalPage(Math.ceil(filteredPacks.length / packsPerPage));
            setPageNumber(0);
        }
    };

    return (
        <div className={cx('pack-result')}>
            <div className={cx('background')}>
                <img className={cx('background-img')} src={background} alt="Background"></img>
                <div className={cx('bronze-border')}></div>

                <div className={cx('search-bar')}>
                    <input
                        id="search-input"
                        className={cx('search-input')}
                        type="text"
                        placeholder={'Enter pack name to gacha (e.g. Legendary Duelists)'}
                        autoComplete="off"
                        onChange={handleSearchPack}
                    ></input>
                </div>
            </div>

            <div className={cx('pack-result-content')}>
                {loading && <Loading />}

                {!loading && displayPacks.length === 0 && (
                    <div className={cx('no-result')}>
                        <span>No Results</span>
                    </div>
                )}

                {!loading && displayPacks && displayPacks.length !== 0 && (
                    <>
                        <div className={cx('result-info')}>
                            <span className={cx('result-text')}>
                                {result.length} {result.length === 1 ? 'Result' : 'Results'}
                            </span>
                            <span className={cx('result-text')}>
                                {pageNumber + 1} / {totalPage}
                            </span>
                        </div>

                        <div className={cx('pack-list')}>
                            {displayPacks.map((pack, index) => (
                                <div
                                    className={cx('pack-item')}
                                    key={index}
                                    onClick={() => {
                                        navigate(`/packs/gacha/${pack.set_name}`);
                                    }}
                                    title={`Pack Name: ${pack.set_name}\nTotal Cards: ${pack.num_of_cards}\nRelease Date: ${pack.tcg_date || "Unknown"}`}
                                >
                                    <div className={cx('pack-img')}>
                                        <img
                                            src={`https://images.ygoprodeck.com/images/sets/${pack.set_code}.jpg`}
                                            alt="Pack"
                                        ></img>
                                    </div>
                                    <div className={cx('pack-info')}>
                                        <span className={cx('pack-name')}>{pack.set_name}</span>
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

export default Packs;

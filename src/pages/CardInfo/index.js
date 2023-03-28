import React, { useEffect, useState } from 'react';
import background from '~/assets/img/search_bg.jpg';

import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import axios from '~/api';
import Loading from '../../components/Loading';
import SearchBar from '../../components/SearchBar';
import styles from './CardInfo.module.scss';

const cx = classNames.bind(styles);

function CardInfo() {
    const [cardInfo, setCardInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const cardName = params.name;

    const fetchData = async () => {
        setLoading(true);
        try {
            const cardRes = await axios.get(`/cardinfo.php?name=${cardName}`);
            if (cardRes) {
                setCardInfo(cardRes.data.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardName]);

    return (
        <div className={cx('card-detail-info')}>
            <div className={cx('background')}>
                <img className={cx('background-img')} src={background} alt="Background"></img>
                <div className={cx('bronze-border')}></div>

                <SearchBar size="small"></SearchBar>
            </div>

            <div className={cx('card-info-content')}>
                {loading && <Loading />}

                {!loading && Object.keys(cardInfo).length === 0 && (
                    <div className={cx('no-result')}>
                        <span>"{cardName}" card not found.</span>
                    </div>
                )}

                {!loading && cardInfo && cardInfo.card_images && cardInfo.card_images.length > 0 && (
                    <div className={cx('card-info')}>
                        <div className={cx('card')}>
                            <div className="row">
                                <div className={cx('col-5', 'card-image')}>
                                    <img src={cardInfo.card_images[0].image_url} alt="Card"></img>
                                </div>

                                <div className="col">
                                    <div className={cx('card-desc')}>
                                        <p>
                                            <span className={cx('attribute')}>Card name:</span> {cardInfo.name}
                                        </p>

                                        <p>
                                            <span className={cx('attribute')}>Type:</span> {cardInfo.type}
                                        </p>

                                        {cardInfo.atk || cardInfo.def || cardInfo.level ? (
                                            <p className="d-flex">
                                                {cardInfo.atk ? (
                                                    <span className="me-4">
                                                        <span className={cx('attribute')}>ATK:</span> {cardInfo.atk}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}

                                                {cardInfo.def ? (
                                                    <span className="me-4">
                                                        <span className={cx('attribute')}>DEF:</span> {cardInfo.def}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}

                                                {cardInfo.level ? (
                                                    <span className="me-4">
                                                        <span className={cx('attribute')}>Level:</span> {cardInfo.level}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </p>
                                        ) : (
                                            <></>
                                        )}

                                        {cardInfo.race || cardInfo.attribute ? (
                                            <p className="d-flex">
                                                {cardInfo.race ? (
                                                    <span className="me-3">
                                                        <span className={cx('attribute')}>Race:</span> {cardInfo.race}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}

                                                {cardInfo.attribute ? (
                                                    <span className="me-3">
                                                        <span className={cx('attribute')}>Attribute:</span>{' '}
                                                        {cardInfo.attribute}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </p>
                                        ) : (
                                            <></>
                                        )}

                                        {cardInfo.archetype ? (
                                            <p>
                                                <span className="me-3">
                                                    <span className={cx('attribute')}>Archetype:</span>{' '}
                                                    {cardInfo.archetype}
                                                </span>
                                            </p>
                                        ) : (
                                            <></>
                                        )}

                                        {cardInfo.linkval || cardInfo.linkmarkers ? (
                                            <p className="d-flex">
                                                {cardInfo.linkval ? (
                                                    <span className="me-4">
                                                        <span className={cx('attribute')}>Link Value:</span>{' '}
                                                        {cardInfo.linkval}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}

                                                {cardInfo.linkmarkers ? (
                                                    <span className="me-4">
                                                        <span className={cx('attribute')}>Link Markers:</span>{' '}
                                                        {cardInfo.linkmarkers.map((marker, index) => (
                                                            <span className="me-2" key={index}>
                                                                {marker}
                                                            </span>
                                                        ))}
                                                    </span>
                                                ) : (
                                                    <></>
                                                )}
                                            </p>
                                        ) : (
                                            <></>
                                        )}

                                        <p>
                                            <span className={cx('attribute')}>Description:</span> {cardInfo.desc}
                                        </p>

                                        {cardInfo.banlist_info && cardInfo.banlist_info.ban_tcg ? (
                                            <p>
                                                <span className={cx('attribute')}>Ban TCG:</span>{' '}
                                                <span className={cx('banlist')}>{cardInfo.banlist_info.ban_tcg}</span>
                                            </p>
                                        ) : (
                                            <></>
                                        )}

                                        {cardInfo.banlist_info && cardInfo.banlist_info.ban_ocg ? (
                                            <p>
                                                <span className={cx('attribute')}>Ban OCG:</span>{' '}
                                                <span className={cx('banlist')}>{cardInfo.banlist_info.ban_ocg}</span>
                                            </p>
                                        ) : (
                                            <></>
                                        )}

                                        {cardInfo.banlist_info && cardInfo.banlist_info.ban_goat ? (
                                            <p>
                                                <span className={cx('attribute')}>Ban GOAT:</span>{' '}
                                                <span className={cx('banlist')}>{cardInfo.banlist_info.ban_goat}</span>
                                            </p>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CardInfo;

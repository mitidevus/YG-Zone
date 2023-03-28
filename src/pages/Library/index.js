import React, { useEffect, useState } from 'react';
import background from '~/assets/img/background1.png';
import backcard from '~/assets/img/back_card.jpg';

import CachedIcon from '@mui/icons-material/Cached';
import classNames from 'classnames/bind';
import axios from '~/api';
import Button from '~/components/Button';
import SearchBar from '../../components/SearchBar';
import styles from './Library.module.scss';

const cx = classNames.bind(styles);

function Library() {
    const [cardInfo, setCardInfo] = useState({});
    const [isUnboxed, setIsUnboxed] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const cardRes = await axios.get(`/randomcard.php`);
            if (cardRes) {
                setCardInfo(cardRes.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={cx('library')}>
            <div>
                <img className={cx('background')} src={background} alt="Background"></img>

                <SearchBar size="large"></SearchBar>
            </div>

            {cardInfo && cardInfo.card_images && cardInfo.card_images.length > 0 ? (
                <div className={cx('card-info')}>
                    <div className={cx("header-title")}>
                        <span className={cx("header-text")}>Gacha Mini-game</span>
                    </div>

                    <div className={cx('card')}>
                        <Button
                            secondary
                            className={cx('renew-icon', isUnboxed ? '' : 'disable')}
                            onClick={() => {
                                setLoading(true);
                                setTimeout(() => {
                                    fetchData();
                                    setIsUnboxed(false);
                                    setLoading(false);
                                }, 500);
                            }}
                        >
                            <CachedIcon className={cx({ loading: loading })}></CachedIcon>
                        </Button>
                        <div className="row">
                            {isUnboxed ? (
                                <>
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
                                                            <span className={cx('attribute')}>Level:</span>{' '}
                                                            {cardInfo.level}
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
                                                            <span className={cx('attribute')}>Race:</span>{' '}
                                                            {cardInfo.race}
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
                                                    <span className={cx('banlist')}>
                                                        {cardInfo.banlist_info.ban_tcg}
                                                    </span>
                                                </p>
                                            ) : (
                                                <></>
                                            )}

                                            {cardInfo.banlist_info && cardInfo.banlist_info.ban_ocg ? (
                                                <p>
                                                    <span className={cx('attribute')}>Ban OCG:</span>{' '}
                                                    <span className={cx('banlist')}>
                                                        {cardInfo.banlist_info.ban_ocg}
                                                    </span>
                                                </p>
                                            ) : (
                                                <></>
                                            )}

                                            {cardInfo.banlist_info && cardInfo.banlist_info.ban_goat ? (
                                                <p>
                                                    <span className={cx('attribute')}>Ban GOAT:</span>{' '}
                                                    <span className={cx('banlist')}>
                                                        {cardInfo.banlist_info.ban_goat}
                                                    </span>
                                                </p>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={cx('col-5', 'card-image')}>
                                        <img
                                            className={cx('card-unbox')}
                                            src={backcard}
                                            alt="Card"
                                            title="Tap to open"
                                            onClick={() => {
                                                setIsUnboxed(true);
                                            }}
                                        ></img>
                                    </div>

                                    <div className="col">
                                        <div className={cx('card-desc')}>
                                            <p>
                                                <span className={cx('attribute')}>Card name:</span> ???
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Library;

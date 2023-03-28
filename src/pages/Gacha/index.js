import React, { useEffect, useState } from 'react';
import backcard from '~/assets/img/back_card.jpg';

import CachedIcon from '@mui/icons-material/Cached';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import axios from '~/api';
import Button from '~/components/Button';
import styles from './Gacha.module.scss';

const cx = classNames.bind(styles);

function getRarity(packName, card) {
    // Return set_rarity_code where card.card_sets.set_name === packName
    const cardSet = card.card_sets.find((set) => set.set_name === packName);
    // if (cardSet === '(PR)') {
    //     return 'Premium Gold Rare';
    // } else if (cardSet === '(GR)') {
    //     return 'Gold Rare';
    // } else if (cardSet === '(UR)') {
    //     return 'Ultra Rare';
    // } else if (cardSet === '(DNPR)') {
    //     return 'Duel Terminal Rare Parallel Rare';
    // } else if (cardSet === '(PScR)') {
    //     return 'Prismatic Secret Rare';
    // } else if (cardSet === '(ScR)') {
    //     return 'Secret Rare';
    // } else if (cardSet === '(SR)') {
    //     return 'Super Rare';
    // } else if (cardSet === '(R)') {
    //     return 'Rare';
    // } else if (cardSet === '(C)') {
    //     return 'Common';
    // }
    return cardSet.set_rarity_code;
}

function Gacha() {
    const [allCards, setAllCards] = useState([]);
    const [cardInfo, setCardInfo] = useState({});
    const [isUnboxed, setIsUnboxed] = useState(false);
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const packName = params.name;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const cardRes = await axios.get(`/cardinfo.php?cardset=${packName}`);
                if (cardRes) {
                    setAllCards(cardRes.data.data);
                    const randomIndex = Math.floor(Math.random() * cardRes.data.data.length);
                    setCardInfo(cardRes.data.data[randomIndex]);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRandomCard = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * allCards.length);
        } while (allCards[randomIndex].id === cardInfo.id);
        setCardInfo(allCards[randomIndex]);
    };

    return (
        <div className={cx('card-detail-info')}>
            <div className={cx('card-result-content')}>
                <div className={cx('result-info')}>
                    <span className={cx('result-text')}>
                        {allCards.length} {allCards.length === 1 ? 'Card' : 'Cards'} in{' '}
                        <span className={cx('pack-title')}>{packName}</span>
                    </span>
                    <span className={cx('result-text')}>Gacha Mini-game</span>
                </div>
            </div>

            {cardInfo && cardInfo.card_images && cardInfo.card_images.length > 0 ? (
                <div className={cx('card-info')}>
                    <div className={cx('card')}>
                        <Button
                            secondary
                            className={cx('renew-icon', isUnboxed ? '' : 'disable')}
                            onClick={() => {
                                setLoading(true);
                                setTimeout(() => {
                                    handleRandomCard();
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
                                                <span className={cx('attribute')}>Rarity:</span>{' '}
                                                <span className={cx('pack-title')}>
                                                    {getRarity(packName, cardInfo)}
                                                </span>
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

export default Gacha;

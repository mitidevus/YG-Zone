import Button from '~/components/Button';
import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchBar({ size}) {
    const navigate = useNavigate();

    const handleSearch = () => {
        const cardName = document.querySelector('#search-input').value;
        navigate(`/cards/${cardName}`);
    };

    const handlePress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={cx('search-bar-' + size)}>
            <input
                id="search-input"
                className={cx('search-input')}
                type="text"
                placeholder={'Enter the name of the card (e.g. Dark Magician)'}
                autoComplete="off"
                onKeyPress={handlePress}
            ></input>
            <Button primary className={cx('search-button')} onClick={handleSearch}>
                <SearchIcon></SearchIcon>
            </Button>
        </div>
    );
}

export default SearchBar;

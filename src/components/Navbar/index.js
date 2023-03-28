import React, { useState } from 'react';

import ygzone_logo from '../../assets/img/ygzone_logo.png';

import classNames from 'classnames/bind';

import { Link, useLocation } from 'react-router-dom';
import Button from '../Button';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

const Navbar = () => {
    const location = useLocation();
    const currentUrl = location.pathname;
    const [active, setActive] = useState(currentUrl);

    const handleActive = (url) => {
        setActive(url);
    };

    return (
        <>
            <nav className={cx('Navbar')}>
                <Link to="/" onClick={() => handleActive('/')}>
                    <img src={ygzone_logo} className={cx('logo')} alt="Logo"></img>
                </Link>

                <div className={cx('Nav-menu')}>
                    <ul className={cx('NavMenu')}>
                        <li>
                            <Link
                                to="/"
                                className={active === '/' ? cx('active') : ''}
                                onClick={() => handleActive('/')}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/packs"
                                className={active === '/packs' ? cx('active') : ''}
                                onClick={() => handleActive('/packs')}
                            >
                                Packs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/packs/gacha"
                                className={active.includes('/packs/gacha') ? cx('active') : ''}
                                onClick={() => handleActive('/packs/gacha')}
                            >
                                Gacha
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <ul className={cx('NavMenu')}>
                        <li>
                            <Link
                                to="/signin"
                                className={active === '/signin' ? cx('active') : ''}
                                onClick={() => handleActive('/signin')}
                            >
                                Sign In
                            </Link>
                        </li>
                        <li>
                            <Button
                                primary
                                to="/signup"
                                className={cx('button')}
                                onClick={() => handleActive('/signup')}
                            >
                                Sign Up
                            </Button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

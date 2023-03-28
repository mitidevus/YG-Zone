import React from 'react';
import background from '~/assets/img/card_bg.jpg';

import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer-container')}>
            <div className={cx('background')}>
                <img src={background} alt="Background"></img>
                <div className={cx('footer-content')}>
                    <div className={cx('contact')}>
                        <div className={cx('contact-title')}>Contact</div>
                        <div className={cx('contact-content')}>
                            Email: <a href="mailto:">ygzone@gmail.com</a>
                        </div>
                        <div className={cx('contact-content')}>
                            Phone: <a href="tel:">+84 123 456 789</a>
                        </div>
                        <div className={cx('contact-content')}>
                            Address: <a href="/">123 Street, District 1, Ho Chi Minh City</a>
                        </div>
                    </div>
                    <div className={cx('social')}>
                        <div className={cx('social-title')}>Social</div>
                        <div className={cx('social-content')}>
                            <a href="/">
                                <FacebookIcon className={cx('social-content-icon')} />
                            </a>

                            <a href="/">
                                <InstagramIcon className={cx('social-content-icon')} />
                            </a>

                            <a href="/">
                                <YouTubeIcon className={cx('social-content-icon')} />
                            </a>

                            <a href="/">
                                <TwitterIcon className={cx('social-content-icon')} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;

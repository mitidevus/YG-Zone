import React from 'react';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';

import logo from '~/assets/img/ygzone_logo.png';

import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('In the process of updating...');
    };

    return (
        <div className={cx('wrapper')}>
            <form form="true" className={cx('form')}>
                <div className={cx('auth-image')}>
                    <img className={cx('logo')} src={logo} alt="Navicon" />
                    <p>
                        <i className="fas fa-user"></i> Sign in to your account
                    </p>
                </div>
                {/* {error && <p className={cx('error')}>{error}</p>} */}
                <div className="my-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="ms-1 custom-control-label" htmlFor="customCheck1">
                            Remember me
                        </label>
                    </div>

                    <span className="forgot-password">
                        Forgot
                        <Link to="#"> password?</Link>
                    </span>
                </div>
                <div className="m-3">
                    <Button
                        primary
                        type="submit"
                        className="w-50"
                        onClick={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        Sign In
                    </Button>
                </div>
                <p className="mt-3 register">
                    Don't have an account?
                    <Link to="/signup" className="ms-1">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignIn;

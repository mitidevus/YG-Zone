import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';

import logo from '~/assets/img/ygzone_logo.png';

import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
const cx = classNames.bind(styles);

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== '' && formData.password !== formData.confirmPassword) {
            console.log('Passwords do not match!');
            alert('Passwords do not match!');
        } else {
            console.log(formData);
            alert('In the process of updating...');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form form="true" className={cx('form')}>
                <div className={cx('auth-image')}>
                    <img className={cx('logo')} src={logo} alt="Navicon" />
                    <p>
                        <i className="fas fa-user"></i> Create your account
                    </p>
                </div>
                {/* {error && <p className={cx('error')}>{error}</p>} */}
                <div className="my-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        required
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        required
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="row mb-3">
                    <div className="col-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Phone"
                            required
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="col-7">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            required
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        minLength="6"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        minLength="6"
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                </div>
                <div className="m-3">
                    <Button primary type="submit" className="w-50" onClick={handleSubmit}>
                        Sign Up
                    </Button>
                </div>
                <p className="mt-3 register">
                    Already have an account?
                    <Link to="/signin" className="ms-1">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;

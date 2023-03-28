import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    secondary = false,
    danger = false,
    warning = false,
    success = false,
    disabled = false,
    small,
    large,
    round,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    // Default props are set to be 'false'
    let Comp = 'button'; // Default component is button
    const props = {
        onClick,
        ...passProps,
    };

    // Remove event listener when button is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to; // Internal link
        Comp = Link;
    } else if (href) {
        props.href = href; // External link
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className, // Khi có className sẽ lấy giá trị className làm key
        primary, // If primary is true, add 'primary' class to the wrapper
        secondary,
        danger,
        warning,
        success,
        disabled,
        small,
        large,
        round,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
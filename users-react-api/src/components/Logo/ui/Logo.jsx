import React from 'react';
import { Link } from 'react-router-dom';

import cls from './Logo.module.scss';

const Logo = (props) => {
    const to = props.to || '/';
    const textLogo = props.children || 'User Managment';

    return (
        <Link
            className={ `${cls.logo} ${props.className || ''}` }
            to={to}
        >
            <div>{ textLogo }</div>
        </Link>
    );
};

export default Logo;
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Logo } from '../../Logo';

import cls from './Header.module.scss';

const Header = () => {

    return (
        <header className={ cls.root }>
            <Container maxWidth="lg">
                <div className={ cls.inner }>
                    <Logo />
                    <div className={ cls.buttons }>
                        <>
                            <Link to="/user-register">
                                <Button variant="contained">Create New User</Button>
                            </Link>
                        </>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;

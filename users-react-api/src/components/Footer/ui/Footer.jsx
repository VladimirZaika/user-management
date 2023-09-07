import React from 'react';
import Container from '@mui/material/Container';
import { Logo } from '../../Logo';
import { Grid } from '@mui/material';
import { CopyRight } from '../../CopyRight';

import cls from './Footer.module.scss';

const Footer = () => {

    return (
        <footer className={ cls.root }>
            <Container
                maxWidth="lg"
                className={ cls.footer }
            >
                <Grid className={ cls.inner }>
                    <Logo />
                </Grid>
                <CopyRight />
            </Container>
        </footer>
    );
};

export default Footer;
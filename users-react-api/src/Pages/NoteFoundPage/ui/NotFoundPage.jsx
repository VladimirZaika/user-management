import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Logo } from '../../../components/Logo';

import cls from './NotFoundPage.module.scss';

const NotFoundPage = () => {
    const notFoundText = '404 page not found';
    const btnText = 'Back to main page';
    const classes = {
        notFoundSection: 'not-found-section',
        notFoundBtn: 'not-found-btn',
        notFoundTitle: 'not-found-title',
    }

    return (
        <Grid
            className={ cls[classes.notFoundSection] }
            container
            item
            xs={ 12 }
        >
            <Typography
                className={ cls[classes.notFoundTitle] }
                variant="h3"
                component="h1"
            >
                { notFoundText }
            </Typography>
            <Logo className={ cls[classes.notFoundBtn] }>
                { btnText }
            </Logo>
        </Grid>
    );
};

export default NotFoundPage;
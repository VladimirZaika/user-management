import React from 'react';
import { Grid, Typography } from '@mui/material';

import cls from './CopyRight.module.scss';

const CopyRight = () => {
    const copyRightText = 'Copy right';
    const date = new Date().getFullYear();
    const classes = {
        copyRightWrap: 'copy-right-wrap',
        copyRight: 'copy-right',
    };

    return (
        <Grid className={ cls[classes.copyRightWrap] }>
            <Typography
                className={ cls[classes.copyRight] }
                variant="h6"
                component="span"
            >
                <span>{ `${copyRightText} ${date}` }</span>
            </Typography>
        </Grid>
    );
};

export default CopyRight;
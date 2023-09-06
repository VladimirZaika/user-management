import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchRemoveUser } from '../../../config/redux/slices/users';

import cls from './UserCard.module.scss';

export const UserCard = ( {object} ) => {
    const removeText = 'Are you sure you want delete this post?';
    const dispatch = useDispatch();
    const classes = {
        userCardInfo: 'user-card-info',
        editBtn: 'edit-btn',
        cardLink: 'card-link',
        editLink: 'edit-link',
        removeBtn: 'remove-btn',
        cardInfo: 'card-info',
    }

    const onClickRemove = () => {
        if ( window.confirm(`${removeText}`) ) {
            dispatch( fetchRemoveUser(object.id) );
        }
    };

    return (
        <Grid
            item
            xs={ 12 }
            className={ cls.root }
        >
            <Link
                to={ `/users/${ object.id }` }
                className={ cls[classes.cardLink] }
            />
            <Grid className={ cls.editButtons }>
                <Link
                    to={ `/edit/${ object.id }` }
                    className={ cls[classes.editLink] }
                >
                    <IconButton
                        color="primary"
                        className={ cls[classes.editBtn] }
                    >
                    </IconButton>
                </Link>
                <IconButton
                    onClick={ onClickRemove }
                    color="secondary"
                    className={ cls[classes.removeBtn] }
                >
                </IconButton>
            </Grid>
            <Grid className={ cls.wrapper }>
                <Grid className={ cls.indention }>
                    <Typography
                        variant="h5"
                        component="h3"
                        className={ cls.title }
                    >
                        { object.name }
                    </Typography>
                </Grid>
                <Grid className={ cls[classes.userCardInfo] } >
                    <Typography
                        variant="h6"
                        component="span"
                        className={ cls[classes.cardInfo] }
                    >
                        { object.address.city }
                    </Typography>
                    <Typography
                        variant="h6"
                        component="span"
                        className={ cls[classes.cardInfo] }
                    >
                        { object.company.name }
                    </Typography>
                    <Typography
                        variant="h6"
                        component="span"
                        className={ cls[classes.cardInfo] }
                    >
                        { object.website }
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

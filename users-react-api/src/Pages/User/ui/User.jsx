import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import { UserData } from '../../../components/userData';
import { fetchUserById } from '../../../config/redux/slices/users';
import SkeletonUser from './SkeletonUser';

import cls from './User.module.scss'

export const User = () => {
    const titleText = 'User information.';
    const errText = 'User not found.';
    const [ object, setData ] = useState();
    const { id } = useParams();
    const [ userId, setUserId ] = useState(id);
    const dispatch = useDispatch();
    const [ dataLoaded, setDataLoaded ] = useState( false );
    const classes = {
        userInfoSpan: 'user-info',
        userSection: 'user-section',
        userInfoErr: 'user-info-err',
    };

    const userDataStore = useSelector( state => {
        const data = state.users.posts.items.data;

        if ( !Array.isArray(data) ) {
          return false;
        }

        const findUser = data.find( obj => Number(obj.id) === Number(userId) );

        return findUser || false;
    } );

    useEffect( () => {
        if ( !userDataStore && !dataLoaded ) {
            dispatch( fetchUserById(userId) ).then( response => {
                setData( response.payload?.data );
            } );

            setDataLoaded( true );
        }
    }, [dispatch, userDataStore, id, dataLoaded] );

    const data = userDataStore ? userDataStore : object;

    if (!data) {
        return (
            <SkeletonUser />
        );
    }

    return (
        <main>
            <section>
                <Container maxWidth="lg">
                    <Grid 
                        className={ cls[classes.userSection] }
                        container
                        item
                        xs={ 12 }
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            { (data ?
                                    <Typography
                                        className={ `${cls[classes.userInfoSpan]} ${cls.mb} ${cls.title}` }
                                        variant="h4"
                                        component="h1"
                                    >
                                        <span>{ titleText }</span>
                                    </Typography>
                                :
                                    <Typography
                                        className={ `${cls[classes.userInfoErr]}  ${cls.mb}` }
                                        variant="h2"
                                        component="h1"
                                    >
                                        <span>{ errText }</span>
                                    </Typography>
                            ) }

                            { ( data && Object.keys(data).map( (objKey) => {
                                let parentProp = data[ objKey ];

                                if ( typeof parentProp === 'object' && parentProp !== null ) {

                                    return Object.keys(parentProp).map( (innerKey) => (
                                        (innerKey !== 'geo' &&
                                            <UserData
                                                key={ innerKey }
                                                className={ `${cls[classes.userInfoSpan]} ${cls.mb}` }
                                                variant="h6"
                                                component="p"
                                                dataKey={ innerKey }
                                                dataVal={ parentProp[innerKey] }
                                            />
                                        )
                                    ) )
                                } else {
                                    return ( objKey !== 'id' &&
                                        <UserData
                                            key= { objKey }
                                            className={ `${cls[classes.userInfoSpan]} ${cls.mb}` }
                                            variant="h6"
                                            component="p"
                                            dataKey={ objKey }
                                            dataVal={ parentProp }
                                        />
                                    )
                                }
                            } ) ) }
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </main>
    );
};

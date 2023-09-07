import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { UserCard } from '../../../components/UserCard';
import { fetchUsers } from '../../../config/redux/slices/users';
import SkeletonCards from './skeletonCards';

import cls from './Home.module.scss';

export const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector( state => state );
    const users = posts.users.posts.items.data;
    const [ loading, setLoading ] = useState(false);
    const classes = {
        home: 'home-section',
        gridReboot: 'grid-reboot',
    };

    useEffect( () => {
        dispatch( fetchUsers() ).then( () => setLoading(true) );
    }, [ dispatch, loading ] );

    return (
        <>
            { loading ? (
                <main>
                    <section className={ cls[classes.home] }>
                        <Grid
                            container
                            spacing={ 2 }
                            className={ cls[classes.gridReboot] }
                        >
                            { Array.isArray(users) && users?.map( obj => (
                                <UserCard
                                    key={ obj.id }
                                    object={ obj }
                                />
                            ) ) }
                        </Grid>
                    </section>
                </main>
            ) : (
                <main>
                    <section className={ cls[classes.home] }>
                        <SkeletonCards />
                    </section>
                </main>
            ) }
        </>
    );
};

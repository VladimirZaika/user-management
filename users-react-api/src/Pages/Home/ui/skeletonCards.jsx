import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';

const SkeletonCards = () => {
    return (
        Array.from( { length: 2 } ).map( (_, index) => (
            <Grid
                item
                xs={ 12 }
                md={ 6 }
                key={ index }
            >
                <Skeleton
                    variant="rectangular"
                    height={200}
                />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
            </Grid>
        ) )
    );
};

export default SkeletonCards;
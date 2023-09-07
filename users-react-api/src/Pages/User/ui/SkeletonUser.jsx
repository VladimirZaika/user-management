import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SkeletonUser = () => {
    const min = 150;
    const max = 350;

    return ( 
        <>
            { Array.from( { length: 16 } ).map( (_, index ) => {
                const randomFraction = Math.random();
                const skeletonWidth = min + Math.floor( randomFraction * (max - min + 1) );

                return (
                    <Skeleton
                        key={ index }
                        variant="text"
                        width={ skeletonWidth }
                        height={ 30 }
                    />
                );
            } ) }
        </>
    );
};

export default SkeletonUser;
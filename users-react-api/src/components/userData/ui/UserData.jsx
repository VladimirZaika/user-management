import React from "react";
import { Typography } from "@mui/material";



const UserData = ({
                    dataKey,
                    dataVal,
                    variant,
                    component,
                    className,
                }) => {

    return (
        <Typography className={ className }
                    variant={ variant }
                    component={ component }
        >
            { `${dataKey}:` }
            <span>
                { ` ${dataVal}` }
            </span>
        </Typography>
    );
};

export default UserData;
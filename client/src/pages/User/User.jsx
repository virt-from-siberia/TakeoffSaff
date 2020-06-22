//
import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
//

import Loader from "@/components/Loader/Loader";

import "./User.scss";

const User = (props) => {
    const {
        isLoading,
        // successUserGetInfo,
        // error,
        userInfo,
        actionUserGetInfo,
    } = props;
    const history = useHistory();

    const getUserInfo = useCallback(() => {
        actionUserGetInfo();
    }, [actionUserGetInfo]);

    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

    useEffect(() => {
        if (!isLoading) {
            history.push("/user/userprofile");
        }
    }, [history, isLoading]);

    if (isLoading) {
        return <Loader />;
    }

    // if (error) {
    //     return (
    //         <p>
    //             ERROR 404 во время запроса произошла ошибка, попробуйте
    //             перезагрузиить страницу.
    //         </p>
    //     );
    // }

    return (
        <div className='user'>
            <h1>USERPAGE</h1>
        </div>
    );
};

export default User;

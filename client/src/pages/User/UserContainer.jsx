//external
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//internal
import actionUserGetInfo from "@/store/User/actions";
import User from "./User";
//selectors
import {
    getUserInfo,
    getUsererror,
    getUserSuccessUserGetInfo,
    getUserIsLoading,
} from "@/store/User/selectors";

export const UserContainer = ({
    isLoading,
    successUserGetInfo,
    error,
    actionUserGetInfo,
    userInfo,
}) => {
    // const auth = useContext(AuthContext);

    return (
        <User
            isLoading={isLoading}
            successUserGetInfo={successUserGetInfo}
            error={error}
            userInfo={userInfo}
            actionUserGetInfo={actionUserGetInfo}
        />
    );
};

// const mapStateToProps = (state) => {
//     return {
//         isLoading: state.user.isLoading,
//         successUserGetInfo: state.user.successUserGetInfo,
//         error: state.user.error,
//         userEmail: state.user.userEmail,
//         userName: state.user.userName,
//         userSecondName: state.user.userSecondName,
//         userLanguage: state.user.userLanguage,
//         userPhone: state.user.userPhone,
//     };
// };

const mapStateToProps = (state) => {
    return {
        isLoading: getUserIsLoading(state),
        successUserGetInfo: getUserSuccessUserGetInfo(state),
        error: getUsererror(state),
        userInfo: getUserInfo(state),
    };
};

const mapDispatchToProps = {
    ...actionUserGetInfo,
};

UserContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    successUserGetInfo: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired,
    actionUserGetInfo: PropTypes.func.isRequired,

    userInfo: PropTypes.shape({
        userEmail: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        userSecondName: PropTypes.string.isRequired,
        userLanguage: PropTypes.string.isRequired,
        userPhone: PropTypes.string.isRequired,
    }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);

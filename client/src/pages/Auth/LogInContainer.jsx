//external
import React, { useContext } from "react";
import { connect } from "react-redux";

//internal
import loginActions from "@/store/Login/actions";
import Login from "./LogIn";
import { AuthContext } from "@/context/AuthContext";

const LoginContainer = ({
    isLoading,
    actionUserLogin,
    successLogin,
    showNotify,
    token,
    userId,
    errorLoginMessage,
}) => {
    const auth = useContext(AuthContext);

    return (
        <Login
            isLoading={isLoading}
            successLogin={successLogin}
            actionUserLogin={actionUserLogin}
            showNotify={showNotify}
            auth={auth}
            token={token}
            userId={userId}
            errorLoginMessage={errorLoginMessage}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        successLogin: state.login.successLogin,
        isLoading: state.login.isLoading,
        showNotify: state.login.showNotify,
        token: state.login.token,
        userId: state.login.userId,
        errorLoginMessage: state.login.errorLoginMessage,
    };
};

const mapDispatchToProps = {
    ...loginActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

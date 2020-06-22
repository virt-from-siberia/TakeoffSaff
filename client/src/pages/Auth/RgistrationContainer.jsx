//external
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

//internal
import registrationActions from "@/store/Registration/actions";
import Registration from "./Rgistration";

const RgistrationContainer = ({
    isLoading,
    actionUserRegistration,
    successRegistration,
    showNotify,
    errorRegistrationMessage,
}) => {
    console.log(" -> errorRegistrationMessage ", errorRegistrationMessage);
    const history = useHistory();
    return (
        <Registration
            isLoading={isLoading}
            successRegistration={successRegistration}
            actionUserRegistration={actionUserRegistration}
            showNotify={showNotify}
            history={history}
            errorRegistrationMessage={errorRegistrationMessage}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        successRegistration: state.registration.successRegistration,
        isLoading: state.registration.isLoading,
        showNotify: state.registration.showNotify,
        errorRegistrationMessage: state.registration.errorRegistrationMessage,
    };
};

const mapDispatchToProps = {
    ...registrationActions,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RgistrationContainer);

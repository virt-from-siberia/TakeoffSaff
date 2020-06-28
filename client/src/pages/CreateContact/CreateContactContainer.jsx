//
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//
import actionsCreateContact from "@/store/Create/actions";
import CreateContact from "./CreateContact";

const CreateContactContainer = ({
    isLoading,
    actionFetchCreateContact,
    success,
}) => {
    return (
        <CreateContact
            isLoading={isLoading}
            actionFetchCreateContact={actionFetchCreateContact}
            success={success}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        error: state.create.error,
        isLoading: state.create.isLoading,
        success: state.create.success,
    };
};

const mapDispatchToProps = {
    ...actionsCreateContact,
};

CreateContactContainer.propTypes = {
    error: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateContactContainer);

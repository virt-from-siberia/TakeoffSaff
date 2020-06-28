//
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//
import actionGetEditContact from "@/store/Edit/actions";
import actionChangeEditContact from "@/store/Edit/actions";
import actionDeleteEditContact from "@/store/Edit/actions";
import EditContact from "./EditContact";

const EditContactContainer = ({
    isLoading,
    actionGetEditContact,
    actionChangeEditContact,
    actionDeleteEditContact,
    successEdit,
    deleteSuccess,
    contact,
    errorEdit,
}) => {
    return (
        <EditContact
            isLoading={isLoading}
            actionGetEditContact={actionGetEditContact}
            actionChangeEditContact={actionChangeEditContact}
            actionDeleteEditContact={actionDeleteEditContact}
            successEdit={successEdit}
            deleteSuccess={deleteSuccess}
            contact={contact}
            errorEdit={errorEdit}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        errorEdit: state.edit.errorEdit,
        isLoading: state.edit.isLoading,
        successEdit: state.edit.successEdit,
        deleteSuccess: state.edit.deleteSuccess,
        contact: state.edit.contact,
    };
};

const mapDispatchToProps = {
    ...actionGetEditContact,
    ...actionChangeEditContact,
    ...actionDeleteEditContact,
};

EditContactContainer.propTypes = {
    error: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    contact: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContactContainer);

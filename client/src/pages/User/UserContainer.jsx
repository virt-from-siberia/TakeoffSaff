//
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//
import actionUserContacts from "@/store/User/actions";
import User from "./User";

export const UserContainer = ({
    isLoading,
    error,
    actionGetUserContacts,
    contacts,
}) => {
    const [inputValue, setValue] = useState("");

    const [filtered, setFiltredItems] = useState(Array.from(contacts));

    const onSearchHandler = (value) => {
        setFiltredItems(
            contacts.filter(
                (contact) =>
                    contact.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
            )
        );
        setValue(value);
    };

    const takeGroupHandler = (valueGroup) => {
        if (valueGroup) {
            setFiltredItems(contacts.filter((contact) => contact[valueGroup]));
        } else {
            setFiltredItems(contacts);
        }
    };

    useEffect(() => {
        if (contacts.length) {
            setFiltredItems(contacts);
        }
    }, [setFiltredItems, contacts]);

    return (
        <User
            isLoading={isLoading}
            actionGetUserContacts={actionGetUserContacts}
            error={error}
            contacts={filtered}
            onSearchHandler={onSearchHandler}
            inputValue={inputValue}
            takeGroupHandler={takeGroupHandler}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading,
        error: state.user.error,
        contacts: state.user.contacts,
    };
};

const mapDispatchToProps = {
    ...actionUserContacts,
};

UserContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired,
    contacts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);

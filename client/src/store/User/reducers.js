import {
    USER_FETCHED_GET_CONTACTS,
    USER_SET_LOADING,
    USER_GET_CONTACTS_FAIL,
    USER_GET_CONTACTS_SUCCESS,
} from "../types";

const defaultState = {
    isLoading: false,
    successUserGetContacts: false,
    error: false,
    contacts: [],
};

export const userGetInfoReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_FETCHED_GET_CONTACTS:
            return {
                ...state,
            };
        case USER_GET_CONTACTS_SUCCESS:
            return {
                ...state,
                successUserGetContacts: true,
                contacts: [...payload],
            };
        case USER_SET_LOADING:
            return {
                ...state,
                isLoading: payload,
            };
        case USER_GET_CONTACTS_FAIL:
            return {
                ...state,
                error: true,
            };

        default:
            return state;
    }
};

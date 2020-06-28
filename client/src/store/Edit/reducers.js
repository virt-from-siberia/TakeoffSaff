import {
    EDIT_CONTACT_SET_LOADING,
    EDIT_CONTACT_SUCCESS,
    EDIT_CONTACT_FAIL,
    EDIT_GET_CONTACT_SUCCESS,
    EDIT_CONTACT_DELETE_SUCCESS,
    CLEAR_STATE,
} from "../types";

const defaultState = {
    contact: {},
    errorEdit: false,
    isLoading: false,
    successEdit: false,
    deleteSuccess: false,
};

export const GetContact = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case EDIT_CONTACT_SUCCESS:
            return {
                ...state,
                successEdit: true,
            };
        case EDIT_GET_CONTACT_SUCCESS:
            return {
                ...state,
                contact: { ...payload },
            };
        case EDIT_CONTACT_SET_LOADING:
            return {
                ...state,
                isLoading: payload,
            };
        case EDIT_CONTACT_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteSuccess: true,
            };
        case EDIT_CONTACT_FAIL:
            return {
                ...state,
                errorEdit: true,
            };
        case CLEAR_STATE:
            return {
                ...state,
                errorEdit: false,
                isLoading: false,
                successEdit: false,
                deleteSuccess: false,
            };

        default:
            return state;
    }
};

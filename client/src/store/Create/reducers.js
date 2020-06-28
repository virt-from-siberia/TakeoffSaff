import {
    CREATE_CONTACT_FETCHED,
    CREATE_CONTACT_SET_LOADING,
    CREATE_CONTACT_SUCCESS,
    CREATE_CONTACT_FAIL,
    CLEAR_STATE,
} from "../types";

const defaultState = {
    error: false,
    isLoading: false,
    success: false,
};

export const CreateContacts = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_CONTACT_FETCHED:
            return {
                ...state,
            };
        case CREATE_CONTACT_SUCCESS:
            return {
                ...state,
                success: true,
            };
        case CREATE_CONTACT_SET_LOADING:
            return {
                ...state,
                isLoading: payload,
            };
        case CREATE_CONTACT_FAIL:
            return {
                ...state,
                error: true,
            };
        case CLEAR_STATE:
            return {
                ...state,
                error: false,
                isLoading: false,
                success: false,
            };

        default:
            return state;
    }
};

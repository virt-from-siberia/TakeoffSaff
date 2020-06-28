import {
    AUTH_SET_LOADING,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAIL,
    SET_NOTIFIER,
    CLEAR_STATE,
} from "../types";

const defaultState = {
    successRegistration: false,
    isLoading: false,
    showNotify: false,
    errorRegistrationMessage: "",
};

export const registrationReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                successRegistration: true,
            };
        case AUTH_REGISTER_FAIL:
            return {
                ...state,
                errorRegistrationMessage: payload,
            };
        case AUTH_SET_LOADING:
            return {
                ...state,
                isLoading: payload,
            };
        case SET_NOTIFIER:
            return {
                ...state,
                showNotify: payload,
            };
        case CLEAR_STATE:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
};

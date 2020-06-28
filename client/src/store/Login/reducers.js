import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAIL,
    AUTH_SET_LOADING,
    SET_NOTIFIER,
    CLEAR_STATE,
} from "../types";

const defaultState = {
    successLogin: false,
    isLoading: false,
    showNotify: false,
    token: false,
    userId: "",
    errorLoginMessage: "",
};

export const loginReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                successLogin: true,
                token: payload.token,
                userId: payload.userId,
                isLoading: false,
            };
        case AUTH_LOGIN_FAIL:
            return {
                ...state,
                errorLoginMessage: payload,
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
                token: false,
                userId: "",
            };

        default:
            return state;
    }
};

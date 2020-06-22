import {
    USER_FETCHED_GET_INFO,
    USER_SET_LOADING,
    USER_GET_INFO_FAIL,
    USER_GET_INFO_SUCCESS,
} from "../types";

const defaultState = {
    isLoading: false,
    successUserGetInfo: false,
    error: false,
    userEmail: "",
    userName: "",
    userSecondName: "",
    userLanguage: "RUS",
    userPhone: "",
};

export const userGetInfoReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_FETCHED_GET_INFO:
            return {
                ...state,
            };
        case USER_GET_INFO_SUCCESS:
            return {
                ...state,
                successUserGetInfo: true,
                userEmail: payload.email,
                userName: payload.userName,
                userSecondName: payload.userSecondName,
                userPhone: payload.phone,
                userLanguage: payload.language,
            };
        case USER_SET_LOADING:
            return {
                ...state,
                isLoading: payload,
            };
        case USER_GET_INFO_FAIL:
            return {
                ...state,
                error: true,
            };

        default:
            return state;
    }
};

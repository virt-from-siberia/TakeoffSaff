import {
    AUTH_SET_LOADING,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAIL,
    SET_NOTIFIER,
} from "../types";

import api from "@/utils/api/api.auth";

const actions = {
    actionSetIsLoading: (bool) => ({
        type: AUTH_SET_LOADING,
        payload: bool,
    }),
    actionShowNotifyer: (bool) => ({
        type: SET_NOTIFIER,
        payload: bool,
    }),

    actionUserRegistration: (email, password, phone) => async (dispatch) => {
        dispatch(actions.actionSetIsLoading(true));
        console.log("-> asdasdasd");

        try {
            const res = await api.apiUserRegistration({
                email,
                password,
                phone,
            });

            console.log("RESPONSE");
            console.log(res);

            dispatch(actions.actionSetIsLoading(false));
            dispatch(actions.actionShowNotifyer("success"));
            setTimeout(() => {
                dispatch(actions.actionShowNotifyer(false));
                dispatch({
                    type: AUTH_REGISTER_SUCCESS,
                    payload: res.data,
                });
            }, 1500);
        } catch (error) {
            console.log(error);

            dispatch({
                type: AUTH_REGISTER_FAIL,
                payload: error.response.data.message,
            });
            dispatch(actions.actionSetIsLoading(false));
            dispatch(actions.actionShowNotifyer("fail"));
            setTimeout(() => {
                dispatch(actions.actionShowNotifyer(false));
            }, 3000);
        }
    },
};

export default actions;
// err.response;

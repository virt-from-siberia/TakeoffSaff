import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAIL,
    AUTH_SET_LOADING,
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

    actionUserLogin: (email, password) => async (dispatch) => {
        dispatch(actions.actionSetIsLoading(true));

        try {
            const res = await api.apiUserLogin({ email, password });

            console.log(" -> REQUEST", res.data.params);

            dispatch(actions.actionShowNotifyer("success"));

            dispatch({
                type: AUTH_LOGIN_SUCCESS,
                payload: {
                    userId: res.data.params.userId,
                    token: res.data.params.token,
                },
            });

            setTimeout(() => {
                dispatch(actions.actionShowNotifyer(false));
            }, 1500);
        } catch (error) {
            console.log(error.response.data.message);
            dispatch({
                type: AUTH_LOGIN_FAIL,
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

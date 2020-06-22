import {
    USER_FETCHED_GET_INFO,
    USER_SET_LOADING,
    USER_GET_INFO_FAIL,
    USER_GET_INFO_SUCCESS,
} from "../types";

import api from "@/utils/api/api.user";

const actions = {
    actionSetIsLoading: (bool) => ({
        type: USER_SET_LOADING,
        payload: bool,
    }),

    actionUserGetInfo: () => async (dispatch) => {
        dispatch(actions.actionSetIsLoading(true));
        dispatch({
            type: USER_FETCHED_GET_INFO,
        });

        try {
            const res = await api.apiUserGetInfo();
            console.log(res);
            dispatch({
                type: USER_GET_INFO_SUCCESS,
                payload: res.data,
            });

            dispatch(actions.actionSetIsLoading(false));
        } catch (error) {
            dispatch(actions.actionSetIsLoading(false));
            dispatch({
                type: USER_GET_INFO_FAIL,
            });
        }
    },
};

export default actions;

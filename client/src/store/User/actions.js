import {
    USER_FETCHED_GET_CONTACTS,
    USER_SET_LOADING,
    USER_GET_CONTACTS_FAIL,
    USER_GET_CONTACTS_SUCCESS,
} from "../types";

import api from "@/utils/api/api";

const actions = {
    actionSetIsLoading: (bool) => ({
        type: USER_SET_LOADING,
        payload: bool,
    }),

    actionGetUserContacts: () => async (dispatch) => {
        console.log("-> DISPATCH");
        dispatch(actions.actionSetIsLoading(true));
        dispatch({
            type: USER_FETCHED_GET_CONTACTS,
        });

        try {
            const res = await api.apiUserGetContacts();
            console.log(res);
            dispatch({
                type: USER_GET_CONTACTS_SUCCESS,
                payload: res.data,
            });

            dispatch(actions.actionSetIsLoading(false));
        } catch (error) {
            dispatch(actions.actionSetIsLoading(false));
            dispatch({
                type: USER_GET_CONTACTS_FAIL,
            });
        }
    },
};

export default actions;

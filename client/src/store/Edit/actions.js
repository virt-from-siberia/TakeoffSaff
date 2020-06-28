import {
    EDIT_CONTACT_SET_LOADING,
    EDIT_CONTACT_SUCCESS,
    EDIT_CONTACT_FAIL,
    CLEAR_STATE,
    EDIT_CONTACT_DELETE_SUCCESS,
    EDIT_GET_CONTACT_SUCCESS,
} from "../types";

import api from "@/utils/api/api";

const actions = {
    actionSetIsLoading: (bool) => ({
        type: EDIT_CONTACT_SET_LOADING,
        payload: bool,
    }),

    actionGetEditContact: (id) => async (dispatch) => {
        dispatch(actions.actionSetIsLoading(true));

        try {
            const res = await api.apiGetContact(id);
            dispatch({
                type: EDIT_GET_CONTACT_SUCCESS,
                payload: res.data,
            });
            dispatch(actions.actionSetIsLoading(false));
            dispatch({ type: CLEAR_STATE });
        } catch (error) {
            dispatch(actions.actionSetIsLoading(false));
            dispatch({
                type: EDIT_CONTACT_FAIL,
            });
        }
    },

    actionChangeEditContact: (data) => async (dispatch) => {
        dispatch(actions.actionSetIsLoading(true));
        try {
            await api.apiChangeContact(data);

            dispatch({
                type: EDIT_CONTACT_SUCCESS,
            });
            dispatch(actions.actionSetIsLoading(false));
            dispatch({ type: CLEAR_STATE });
        } catch (error) {
            dispatch(actions.actionSetIsLoading(false));
            dispatch({
                type: EDIT_CONTACT_FAIL,
            });
        }
    },

    actionDeleteEditContact: (id) => async (dispatch) => {
        dispatch(actions.actionSetIsLoading(true));
        try {
            await api.apiDeleteContact(id);
            dispatch({
                // type: EDIT_CONTACT_DELETE_SUCCESS,
                type: EDIT_CONTACT_SUCCESS,
            });
            dispatch(actions.actionSetIsLoading(false));
            dispatch({ type: CLEAR_STATE });
        } catch (error) {
            dispatch(actions.actionSetIsLoading(false));
            dispatch({
                type: EDIT_CONTACT_FAIL,
            });
        }
    },
};

export default actions;

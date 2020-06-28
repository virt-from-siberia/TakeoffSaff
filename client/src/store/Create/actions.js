import {
  CREATE_CONTACT_FETCHED,
  CREATE_CONTACT_SET_LOADING,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  CLEAR_STATE,
} from "../types";

import api from "@/utils/api/api";

const actions = {
  actionSetIsLoading: (bool) => ({
    type: CREATE_CONTACT_SET_LOADING,
    payload: bool,
  }),

  actionFetchCreateContact: (data) => async (dispatch) => {
    //console.log(data);
    dispatch(actions.actionSetIsLoading(true));
    dispatch({
      type: CREATE_CONTACT_FETCHED,
    });

    try {
      const res = await api.apiUserCreateContact(data);
      dispatch({
        type: CREATE_CONTACT_SUCCESS,
        payload: res.data,
      });

      dispatch(actions.actionSetIsLoading(false));
      dispatch({ type: CLEAR_STATE });
    } catch (error) {
      dispatch(actions.actionSetIsLoading(false));
      dispatch({
        type: CREATE_CONTACT_FAIL,
      });
    }
  },
};

export default actions;

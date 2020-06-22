import { axios } from "../../core";

export default {
    // getAllByDialogId: (path) => axios.get(`/api/messages/${path}`),
    getAllByDialogId: (id) => axios.get(`/api/messages?dialog=${id}`),
};

import { axios } from "../../core";

export default {
    // getAll: () => axios.get("/dialogs"),
    getAll: () => axios.get("/api/dialogs"),
};

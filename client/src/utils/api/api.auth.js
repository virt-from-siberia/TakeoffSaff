import axios from "./axios";

//registration
const apiUserRegistration = ({ email, password, phone }) =>
    axios.post("/api/front/user/registration", { email, password, phone });
//login
const apiUserLogin = ({ email, password }) =>
    axios.post("/api/front/user/login", { email, password });

const auth = { apiUserRegistration, apiUserLogin };

export default auth;

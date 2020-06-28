import axios from "./axios";

//registration
const apiUserRegistration = ({ email, password, phone, fullname }) =>
    axios.post("/auth/registration", { email, password, phone, fullname });

//login
const apiUserLogin = ({ email, password }) =>
    axios.post("/auth/login", { email, password });

//create contact
const apiUserCreateContact = (data) => axios.post("/contacts/add", data);

//get contacts
const apiUserGetContacts = () => axios.post("/contacts");

//edit contact
const apiGetContact = (id) => axios.get(`/contacts/${id}`);
const apiChangeContact = (data) => axios.post("/contacts/edit", data);
const apiDeleteContact = (id) => axios.delete(`/contacts/edit/${id}`);

const api = {
    apiGetContact,
    apiUserRegistration,
    apiUserLogin,
    apiUserCreateContact,
    apiUserGetContacts,
    apiChangeContact,
    apiDeleteContact,
};

export default api;
